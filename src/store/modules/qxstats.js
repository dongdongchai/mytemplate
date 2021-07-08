const state = {
  vstat: [1.0, 1.2, 0.5],
  hstat: [1.2, 1.0, 1.2],
  time: ["8:00", "9:00", "10:00"],
  serial: "",
  label: "state.label",
  StatsQueryForm: {
    serial: "17",
    date1: "",
    time1: "",
    date2: "",
    time2: ""
  }
};

import { searchSpanQXStat } from "@/api/qx"
const mutations = {
  SET_VSTAT: (state, vstat) => {
    state.vstat = vstat;
  },
  SET_HSTAT: (state, hstat) => {
    state.hstat = hstat;
  },
  SET_SERIAL: (state, _serial) => {
    // console.log("SET_SERIAL得到参数：", _serial);
    state.serial = _serial;
    state.StatsQueryForm.serial = _serial
    // console.log("setserial, StatsQueryForm=", state.StatsQueryForm);
    // console.log("调用SET_SERIAL赋值完成");
  },
  SET_LABEL: (state, _serial) => {
    state.label = state.StatsQueryForm.serial.toString() + "号传感器监测数据";
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
  initChartProto({ commit, state }) {
    return new Promise((resolve, reject) => {
      searchSpanQXStat(state.StatsQueryForm)
        .then(Response => {
          console.log("statsAction->initChartProto->searchSpanQXStat->Response", Response);
          const { vstatData, hstatData, TimeAxios } = Response
          commit("SET_VSTAT", vstatData);
          commit("SET_HSTAT", hstatData);
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
