import { UpdateTokenNTime } from "@/api/camera";

const getDefaultState = () => {
  return {
    accessToken: "accessToken",
    expireTime: 1602216299913
  };
};

const CamQuery = {
  appKey: "15f2c1a32d2045c08a0b2833de82b34b",
  appSecret: "c7234c3fcec12a5889dfe5901ff1718f"
};

const state = {
  CameraInfo:{
    accessToken: "accessToken",
    expireTime: 1602216299913
  }
}

const mutations = {
  RESET_TOKEN: state => {
    Object.assign(state, getDefaultState());
    console.log("commit('RESET_TOKEN')成功");
  },
  UPDATE_TOKEN: (state, accessToken, expireTime) => {
    Object.assign(state, UpdateTokenNTime(CamQuery));
    // state.accessToken = accessToken;
    // state.expireTime = expireTime;
    console.log("commit('UPDATE_TOKEN')成功");
  },
  AvailableToken: state => {
    console.log(state)
    state.CameraInfo.expireTime = 100
    console.log(state.CameraInfo.expireTime)
    // if (
    //   state.camera.expireTime - Date.now() < 86400000 ||
    //   state.camera.expireTime - Date.now() > 86400000 * 6
    // ) {
    //   this.$message.success("AvailableToken 直接返回 token");
    // } else {
    //   this.$message.danger("AvailableToken 更新后返回 token");
    // }
  }
};

const actions = {
  resetAccessToken({ commit, state }) {
    return new Promise(resolve => {
      commit("RESET_TOKEN");
      resolve();
    });
  },
  UpdateAvailableToken({ commit }) {
    commit("AvailableToken")
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
