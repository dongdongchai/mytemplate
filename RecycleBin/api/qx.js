// import axios from "axios";
import { get } from "@/utils/my-axios-wrapper"
import store from "@/store"
const baseURL = "http://192.168.1.122:8100/api/drf/qxSensor"
const baseURL2 = "http://192.168.1.122:8100/api/mviews/qx"

export function searchQXDevice(id) {
  const tempt = baseURL + "/" + id.toString() + "/";
  console.log(tempt);
  axios
    .get(tempt)
    .then(response => {
      console.log("11111111111111");
      console.log(response);
      const re =
      {
        data: response.data
      }
      if (response.status === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 倾斜传感器30min内在线数量
// export function qxDeviceCount0() {
//   const tempt = baseURL2 + "/qxDeviceOnline/";
//   console.log("qxDeviceCount response:", tempt);
//   axios
//     .get(tempt)
//     .then(response => {
//       const re = {
//         code: response.status,
//         msg: "success!",
//         count: response.data.count

//       };
//       if (response.status === 200) {
//         console.log("qxDeviceCount ReturnValue:", re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

export function qxDeviceOnline(Query) {
  // console.log("qx.js/qxDeviceOnline() input:", Query);
  // request.GET.get('GroupNum', default=["0",])
  // Query = {
  //   GroupNum: ["0", "5", ]
  // }
  return get("/mviews/qx/qxDeviceOnline/", Query)
}

// 所有倾斜传感器近5天报警数
// // export function qxDeviceAlarmCount0(vstat, hstat) {
// //   const tempt = baseURL2 + "/qxDeviceAlarmCount/";
// //   console.log("tempt");
// //   const query = {
// //     params: {
// //       vstat: vstat,
// //       hstat: hstat
// //     }
// //   }
// //   // console.log(query);
// //   axios
// //     .get(tempt, query)
// //     .then(response => {
// //       const re = {
// //         code: response.data.code,
// //         msg: "success!",
// //         count: response.data.count
// //       };
// //       if (response.data.code === 200) {
// //         console.log("qxDeviceAlarmCount returnValue:", re);
// //         return re;
// //       }
// //     })
// //     .catch(err => {
// //       const re = {
// //         code: 500,
// //         msg: err
// //       };
// //       console.log(err);
// //       return re;
// //     });
// // }

// // 倾斜传感器地址列表
// export function qxdevicePositionList0() {
//   const tempt = baseURL2 + "/qxaddrList/";
//   console.log(tempt);
//   axios
//     .get(tempt)
//     .then(response => {
//       console.log("111111111111111111");
//       console.log(response);
//       console.log("222222222222222222");
//       const re = {
//         code: response.data.code,
//         msg: response.data.msg,
//         addrlist: response.data.addrlist

//       };
//       if (response.status === 200) {
//         console.log(re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// 通用查询某天倾斜传感器监测数据
// export function qxDeviceSearchStat(serial, time) {
//   const tempt = baseURL2 + "/searchQXStat/";
//   console.log(tempt);
//   const dates = {
//     params: {
//       serial: serial,
//       Time: time
//     }
//   };
//   console.log(dates);
//   axios
//     .get(tempt, dates)
//     .then(response => {
//       console.log(response);
//       const re = {
//         status: response.status,
//         msg: "success!",
//         vstatData: response.data.vstatData,
//         hstatData: response.data.hstatData,
//         TimeAxios: response.data.TimeAxios
//       };
//       if (response.data.code === 200) {
//         console.log(re);
//         return re;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

export function creatQXDevice(query) {
  return get("mviews/qx/addqxDevice/", query);
}

export function updateQXDevice(query) {
  return get("mviews/qx/updateqxDevice/", query);
}

export async function getqxDeviceList() {
  // console.log(get("/getqxDeviceList/"));
  return get("/mviews/qx/getqxDeviceList/")
}

export function getqxMapMarkerList() {
  const liststr = "?GroupNum=" + store.getters.group_num.toString().replaceAll(",","&GroupNum=")
  const urlstr = "/mviews/qx/getMapMarkerList/"
  return get(urlstr + liststr.trim())
  // return get("/mviews/qx/getMapMarkerList/")
}

export function qxDeviceLineList() {
  return get("/mviews/qx/qxLineList/")
}

export function qxDeviceAddrList() {
  return get("/mviews/qx/qxaddrList/")
}

export function qxDeviceTowerList() {
  return get("/mviews/qx/qxTowerList/")
}

export function searchQXDeviceAccurate(GeoFrom) {
  return get("/drf/qxSensor/", GeoFrom)
}

export function searchTodayQXStat(Query) {
  return get("/mviews/qx/searchQXStat/", Query)
}

export function searchSpanQXStat(Query) {
  console.log("qx.js/searchSpanQXStats() input:", Query);
  return get("/mviews/qx/SpanQXStat/", Query)
}

export function searchQXDeviceAll() {
  return get("/drf/qxSensor/")
}

export function searchQXDeviceFuzzy(query) {
  return get("/drf/qxSensor/?search=" + query);
}

export function deleteQXDevice(query) {
  return get("/mviews/qx/deleteqxDevice/", query);
}

export function qxDeviceWeekAlarmSplitCount(query) {
  return get("/mviews/qx/qxDeviceWeekAlarmSplitCount/", query);
}

export function qxDeviceAlarmCount(query) {
  return get("mviews/qx/qxDeviceAlarmCount/", query);
}

export function setQXDeviceZeroDrift(query) {
  return get("mviews/qx/setQXDeviceZeroDrift/", query);
}

export function autoSetQXDeviceZeroDrift(query) {
  return get("mviews/qx/autoSetQXDeviceZeroDrift/", query);
}

export function getQXThreshold(query) {
  return get("mviews/qx/getQXThreshold/", query);
}

export function setQXThreshold(query) {
  return get("mviews/qx/setQXThreshold/", query);
}

export function getQXAlarmStats(query) {
  return get("drf/qxStats/", query);
}
