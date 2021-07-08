const state = {
  serial: "E95916670",
  accessToken: "at.3bc6ewolanxbbmfw2cbwcuta96px12aa-7slmzk5uts-19wk04a-kobljsgxn",
  imgUrlList: [],
  label: "state.label",
  StatsQueryForm: {
    serial: "E95916670",
    date1: "",
    time1: "",
    date2: "",
    time2: ""
  }
};

import { searchSpanCAMStat } from "@/api/cam"
const mutations = {
  SET_IMGURL_LIST: (state, imgUrlList) => {
    console.log("imgUrlList", imgUrlList)
    state.imgUrlList = imgUrlList;
  },
  SET_SERIAL: (state, _serial) => {
    //console.log("cam.js SET_SERIAL得到参数：", _serial);
    state.serial = _serial;
    state.StatsQueryForm.serial = _serial
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token
  },
  SET_LABEL: (state, _serial) => {
    state.label = state.StatsQueryForm.serial.toString() + "号摄像头历史数据";
    console.log("state.label", state.label)
  },
  SET_TIME: (state, time) => {
    if (time) {
      for (let i = 0; i < time.length; i++) {
        time[i] = time[i].toString().slice(0, 19)
      }
    }
    state.time = time
  },
  SET_STATS_FORM: (state, form) => {
    const { date1, time1, date2, time2, serial } = form
    const correctform = {
      serial: serial,
      date1: date1.toLocaleDateString().replace(/\//g, "-"),
      date2: date2.toLocaleDateString().replace(/\//g, "-"),
      time1: time1.toTimeString().slice(0, 8),
      time2: time2.toTimeString().slice(0, 8)
    }
    console.log("correctform", correctform);
    console.log("before commit:store->SET_STATS_FORM->state.StatsQueryForm", state.StatsQueryForm);
    state.StatsQueryForm = correctform;
    console.log("after commit:store->SET_STATS_FORM->state.StatsQueryForm", state.StatsQueryForm);
  }
};
const actions = {
  initHistoryImg({ commit, state }) {
    return new Promise((resolve, reject) => {
      searchSpanCAMStat(state.StatsQueryForm)
        .then(Response => {
          console.log("Vues->HistoryImg->searchSpanCAMStat:", Response);
          const { imgurlData, TimeAxios } = Response
          commit("SET_IMGURL_LIST", imgurlData);
          commit("SET_TIME", TimeAxios);
          commit("SET_LABEL", state.serial);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setQueryForm({ commit }, QueryForm) {
    commit("SET_STATS_FORM", QueryForm);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
