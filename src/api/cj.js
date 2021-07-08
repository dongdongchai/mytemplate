// import { get, post, mydelete, request, put } from "@/utils/request";
// import axios from "axios";
import { get } from "@/utils/my-axios-wrapper"
import store from "@/store";
const baseURL = "http://192.168.1.122:8100/api/drf/cjSensor"
const baseURL2 = "http://192.168.1.122:8100/api/mviews/cj"
// const baseURL = 'http://192.168.1.103:810/api/mviews/'
// const baseURL = 'http://127.0.0.1:810/api/mviews/'

// export function creatCJDevice0(query) {
//   const tempt = baseURL2 + "/addcjDevice/";
//   const qury = {
//     params: query
//   }
//   console.log(qury);
//   axios
//     .get(tempt, qury)
//     .then(response => {
//       console.log(response);
//       const re = {
//         isCreateSuccess: 1,
//         msg: "create successed!"
//       };
//       if (response.data.code === 200) {
//         if (response.data.serial !== null) {
//           console.log(re);
//           return re;
//         } else {
//           re.isCreateSuccess = 0;
//           re.msg = response.data.msg;
//           console.log(re);
//           return re;
//         }
//       }
//       if (response.data.code === 400) {
//         re.isCreateSuccess = 0;
//         re.msg = response.data.msg;
//         console.log(re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// export function updateCJDevice(query) {
//   {
//     console.log("http://localhost:810/api/drf/sensor/" + query);
//     const tempt = baseURL2 + "/updatecjDevice/";
//     console.log("11111111");
//     const qury = {
//       params: query
//     }
//     console.log(qury);
//     axios
//       .get(tempt, qury)
//       .then(response => {
//         console.log(response);
//         console.log("11111111");
//         const re = {
//           isCreateSuccess: 1,
//           msg: "update successed!"

//         };
//         if (response.data.code === 200) {
//           if (response.data.serial !== null) {
//             console.log(re);
//             return re;
//           } else {
//             re.isCreateSuccess = 0;
//             re.msg = "update failed"
//             console.log(re);
//             return re;
//           }
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// export function deleteCJDevice0(query) {
//   // let tempt = baseURL+"/deletecjDevice/" + id.toString() + "/";
//   const tempt = baseURL2 + "/deletecjDevice/";
//   console.log("111111111111");
//   console.log(tempt);
//   console.log(query);
//   const qury = {
//     params: {
//       serial: query
//     }
//   }
//   console.log("22222222222");
//   axios
//     .get(tempt, qury)
//     .then(response => {
//       console.log(response);
//       console.log("33333333333");
//       const re = {
//         isDeleteSuccess: 1,
//         msg: "delete successed!"

//       };
//       if (response.data.code === 200) {
//         console.log(re);
//         return re;
//       }
//       if (response.data.code === 400) {
//         re.isDeleteSuccess = 0;
//         re.msg = "没有需要删除的数据"
//         console.log(re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// export function searchCJDevice(id) {
//   const tempt = baseURL + "/" + id.toString() + "/";
//   console.log(tempt);
//   axios
//     .get(tempt)
//     .then(response => {
//       console.log("11111111111111");
//       console.log(response);
//       const re =
//       {
//         data: response.data
//       }
//       if (response.status === 200) {
//         console.log(re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// 精确搜索
// export function searchCJDeviceAccurate0(query) {
//   console.log(query);
//   var keys = Object.keys(query);
//   var values = Object.values(query);
//   console.log("111111111111");
//   console.log(keys);
//   console.log(values);
//   console.log("2222222222222222");
//   const tempt =
//     baseURL + "/?" +
//     keys[0] +
//     "=" +
//     values[0] +
//     "&&" +
//     keys[1] +
//     "=" +
//     values[1] +
//     "&&" +
//     keys[2] +
//     "=" +
//     values[2] +
//     "&&" +
//     keys[3] +
//     "=" +
//     values[3] +
//     "&&" +
//     keys[4] +
//     "=" +
//     values[4] +
//     "&&" +
//     keys[5] +
//     "=" +
//     values[5] +
//     "&&" +
//     keys[6] +
//     "=" +
//     values[6] +
//     "&&" +
//     keys[7] +
//     "=" +
//     values[7] +
//     "&&" +
//     keys[8] +
//     "=" +
//     values[8];
//   console.log(tempt);

//   axios
//     .get(tempt)
//     .then(response => {
//       console.log(response);

