<template>
  <div style="left-margin:30px;">
    <h3 style="left-margin:30px">cam.js test</h3>
    <el-button @click="mgetcamDeviceList">getcamDeviceList</el-button>
    <br>
    <el-button @click="mdevicePositionList">devicePositionList</el-button>
    <br>
    <el-button @click="mcamDeviceLineList">camDeviceLineList</el-button>
    <br>
    <el-button @click="mcamDeviceAddrList">camDeviceAddrList</el-button>
    <br>
    <el-button @click="mcamDeviceTowerList">camDeviceTowerList</el-button>
    <br>
    <el-button @click="msearchCAMDeviceAccurate">searchCAMDeviceAccurate</el-button>
    <br>
    <el-button @click="msearchTodayCAMStat">searchTodayCAMStat</el-button>
    <br>
    <el-button @click="msearchSpanCAMStat">searchSpanCAMStat</el-button>
    <br>
    <el-button @click="msearchCAMDeviceAll">searchCAMDeviceAll</el-button>
    <br>
    <el-button @click="msearchCAMDeviceFuzzy">searchCAMDeviceFuzzy</el-button>
    <br>
    <el-button @click="mdeleteCAMDevice">deleteCAMDevice</el-button>
    <br>
    <el-button @click="mcreatCAMDevice">creatCAMDevice</el-button>
  </div>
</template>

<script>
import { getcamDeviceList,
  devicePositionList,
  camDeviceLineList,
  camDeviceAddrList,
  camDeviceTowerList,
  searchCAMDeviceAccurate,
  searchTodayCAMStat,
  searchSpanCAMStat,
  searchCAMDeviceAll,
  searchCAMDeviceFuzzy,
  deleteCAMDevice,
  creatCAMDevice } from "@/api/cam"
export default {
// getcamDeviceList
// devicePositionList
// camDeviceLineList
// camDeviceAddrList
// camDeviceTowerList
// searchCAMDeviceAccurate
// searchTodayCAMStat
// searchSpanCAMStat
// searchCAMDeviceAll
// searchCAMDeviceFuzzy
// deleteCAMDevice
// creatCAMDevice

  methods: {
    mgetcamDeviceList() {
      getcamDeviceList().then(Response => {
        console.log("getcamDeviceList", Response)
      })
    },
    mdevicePositionList() {
      devicePositionList().then(Response => {
        console.log("devicePositionList", Response)
      })
    },
    mcamDeviceLineList() {
      camDeviceLineList().then(Response => {
        console.log("camDeviceLineList", Response)
      })
    },
    mcamDeviceAddrList() {
      camDeviceAddrList().then(Response => {
        console.log("camDeviceAddrList", Response)
      })
    },
    mcamDeviceTowerList() {
      camDeviceTowerList().then(Response => {
        console.log("camDeviceTowerList", Response)
      })
    },
    msearchCAMDeviceAccurate() {
      searchCAMDeviceAccurate().then(Response => {
        console.log("searchCAMDeviceAccurate", Response)
      })
    },
    msearchTodayCAMStat() {
      searchTodayCAMStat().then(Response => {
        console.log("searchTodayCAMStat", Response)
      })
    },
    msearchSpanCAMStat() {
      searchSpanCAMStat().then(Response => {
        console.log("searchSpanCAMStat", Response)
      })
    },
    msearchCAMDeviceAll() {
      searchCAMDeviceAll().then(Response => {
        console.log("searchCAMDeviceAll", Response)
      })
    },
    msearchCAMDeviceFuzzy() {
      searchCAMDeviceFuzzy().then(Response => {
        console.log("searchCAMDeviceFuzzy", Response)
      })
    },
    mdeleteCAMDevice() {
      deleteCAMDevice().then(Response => {
        console.log("deleteCAMDevice", Response)
      })
    },
    mcreatCAMDevice() {
      creatCAMDevice()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
