<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// import echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { cjDeviceAlarmCount } from "@/api/cj";

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
          "#ed9678",
          "#e7dac9",
          "#cb8e85",
          "#f3f39d",
          "#c8e49c",
          "#f16d7a",
          "#f3d999",
          "#d3758f",
          "#dcc392",
          "#2e4783",
          "#82b6e9"
        ],
        title: {
          text: "历史沉降监测报警统计",
          left: "top",
          top: 20,
          textStyle: {
            color: "#555"
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
            name: "沉降报警数",
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
      cjDeviceAlarmCount(GroupNums).then(response => {
        this.count = response.count
        console.log("cjDeviceAlarmCount response", this.count);
        this.initChart()
      })
    }
  }
};
</script>
