import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import camera from "./modules/camera";
import stats from "./modules/stats";
import qxstats from "./modules/qxstats";
import cam from "./modules/cam";
import device from "./modules/device";
import test  from "./modules/test";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    camera,
    stats,
    qxstats,
    cam,
    device,
    test
  },
  getters
});

export default store;
