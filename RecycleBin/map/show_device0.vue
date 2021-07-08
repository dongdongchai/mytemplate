<template>
  <div class="amap-page-container">
    <!-- <div class="toolbar">当前坐标: [{{ lng }}, {{ lat }}]</div> -->
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      :events="events"
      pitch-enable="false"
      :plugin="plugin"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :events="marker.events"
        :position="marker.position"
      />
      <el-amap-info-window
        v-if="window"
        :position="window.position"
        :visible="window.visible"
        :content="window.content"
        :offset="window.offset"
        :close-when-click-map="true"
        :is-custom="true"
      >
        <div id="info-window" style="text-aligin:center">
          <p>{{ window.address }}</p>
          <p>{{ window.name }}</p>
          <!-- <el-button type="primary" @click="alert_info">预警信息</el-button> -->
          <el-button type="primary" @click="history_data">历史数据</el-button>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
// NPM 方式
import Vue from "vue";
// import { AMapManager } from "vue-amap";
import VueAMap from "vue-amap";
import { devicePositionList } from "@/api/cj";
const amapManager = new VueAMap.AMapManager();

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "7cd24a352582bb2983a4cce99b1915d8",
  plugin: [
    "Autocomplete",
    "PlaceSearch",
    "Scale",
    "OverView",
    "ToolBar",
    "MapType",
    "PolyEditor",
    "CircleEditor",
    "Geocoder",
    "Geolocation"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
});

export default {
  name: "Mmap",
  data: function() {
    return {
      amapManager,
      data_position: [
        // 只能使用position
        {
          // 必须使用字符串形式，数组形式无法使用
          serial: "CJ1234",
          position: "112.722638, 37.74656",
          address: "TYUT TYUT TYUT TYUT TYUT TYUT TYUT TYUT"
        },
        {
          serial: "CJ5678",
          position: "112.722638, 36.74656",
          address:
            "second position second position second position second position second position"
        }
      ],
      zoom: 12,

      center: [112.722638, 37.74656],
      expandZoomRange: true,
      markers: [],
      windows: [],
      window: "",
      events: {},
      // lng: 0,
      // lat: 0,
      plugin: [
        {
          // 工具条
          pName: "ToolBar",
          events: {
            init(o) {
              // console.log(o);
            }
          }
        },
        // 卫星和路网路况
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              // console.log(o);
            }
          }
        },
        // 比例尺
        {
          pName: "Scale",
          defaultType: 0,
          events: {
            init(o) {
              // console.log(o);
            }
          }
        }
      ]
    };
  },
  mounted() {
    devicePositionList().then(response => {
      console.log("response", response);
      this.data_position = response.data_positions;
      // console.log(this.data_position);
      console.log("this.data_position", this.data_position);
      this.point();
    });
  },
  methods: {
    point() {
      const markers = [];
      const windows = [];
      // const index_temp = 0;
      const that = this;
      this.data_position.forEach((item, index) => {
        markers.push({
          position: item.position.split(","),
          // icon:item.url, //不设置默认蓝色水滴
          events: {
            mousedown() {
              // 方法：鼠标移动到点标记上，显示相应窗体
              // 关闭所有窗体
              that.windows.forEach(window => {
                window.visible = false; // 关闭窗体
              });
              that.window = that.windows[index];
              that.index_temp = index;
              // console.log(index);
              that.$nextTick(() => {
                that.window.visible = true;
                // console.log("------")
              });
            }
          }
        });
        windows.push({
          position: item.position.split(","),
          isCustom: true,
          offset: [115, 55], // 窗体偏移
          showShadow: false,
          visible: false, // 初始是否显示
          address: item.address,
          name: item.name
        });
      });
      //  加点
      this.markers = markers;
      // 加弹窗
      this.windows = windows;
    },
    // alert_info() {
    //   console.log(this.data_position[this.index_temp].serial);
    //   this.$router.push("" + this.data_position[this.index_temp].serial);
    // },
    history_data() {
      console.log(this.data_position[this.index_temp].serial);
      this.$router.push("" + this.data_position[this.index_temp].serial);
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-demo {
  height: 975px;
}
.amap-page-container {
  position: relative;
}
#info-window {
  width: 220px;
  height: 160px;
  margin-left: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .detail {
    width: 100%;
    height: 24px;
    color: #fff;
    background-color: #1a73e8;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

