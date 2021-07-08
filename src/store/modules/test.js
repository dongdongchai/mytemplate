const state = {
 
    Location:new Array(10001),
    Temp:new Array(10001).fill(0),
    time:[],

    Location1:[],
    Temp1:[],
 
    map:"1",
    stop:"false"

};
import {gettempdata} from "@/api/cj"
const mutations= {
    settemp (state,data1,data2) {
      state.Temp.fill(0)
      const len=data1
      for (let i = 0; i < len; i++){
        state.Temp[data1(i)]=data2(i)
      }
      
    },
    setlocation(state,data){
    state.Location=data
  },
    settime(state,time){
      if (time) {
        for (let i = 0; i < time.length; i++) {
          time[i] = time[i].toString().slice(0, 19)
        }
      }
      state.time = time;
    },
    setlocation1(state,data){
      state.Location1=data
    },
    settemp1(state,data){
      state.Temp1=data
    },
    settempp(state,data){
      state.Temp=data
    },
    setmap(state,data){
      state.map=data
    },
    setstop(state,data){
      state.stop=data
    }
  };
    const actions = {
      initChartProto({ commit}) {
        return new Promise((resolve, reject) => {
          gettempdata()
            .then(Response => {
              console.log( Response);
              const { time, location, temp} = Response
              commit("settemp1", temp);
              commit("setlocation1",location);
              commit("settemp",location, temp);
              commit("settime", time);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      },
     
    };
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  };
  