//       console.log("33333333333333333333333");
//       const re = {
//         data: response.data,
//         code: 200,
//         msg: "返回非空可展示列表"
//       };
//       if (response.status === 200) {
//         if (response.data.length !== 0) {
//           console.log(re);
//           return re;
//         } else {
//           re.msg = "查询成功，但结果为空"
//           re.code = 400
//           console.log(re);
//           return re;
//         }
//       } else {
//         re.msg = "查询失败"
//         re.code = 500
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// export function searchCJDeviceFuzzy0(query) {
//   console.log(query);
//   const tempt = baseURL + "/?search=" + query;
//   console.log(tempt);
//   axios
//     .get(tempt)
//     .then(response => {
//       console.log("111111111111111");
//       console.log(response);
//       console.log("22222222222222222");
//       const re = {
//         data: response.data,
//         code: 200,
//         msg: "返回非空可展示列表"
//       };
//       if (response.status === 200) {
//         if (response.data.length !== 0) {
//           console.log(re);
//           return re;
//         } else {
//           re.msg = "查询成功，但结果为空"
//           re.code = 400
//           console.log(re);
//           return re;
//         }
//       } else {
//         re.msg = "查询失败"
//         re.code = 500
//         console.log(re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
// 沉降传感器30min内在线数量
// export function cjDeviceCount0() {
//   const tempt = baseURL2 + "/cjDeviceOnline/";
//   console.log("cjDeviceCount response:", tempt);
//   axios
//     .get(tempt)
//     .then(response => {
//       // console.log("1111111111111111");
//       // console.log(response);
//       // console.log("222222222222222");
//       const re = {
//         code: response.status,
//         msg: "success!",
//         count: response.data.count

//       };
//       if (response.status === 200) {
//         console.log("cjDeviceCount ReturnValue:", re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

export function cjDeviceOnline(Query) {
  return get("/mviews/cj/cjDeviceOnline/", Query)
}


export async function getcjDeviceList() {
  // console.log(get("/getcjDeviceList/"));
  return get("/mviews/cj/getcjDeviceList/", {GroupNum: store.getters.group_num})
}

export function devicePositionList() {
  const GroupNums = {
    GroupNum: store.getters.group_num
  }
  return get("/mviews/cj/getMapMarkerList/", GroupNums)
}

export function cjDeviceLineList() {
  return get("/mviews/cj/cjLineList/")
}

export function cjDeviceAddrList() {
  return get("/mviews/cj/cjaddrList/")
}

export function cjDeviceTowerList() {
  return get("/mviews/cj/cjTowerList/")
}

export function searchCJDeviceAccurate(GeoFrom) {
  return get("/drf/cjSensor/", GeoFrom)
}

export function searchTodayCJStat(Query) {
  return get("/mviews/cj/searchCJStat/", Query)
}

export function searchSpanCJStat(Query) {
  console.log("cj.js/searchSpanCJStats() input:", Query);
  return get("/mviews/cj/SpanCJStat/", Query)
}

export function searchCJDeviceAll() {
  return get("/drf/cjSensor/")
}

export function searchCJDeviceFuzzy(query) {
  return get("/drf/cjSensor/?search=" + query);
}

export function deleteCJDevice(query) {
  return get("/mviews/cj/deletecjDevice/", query);
}

export function cjDeviceWeekAlarmSplitCount(query) {
  return get("/mviews/cj/cjDeviceWeekAlarmSplitCount/", query);
}

export function cjDeviceAlarmCount(query) {
  return get("mviews/cj/cjDeviceAlarmCount/", query);
}

export function creatCJDevice(query) {
  return get("mviews/cj/addcjDevice/", query);
}

export function updateCJDevice(query) {
  return get("mviews/cj/updatecjDevice/", query);
}

export function setCJDeviceZeroDrift(query) {
  return get("mviews/cj/setCJDeviceZeroDrift/", query);
}

export function autoSetCJDeviceZeroDrift(query) {
  return get("mviews/cj/autoSetCJDeviceZeroDrift/", query);
}

export function getThreshold(query) {
  return get("mviews/cj/getThreshold/", query);
}

export function setThreshold(query) {
  return get("mviews/cj/setThreshold/", query);
}

export function getCJAlarmStats(query) {
  return get("drf/cjStats/", query);
}

export function gettempdata() {
  return get("drf/cjStats/...");
}
