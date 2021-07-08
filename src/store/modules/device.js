const state = {
  devform: {
    date: "",
    status: "",
    name: "",
    serial: "",
    addr: "",
    Line: "",
    Tower: "",
    Lng: "",
    Lat: "",
    Tel: ""
  }
};

const mutations = {
  SET_DEVFORM: (state, devform) => {
    state.devform = devform;
    console.log("state.devform", state.devform)
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
