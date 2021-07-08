import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    group_num: [-1,],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    console.log("SET_TOKEN", state.token);
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    console.log("use this as logo img:", avatar)
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_GROUP_NUM: (state, group_num) => {
    state.group_num = group_num
    console.log("SET_GROUP_NUM", state.group_num);
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;

    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(myres => {
          const { data } = myres;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          const { name, avatar, roles, group_num } = data;
          commit("SET_NAME", name);
          commit("SET_ROLES", roles);
          commit("SET_AVATAR", avatar);
          commit("SET_GROUP_NUM", group_num);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
