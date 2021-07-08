<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// import echarts from "echarts";
// require("./macarons"); // echarts theme
import resize from "./mixins/resize";
import { qxDeviceAlarmCount } from "@/api/qx";

export default {
  name: "PieChart",
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
      default: "50vh"
    }
  },
  data() {
    return {
      count: [],
      chart: null
    };
  },
  mounted() {
    this.getAlarmNum()
    // this.$nextTick(() => {
    //   this.initChart();
    // });
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
          "#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80",
          "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa",
          "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050",
          "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"
        ],
        title: {
          text: "历史倾斜监测报警统计",
          left: "top",
          top: 20,
          textStyle: {
            color: "#555"
            // fontWeight: "normal"
            // color: "#008acd"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["近24h", "近24h-48h", "近48h-72h", "近72h-96h", "近96h-120h"]
        },
        series: [
          {
            name: "倾斜报警数",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
              { value: this.count[0], name: "近24h" },
              { value: this.count[1], name: "近24h-48h" },
              { value: this.count[2], name: "近48h-72h" },
              { value: this.count[3], name: "近72h-96h" },
              { value: this.count[4], name: "近96h-120h" }
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    },
    getAlarmNum() {
    const GroupNums = {
      GroupNum: this.$store.getters.group_num
    }
      qxDeviceAlarmCount(GroupNums).then(response => {
        this.count = response.count
        console.log("qxDevice Alarm Count response", this.count);
        this.initChart()
      })
    }
  }
};
</script>

<style lang="stylus">

</style>
