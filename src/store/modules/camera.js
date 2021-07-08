const state = {
  accessToken: "accessToken",
  expireTime: 9992166585948
};

const mutations = {
  RESET_TOKEN: (state, info) => {
    console.log(info);
    state.accessToken = state.accessToken + String(info.id);
    state.expireTime = Date.now() + 86400000;
  }
};
const actions = {
  resetToken0({ commit, info }) {
    console.log(info);
    commit("RESET_TOKEN", info);
  },
  resetToken(context, info) {
    console.log(info)
    context.commit("RESET_TOKEN", info)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
