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

export function qxDeviceOnline(Query) {
  // console.log("qx.js/qxDeviceOnline() input:", Query);
  // request.GET.get('GroupNum', default=["0",])
  // Query = {
  //   GroupNum: ["0", "5", ]
  // }
  return get("/mviews/qx/qxDeviceOnline/", Query)
}

export function creatQXDevice(query) {
  return get("mviews/qx/addqxDevice/", query);
}

export function updateQXDevice(query) {
  return get("mviews/qx/updateqxDevice/", query);
}

export async function getqxDeviceList() {
  // console.log(get("/getqxDeviceList/"));
  return get("/mviews/qx/getqxDeviceList/", {GroupNum: store.getters.group_num})
}

export function getqxMapMarkerList() {
  // const liststr = "?GroupNum=" + store.getters.group_num.toString().replaceAll(",","&GroupNum=")
  // const urlstr = "/mviews/qx/getMapMarkerList/"
  // return get(urlstr + liststr.trim())
  // return get("/mviews/qx/getMapMarkerList/")
  const GroupNums = {
    GroupNum: store.getters.group_num
  }
  return get("/mviews/qx/getMapMarkerList/", GroupNums)
}

export function qxDeviceLineList() {
  const GroupNums = {
    GroupNum: store.getters.group_num
  }
  return get("/mviews/qx/qxLineList/", GroupNums)
}

export function qxDeviceAddrList() {
  const GroupNums = {
    GroupNum: store.getters.group_num
  }
  return get("/mviews/qx/qxaddrList/", GroupNums)
}

export function qxDeviceTowerList() {
  const GroupNums = {
    GroupNum: store.getters.group_num
  }
  return get("/mviews/qx/qxTowerList/", GroupNums)
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
