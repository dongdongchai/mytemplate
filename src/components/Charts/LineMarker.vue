<template>
  <div
    :id="id"
    ref="cjChart"
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
      default: "100%"
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
    // ...mapState(["ve", "hn", "h", "time", "serial", "label"]),
    ...mapActions(["stats/initChartProto"]),
    // ...mapGetters(["ve", "hn", "h", "time"]),
    listenVE() {
      return this.$store.state.stats.ve
    },
    listenStateVE() {
      console.log("computed lintenStateVE changed > reDraw later")
      return this.$store.state.stats.ve
    },
    listenHN() {
      return this.$store.state.stats.hn
    },
    listenH() {
      return this.$store.state.stats.h
    },
    listenTIME() {
      return this.$store.state.stats.time
    },
    listenLABEL() {
      return this.$store.state.stats.label
    }
  },
  watch: {
    // 观察option的变化
    data: {
      listenVE: function(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
            this.reDraw();
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
          this.initChart();
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },
    listenStateVE: function(a, b) {
      this.initChart()
    },
    listenStateVE0: {
      listenStateVE: function(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.reDraw()
            console.log("watch lintenStateVE changed > reDraw now")
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch("stats/initChartProto").then(() => {
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
          text: "拉曼测温",
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
        // legend: {
        //   top: 20,
        //   icon: "rect",
        //   itemWidth: 14,
        //   itemHeight: 5,
        //   itemGap: 13,
        //   data: ["东向偏移", "北向偏移", "高程差"],
        //   right: "4%",
        //   textStyle: {
        //     fontSize: 12,
        //     // color: "#F1F1F3"
        //     color: "#333333"
        //   }
        // },
        grid: {
          top: 100,
          left: "2%",
          right: "10%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [{
          type: "category",
         nameLocation:"end",
          boundaryGap: false,
          name: "位置",
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          },
        data: this.$store.state.stats.time
       
        }],
        yAxis: [{
          type: "value",
          minInterval: 1.0,
          name: "摄氏度",
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
          name: "东向偏移",
          type: "line",
          smooth: false,
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
          data: this.listenVE
     //   },
        //  {
        //   name: "北向偏移",
        //   type: "line",
        //   smooth: true,
        //   symbol: "circle",
        //   symbolSize: 5,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       // eslint-disable-next-line no-undef
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: "rgba(0, 136, 212, 0.3)"
        //       }, {
        //         offset: 0.8,
        //         color: "rgba(0, 136, 212, 0)"
        //       }], false),
        //       shadowColor: "rgba(0, 0, 0, 0.1)",
        //       shadowBlur: 10
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: "rgb(0,136,212)",
        //       borderColor: "rgba(0,136,212,0.2)",
        //       borderWidth: 12

        //     }
        //   },
        //   // dataZoom: [
        //   //   {
        //   //     show: true,
        //   //     realtime: true,
        //   //     start: 30,
        //   //     end: 70
        //   //   },
        //   //   {
        //   //     type: "inside",
        //   //     realtime: true,
        //   //     start: 30,
        //   //     end: 70
        //   //   }
        //   // ],
        //   data: this.listenHN
        // }, {
        //   name: "高程差",
        //   type: "line",
        //   smooth: true,
        //   symbol: "circle",
        //   symbolSize: 5,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       // eslint-disable-next-line no-undef
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: "rgba(219, 50, 51, 0.3)"
        //       }, {
        //         offset: 0.8,
        //         color: "rgba(219, 50, 51, 0)"
        //       }], false),
        //       shadowColor: "rgba(0, 0, 0, 0.1)",
        //       shadowBlur: 10
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: "rgb(219,50,51)",
        //       borderColor: "rgba(219,50,51,0.2)",
        //       borderWidth: 12
        //     }
        //   },
        //   data: this.listenH
        }]
      })
    },
    reDraw() {
      this.chart.setOption({
        // backgroundColor: "#394056",
        backgroundColor: "#FFFFFF",
        title: {
          top: 20,
          text: "",
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
        // legend: {
        //   top: 20,
        //   icon: "rect",
        //   itemWidth: 14,
        //   itemHeight: 5,
        //   itemGap: 13,
        //   data: ["东向偏移", "北向偏移", "高程差"],
        //   right: "4%",
        //   textStyle: {
        //     fontSize: 12,
        //     // color: "#F1F1F3"
        //     color: "#333333"
        //   }
        // },
        grid: {
          top: 100,
          left: "2%",
          right: "10%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [{
         type: "category",
         nameLocation:"end",
          boundaryGap: false,
          name: "位置",
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          },
          data: this.listenTIME
        }],
        yAxis: [{
          type: "value",
          name: "摄氏度",
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
          name: "东向偏移",
          type: "line",
          smooth: false,
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
          data: this.ve
        // }, {
        //   name: "北向偏移",
        //   type: "line",
        //   smooth: true,
        //   symbol: "circle",
        //   symbolSize: 5,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       // eslint-disable-next-line no-undef
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: "rgba(0, 136, 212, 0.3)"
        //       }, {
        //         offset: 0.8,
        //         color: "rgba(0, 136, 212, 0)"
        //       }], false),
        //       shadowColor: "rgba(0, 0, 0, 0.1)",
        //       shadowBlur: 10
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: "rgb(0,136,212)",
        //       borderColor: "rgba(0,136,212,0.2)",
        //       borderWidth: 12

        //     }
        //   },
        //   data: this.hn
        // }, {
        //   name: "高程差",
        //   type: "line",
        //   smooth: true,
        //   symbol: "circle",
        //   symbolSize: 5,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       // eslint-disable-next-line no-undef
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: "rgba(219, 50, 51, 0.3)"
        //       }, {
        //         offset: 0.8,
        //         color: "rgba(219, 50, 51, 0)"
        //       }], false),
        //       shadowColor: "rgba(0, 0, 0, 0.1)",
        //       shadowBlur: 10
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: "rgb(219,50,51)",
        //       borderColor: "rgba(219,50,51,0.2)",
        //       borderWidth: 12
        //     }
        //   },
        //   data: this.h

        }]
      })
      // console.log("this.h", this.h)
    }
  }
}
</script>
