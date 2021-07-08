const state = {
  ve: [1.0, 1.2, 0.5], // vstat(qx) or eastStat(cj)
  hn: [1.2, 1.0, 1.2], // hstat(qx) or northStat(cj)
  h: [0.5, 1.0, 0.5], // heightStat(cj)
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

import { searchSpanCJStat } from "@/api/cj"
import { getTestCJStatsList } from "@/api/stats"
const mutations = {
  SET_VE: (state, ve) => {
    // console.log("before commit:store->stats->mutations->SET_VE->state.ve", state.ve);
    // console.log("store->stats->mutations->SET_VE->ve", ve);
    state.ve = ve;
    // console.log("after commit:store->stats->mutations->SET_VE->state.ve", state.ve);
  },
  SET_HN: (state, hn) => {
    state.hn = hn;
  },
  SET_H: (state, h) => {
    state.h = h;
    console.log("state.h", state.h);
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
    state.time = time;
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
  initChartConcept({ commit, query }) {
    commit("UPDATE_LINES", query)
  },
  initChartProto0({ commit }) {
    return new Promise((resolve, reject) => {
      getTestCJStatsList(1000)
        .then(response => {
          const arr = {
            serial: 35,
            vedata: [2.2, 1.82, 1.91, 1.34, 1.5, 1.2, 1.1, 1.25, 1.45, 1.22, 1.65, 1.2],
            hndata: [1.2, 1.1, 10.25, 1.45, 1.22, 1.65, 1.22, 2.2, 1.82, 1.91, 1.34, 1.0],
            hdata: [2.2, 1.82, 1.25, 1.45, 1.22, 1.91, 1.34, 1.5, 1.2, 1.1, 1.65, 1.2],
            label: [
              "13:00",
              "13:05",
              "13:10",
              "13:15",
              "13:20",
              "13:25",
              "13:30",
              "13:35",
              "13:40",
              "13:45",
              "13:50",
              "13:55"
            ]
          };
          // const { data } = arr;
          // if (!data) {
          //   return reject("查询数据失败");
          // }
          commit("SET_VE", arr.vedata);
          commit("SET_HN", arr.hndata);
          commit("SET_H", arr.hdata);
          commit("SET_LABEL", arr.label);

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  initChartProto1({ commit }, query) {
    console.log("query", query);
    searchSpanCJStat(query).then(Response => {
      console.log("Response", Response);
      console.log("Response.eastData", Response.eastData);
      // console.log("Response", Response);
      const { eastData, northData, heightData, TimeAxios } = Response
      console.log("northData", northData);
      commit("SET_VE", eastData);
      commit("SET_HN", northData);
      commit("SET_H", heightData);
      commit("SET_TIME", TimeAxios);
      commit("SET_LABEL", state.serial);
      // this.$refs.cjChart.initChart()
    })
  },
  initChartProto({ commit, state }) {
    return new Promise((resolve, reject) => {
      searchSpanCJStat(state.StatsQueryForm)
        .then(Response => {
          console.log("statsAction->initChartProto->searchSpanCJStat->Response", Response);
          const { eastData, northData, heightData, TimeAxios } = Response
          commit("SET_VE", eastData);
          commit("SET_HN", northData);
          commit("SET_H", heightData);
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
    // console.log("store->stats->action->setQueryForm:", QueryForm);
    commit("SET_STATS_FORM", QueryForm);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
