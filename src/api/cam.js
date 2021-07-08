// import { get, post, mydelete, request, put } from "@/utils/request";
import { get } from "@/utils/my-axios-wrapper"
import store from "@/store"

export async function getcamDeviceList() {
  return get("/mviews/cam/getcamDeviceList/", {GroupNum: store.getters.group_num})
}

export function camDevicePositionList() {
  const GroupNums = {
    GroupNum: store.getters.group_num
  }
  return get("/mviews/cam/getMapMarkerList/", GroupNums)
}

export function camDeviceLineList() {
  return get("/mviews/cam/Line_list/", {
    GroupNum: store.getters.group_num
  })
}

export function camDeviceAddrList() {
  return get("/mviews/cam/addr_list/", {
    GroupNum: store.getters.group_num
  })
}

export function camDeviceTowerList() {
  return get("/mviews/cam/Tower_List/", {
    GroupNum: store.getters.group_num
  })
}

export function searchCAMDeviceAccurate(GeoFrom) {
  return get("/drf/camDevice/", GeoFrom)
}

// TODO searchTodayCAMStat 404
export function searchTodayCAMStat(params) {
  return get("/mviews/cam/searchCAMStat/", params)
}

export function searchSpanCAMStat(params) {
  console.log("cam.js/searchSpancamStats() input:", params);
  return get("/mviews/cam/SpancamStat/", params)
}

export function searchCAMDeviceAll() {
  return get("/drf/camDevice/")
}

export function searchCAMDeviceFuzzy(params) {
  return get("/drf/camDevice/?search=" + params);
}

export function deleteCAMDevice(params) {
  return get("/mviews/cam/deletecamDevice/", params);
}

export function creatCAMDevice(params) {
  return get("mviews/cam/addcamDevice/", params);
}

export function updateCAMDevice(params) {
  return get("mviews/cam/updatecamDevice/", params);
}

export function getcamDeviceToken(params) {
  return get("mviews/cam/getcamDeviceToken/", params);
}

export function camDeviceOnline(Query) {
  return get("/mviews/cam/camDeviceOnline/", Query)
}
