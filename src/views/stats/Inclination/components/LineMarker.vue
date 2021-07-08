/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <div
    :id="id"
    ref="qxChart"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
// import echarts from "echarts"
import resize from "./mixins/resize"
import { mapActions } from "vuex";
// import { mapActions, mapGetters, mapState } from "vuex";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "linechart"
    },
    id: {
      type: String,
      default: "3linechart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    ...mapActions(["qxstats/initChartProto"]),
    listenVSTAT() {
      return this.$store.state.qxstats.vstat
    },
    listenStateVSTAT() {
      return this.$store.state.qxstats.vstat
    },
    listenHSTAT() {
      return this.$store.state.qxstats.hstat
    },

    listenTIME() {
      return this.$store.state.qxstats.time
    },
    listenLABEL() {
      return this.$store.state.qxstats.label
    }
  },
  watch: {
    // 观察option的变化
    data: {
      listenVSTAT: function(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
            this.initChart();
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
          this.initChart();
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
    listenStateVSTAT: function(a, b) {
      this.initChart()
    }
  },
  mounted() {
    this.$store.dispatch("qxstats/initChartProto").then(() => {
      setTimeout(() => {
        this.initChart()
      }, 1000);
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // eslint-disable-next-line no-undef
      this.chart = echarts.init(document.getElementById(this.id))
      console.log("initChart() worked")
      this.chart.setOption({
        // backgroundColor: "#394056",
        backgroundColor: "#FFFFFF",
        title: {
          top: 20,
          text: this.listenLABEL,
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#818183"
          },
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ["横向倾斜角", "顺向倾斜角"],
          right: "4%",
          textStyle: {
            fontSize: 12,
            // color: "#F1F1F3"
            color: "#333333"
          }
        },
        grid: {
          top: 100,
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [{
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          },
          data: this.$store.state.qxstats.time
        }],
        yAxis: [{
          type: "value",
          minInterval: 1.0,
          name: "(m or deg)",
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: "#57617B"
            }
          }
        }],
        series: [{
          name: "横向倾斜角",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              // eslint-disable-next-line no-undef
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(137, 189, 27, 0.3)"
              }, {
                offset: 0.8,
                color: "rgba(137, 189, 27, 0)"
              }], false),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: "rgb(137,189,27)",
              borderColor: "rgba(137,189,2,0.27)",
              borderWidth: 12
            }
          },
          data: this.listenVSTAT
        },
        {
          name: "顺向倾斜角",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              // eslint-disable-next-line no-undef
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(0, 136, 212, 0.3)"
              }, {
                offset: 0.8,
                color: "rgba(0, 136, 212, 0)"
              }], false),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: "rgb(0,136,212)",
              borderColor: "rgba(0,136,212,0.2)",
              borderWidth: 12

            }
          },
          data: this.listenHSTAT
        }]
      })
    }
  }
}
</script>
