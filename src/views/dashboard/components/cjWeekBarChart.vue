<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// import echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { cjDeviceWeekAlarmSplitCount } from "@/api/cj";
const animationDuration = 4000;

export default {
  name: "BarChart",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    }
  },
  data() {
    return {
      weekData: [],
      eastData: [],
      northData: [],
      heightData: [],
      chart: null
    };
  },
  mounted() {
    const GroupNums = {
      GroupNum: this.$store.getters.group_num
    }
    cjDeviceWeekAlarmSplitCount(GroupNums).then(Response => {
      console.log("cjDeviceWeekAlarmSplitCount Response", Response)
      this.eastData = Response.east
      this.northData = Response.north
      this.heightData = Response.height
      this.initChart();
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      // eslint-disable-next-line no-undef
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        color: [
          "#ffcb6a",
          "#ffa850",
          "#ffe2c4",
          "#e5834e",
          "#ffb081",
          "#f7826e",
          "#faac9e",
          "#fcd5cf"
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [this.GetDateStr(0), this.GetDateStr(-1), this.GetDateStr(-2), this.GetDateStr(-3), this.GetDateStr(-4), this.GetDateStr(-5), this.GetDateStr(-6)],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "东向偏移报警",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.eastData,
            animationDuration
          },
          {
            name: "北向偏移报警",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.northData,
            animationDuration
          },
          {
            name: "高程偏移报警",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.heightData,
            animationDuration
          }
        ]
      });
    },
    GetDateStr(Count) {
      var dd = new Date();
      dd.setDate(dd.getDate() + Count);// 获取Count天后的日期
      var m = dd.getMonth() + 1; // 获取当前月份
      var d = dd.getDate(); // 获取当前月份的日期
      var w = dd.getDay(); // 获取星期几
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      var week;
      switch (w) {
        case 0 :week = "周日"; break;
        case 1 :week = "周一"; break;
        case 2 :week = "周二"; break;
        case 3 :week = "周三"; break;
        case 4 :week = "周四"; break;
        case 5 :week = "周五"; break;
        case 6 :week = "周六"; break;
      }
      return m + "/" + d + week;
    }

  }
};
</script>
