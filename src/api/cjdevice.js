// import { get, post, mydelete, request, put } from "@/utils/request";
import axios from "axios";

// export function creatDevice(query) {
//     console.log("creatDevice work well");
//     let response = get("/drf/sensor/",query);
//     console.log("1111111111111111111");
//     console.log(response);
//     return response;
//   }

const baseURL = "http://192.168.1.122:8100/api/drf/cjSensor"
const baseURL2 = "http://192.168.1.122:8100/api/mviews/cj"
// const baseURL = 'http://192.168.1.103:810/api/mviews/'
// const baseURL = 'http://127.0.0.1:810/api/mviews/'

export function creatCJDevice(query) {
  const tempt = baseURL2 + "/addcjDevice/";
  // let tempt="http://192.168.1.105:8100/api/v2/return_hello/"
  const qury = {
    params: query
  }
  console.log(qury);
  axios
    .get(tempt, qury)
    .then(response => {
      console.log(response);
      const re = {
        isCreateSuccess: 1,
        msg: "create successed!"
      };
      if (response.data.code === 200) {
        if (response.data.serial !== null) {
          console.log(re);
          return re;
        } else {
          re.isCreateSuccess = 0;
          re.msg = response.data.msg;
          console.log(re);
          return re;
        }
      }
      if (response.data.code === 400) {
        re.isCreateSuccess = 0;
        re.msg = response.data.msg;
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

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

export function deleteCJDevice(query) {
  // let tempt = baseURL+"/deletecjDevice/" + id.toString() + "/";
  const tempt = baseURL2 + "/deletecjDevice/";
  console.log("111111111111");
  console.log(tempt);
  console.log(query);
  const qury = {
    params: {
      serial: query
    }
  }
  console.log("22222222222");
  axios
    .get(tempt, qury)
    .then(response => {
      console.log(response);
      console.log("33333333333");
      const re = {
        isDeleteSuccess: 1,
        msg: "delete successed!"

      };
      if (response.data.code === 200) {
        console.log(re);
        return re;
      }
      if (response.data.code === 400) {
        re.isDeleteSuccess = 0;
        re.msg = "没有需要删除的数据"
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export function searchCJDevice(id) {
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

// 精确搜索
export function searchCJDeviceAccurate(query) {
  console.log(query);
  var keys = Object.keys(query);
  var values = Object.values(query);
  console.log("111111111111");
  console.log(keys);
  console.log(values);
  console.log("2222222222222222");
  const tempt =
    baseURL + "/?" +
    keys[0] +
    "=" +
    values[0] +
    "&&" +
    keys[1] +
    "=" +
    values[1] +
    "&&" +
    keys[2] +
    "=" +
    values[2] +
    "&&" +
    keys[3] +
    "=" +
    values[3] +
    "&&" +
    keys[4] +
    "=" +
    values[4] +
    "&&" +
    keys[5] +
    "=" +
    values[5] +
    "&&" +
    keys[6] +
    "=" +
    values[6] +
    "&&" +
    keys[7] +
    "=" +
    values[7] +
    "&&" +
    keys[8] +
    "=" +
    values[8];
  console.log(tempt);

  axios
    .get(tempt)
    .then(response => {
      console.log(response);

      console.log("33333333333333333333333");
      const re = {
        data: response.data,
        code: 200,
        msg: "返回非空可展示列表"
      };
      if (response.status === 200) {
        if (response.data.length !== 0) {
          console.log(re);
          return re;
        } else {
          re.msg = "查询成功，但结果为空"
          re.code = 400
          console.log(re);
          return re;
        }
      } else {
        re.msg = "查询失败"
        re.code = 500
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}
// export function searchDeviceAccurate(query) {
//   console.log(  "http://localhost:810/api/drf/sensor/"+query);
//   console.log("1111111111111");

//   respoget("/drf/sensor/?",query);
//   console.log(get("/drf/sensor/?",query));
//   console.log("111111111111");
//   console.log(get("/drf/sensor/?",query));
//   return get("/drf/sensor/?",query);
// }
// 模糊搜索
// export function searchDeviceFuzzy(query) {
//   console.log("http://localhost:810/api/drf/sensor/" + query);
//   let tempt = "http://localhost:810/api/drf/sensor/?search=" + query;
//   axios
//     .get(tempt)
//     .then(response => {
//       console.log(response);
//       //考虑使用responsecount
//       console.log(response.status);
//       console.log();
//       console.log(response.data);
//       if (response.status === 200) {
//         console.log("发送请求成功");
//         return response.status;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
// export function searchDeviceFuzzy(query,page,limit) {
//   console.log(  "http://localhost:810/api/drf/sensor/"+query);
//   let tempt= "http://localhost:810/api/drf/sensor/?search="+query+"&&page="+page+"&&limit="+limit;
//   axios
//   .get(
//    tempt
//   )
//   .then(response => {
//     console.log(response);
//     //考虑使用responsecount
//     console.log(response.status);
//     if (response.status === 200) {
//       console.log("发送请求成功");
//       return response.status;
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }
export function searchCJDeviceFuzzy(query) {
  console.log(query);
  const tempt = baseURL + "/?search=" + query;
  console.log(tempt);
  axios
    .get(tempt)
    .then(response => {
      console.log("111111111111111");
      console.log(response);
      console.log("22222222222222222");
      const re = {
        data: response.data,
        code: 200,
        msg: "返回非空可展示列表"
      };
      if (response.status === 200) {
        if (response.data.length !== 0) {
          console.log(re);
          return re;
        } else {
          re.msg = "查询成功，但结果为空"
          re.code = 400
          console.log(re);
          return re;
        }
      } else {
        re.msg = "查询失败"
        re.code = 500
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}
// 沉降传感器30min内在线数量
export function cjDeviceCount() {
  const tempt = baseURL2 + "/cjDeviceOnline/";
  console.log("tempt");
  axios
    .get(tempt)
    .then(response => {
      console.log("1111111111111111");
      console.log(response);
      console.log("222222222222222");
      const re = {
        code: response.status,
        msg: "success!",
        count: response.data.count

      };
      if (response.status === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 所有沉降传感器近5天报警数
export function cjDeviceAlarmCount(easte, northe, heighte) {
  const tempt = baseURL2 + "/cjDeviceAlarmCount/";
  console.log("tempt");
  const query = {
    params: {
      east: easte,
      north: northe,
      height: heighte
    }
  }
  console.log(query);
  axios
    .get(tempt, query)
    .then(response => {
      console.log("111111111111111111");
      console.log(response);
      console.log("222222222222222222");
      const re = {
        code: response.data.code,
        msg: "success!",
        count: response.data.count

      };
      if (response.data.code === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 沉降传感器地址列表
export function cjdevicePositionList() {
  const tempt = baseURL2 + "/cjaddrList/";
  console.log(tempt);
  axios
    .get(tempt)
    .then(response => {
      console.log("111111111111111111");
      console.log(response);
      console.log("222222222222222222");
      const re = {
        code: response.data.code,
        msg: response.data.msg,
        addrlist: response.data.addrlist

      };
      if (response.status === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 沉降传感器去重Line列表
export function cjDeviceLineList() {
  const tempt = baseURL2 + "/cjLineList/";
  console.log(tempt);
  console.log("111111111111");
  axios
    .get(tempt)
    .then(response => {
      console.log(response);
      console.log("222222222222");
      const re = {
        code: response.data.code,
        msg: response.data.msg,
        LineList: response.data.Linelist

      };
      if (response.data.code === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 沉降传感器去重Tower列表
export function cjDeviceTowerList() {
  const tempt = baseURL2 + "/cjTowerList/";
  console.log(tempt);
  console.log("111111111111111");
  axios
    .get(tempt)
    .then(response => {
      console.log(response);
      console.log("222222222222222");
      const re = {
        code: response.data.code,
        msg: response.data.msg,
        TowerList: response.data.Towerlist

      };
      if (response.data.code === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 根据沉降传感器编号及给定时间区间查询沉降监测数据
// export function cjDeviceSpanStat(query) {

//   let tempt = baseURL+"/SpanCJStat/";
//   console.log("tempt");
//   axios
//     .get(tempt,query)
//     .then(response => {
//       console.log(response.status);
//       let re = {
//         code : response.status,
//         msg : "success!",
//         eastData : response.eastData,
//         northData : response.northData,
//         heightData : response.heightData,
//         TimeAxios : response.TimeAxios
//       };
//       if (response.status === 201) {
//         console.log(re);
//         return re;
//       }

//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

export function cjDeviceSpanStat(serial, date1, date2) {
  const tempt = baseURL2 + "/SpanCJStat/";
  // let tempt="http://192.168.1.105:8100/api/v2/return_hello/"

  console.log(tempt);
  console.log("11111111111");
  console.log(serial);
  console.log(date1);
  console.log(date2);
  const dates = {
    params: {
      serial: serial,
      date1: date1,
      date2: date2
    }
  };
  console.log(dates);
  axios
    .get(tempt, dates)
    .then(response => {
      console.log(response);
      const re = {
        code: response.status,
        msg: "success!",
        eastData: response.eastData,
        northData: response.northData,
        heightData: response.heightData,
        TimeAxios: response.TimeAxios
      };
      if (response.data.code === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 通用查询某天沉降传感器监测数据
export function cjDeviceSearchStat(serial, time) {
  const tempt = baseURL2 + "/searchCJStat/";
  console.log(tempt);
  const dates = {
    params: {
      serial: serial,
      Time: time
    }
  };
  console.log(dates);
  axios
    .get(tempt, dates)
    .then(response => {
      console.log(response);
      const re = {
        status: response.status,
        msg: "success!",
        eastData: response.data.eastData,
        northData: response.data.northData,
        heightData: response.data.heightData,
        TimeAxios: response.data.TimeAxios
      };
      if (response.data.code === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export function devicePositionList() {
  const tempt = baseURL2 + "/getMapMarkerList/";
  console.log(tempt);
  axios
    .get(tempt)
    .then(response => {
      console.log("11111111111111");
      console.log(response);
      const re =
      {
        data_positions: response.data.data_positions,
        code: response.data.code,
        msg: response.data.msg

      }
      console.log(re);
      if (response.status === 200) {
        console.log(re);
        return re;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

