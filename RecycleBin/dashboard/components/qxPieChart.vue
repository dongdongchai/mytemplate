<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { qxDeviceAlarmCount } from "@/api/qx";

const animationDuration = 3000;

export default {
  name: "RaddarChart",
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
      default: "300px"
    }
  },
  data() {
    return {
      dailyStat: [],
      chart: null,
      count: ""
    };
  },
  mounted() {
    this.getAlarmNum()
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    drawPie() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        backgroundColor: "#ffffff",
        // 2c343c

        title: {
          text: "历史倾斜监测报警统计",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 50,
          max: 900,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "警报类型",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              // { value: 335, name: "上月沉降报警" },
              { value: this.count[0], name: "近24h倾斜报警" + this.count[0].toString() },
              { value: this.count[1], name: "近24h-48h倾斜报警" + this.count[1].toString() },
              { value: this.count[2], name: "近48h-72h倾斜报警" + this.count[2].toString() },
              { value: this.count[3], name: "近72h-96h倾斜报警" + this.count[3].toString() }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(0, 0, 0, 0.8)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: "#0052cc",
              shadowBlur: 100,
              shadowColor: "rgba(0, 0, 0, 0.25)"
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ],
        animationDuration: animationDuration
      });
    },
    getAlarmNum() {
      const threshold = {
        hstat: 10.6,
        vstat: 10.9
      }
      qxDeviceAlarmCount(threshold).then(response => {
        this.count = response.count
        console.log("qxDeviceAlarmCount", this.count);
        this.drawPie()
      })
    }
  }
};
</script>
