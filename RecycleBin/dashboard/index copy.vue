<template>
  <div class="dashboard-container">
    <div class="dashboard-text">现以用户{{ name }}身份登入</div>
    <div><panel-group /></div>
    <el-row style="margin-bottom:20px;" :gutter="24">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card id="myPieChart" />
        <!-- :style="{ width: '30%', height: '50%' }" -->
      </el-col>
      <span />
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import PanelGroup from "@/components/OnlineDevicePanel"
// import { cjDeviceAlarmCount } from "@/api/cj"
import { get } from "@/utils/my-axios-wrapper"

export default {
  name: "Dashboard",
  components: {
    RaddarChart,
    PieChart,
    BarChart,
    PanelGroup
  },
  data() {
    return {
      currentDate: new Date().toDateString(),
      count: ""
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  mounted() {
    this.getAlarmNum()
  },
  methods: {
    drawPie() {
      const myPieChart = this.$echarts.init(
        document.getElementById("myPieChart")
      );
      myPieChart.setOption({
        backgroundColor: "#ffffff",
        // 2c343c

        title: {
          text: "History Data",
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
              // { value: 310, name: "上月倾斜报警" },
              // { value: 274, name: "本月沉降报警" },
              // { value: 235, name: "本月倾斜报警" }
              { value: this.count[0], name: "今日沉降报警" + this.count[0].toString() },
              { value: this.count[1], name: "昨日沉降报警" + this.count[1].toString() },
              { value: this.count[2], name: "前日沉降报警" + this.count[2].toString() },
              { value: this.count[3], name: "大前天沉降报警" + this.count[3].toString() }
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
              color: "#f36d69",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    },

    getAlarmNum() {
      const threshold = {
        east: 0.6,
        north: 10.9,
        height: 10.1
      }
      get("mviews/cj/cjDeviceAlarmCount/", threshold).then(response => {
        this.count = response.count
        console.log(this.count);
        this.drawPie()
      })
    }
  }
};
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
.el-card {
  min-height: 260px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.testcolor{
  background: #e21a13;
}
</style>
