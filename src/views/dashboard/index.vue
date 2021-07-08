<template>
  <div class="dashboard-container">
    <div class="dashboard-text">现以用户{{ name }}身份登入</div>
  
  </div>
</template>

 <script>
 import { mapGetters } from "vuex";

//import PanelGroup from "@/components/OnlineDevicePanel"
// import cjWeekBarChart from "./components/cjWeekBarChart";
// import qxWeekBarChart from "./components/qxWeekBarChart";

// import cjTimePieChart from "./components/cjTimePieChart";
// import qxTimePieChart from "./components/qxTimePieChart";

 export default {
   name: "Dashboard",
//   components: {
//     PanelGroup,

//     cjWeekBarChart,
//     qxWeekBarChart,

//     cjTimePieChart,
//     qxTimePieChart
//   },
//   data() {
//     return {
//       currentDate: new Date().toDateString(),
//       count: ""
//     };
//   },
   computed: {
     ...mapGetters(["name"])
   },
  mounted() {
    // this.getAlarmNumi()
   }
 }
 </script>

 <style lang="scss" scoped>
   .dashboard {
     &-container {
     margin: 30px;
   }
   &-text {
     font-size: 30px;
     line-height: 46px;
   }
 }
// .el-card {
//   min-height: 260px;
// }

// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 18px;
//   opacity: 0.75;
//   line-height: 350px;
//   margin: 0;
// }

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
// .testcolor{
//   background: #e21a13;
//   color: #0052cc;
// }
// .customChart{
//   min-height: 350px;
// }
// </style>
