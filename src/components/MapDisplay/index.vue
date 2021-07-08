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
          <p>地址：{{ window.address }}</p>
          <p>名称：{{ window.name }}</p>
          <p>监测数据上传日期：{{ window.activateTime }}</p>
          <p>东向监测值（沉降）：{{ window.stats.east }}</p>
          <p>北向监测值（沉降）：{{ window.stats.north }}</p>
          <p>高程监测值（沉降）：{{ window.stats.height }}</p>
          <p>顺向监测值（倾斜）：{{ window.stats.vstat }}</p>
          <p>横向监测值（倾斜）：{{ window.stats.hstat }}</p>
          <el-button type="primary" @click="jump2DeviceHistory">历史数据</el-button>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
// NPM 方式
import Vue from "vue";

import { mapMutations, mapActions } from "vuex"
import VueAMap from "vue-amap";
import { camDevicePositionList } from "@/api/cam";
import { devicePositionList } from "@/api/cj";
import { getqxMapMarkerList } from "@/api/qx";
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
    "Geolocation",
    "MarkerClusterer"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
});

export default {
  name: "Mmap",
  data: function() {
    const self = this;
    return {
      amapManager,
      data_position: [],
      zoom: 8,

      center: [112.654432, 35.534617],
      expandZoomRange: true,
      markerRefs: [],
      markers: [],
      windows: [],
      window: "",
      events: {
        init(o) {
          setTimeout(() => {
            console.log("self.markerRefs", self.markerRefs);
            // 显示点覆盖物
            // eslint-disable-next-line no-undef
            const cluster = new AMap.MarkerClusterer(o, self.markerRefs, {
              gridSize: 5,
              renderCluserMarker: self._renderCluserMarker
            });
            console.log("cluster", cluster);
          }, 1000);
        }
      },
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
  computed: {
    ...mapMutations(["stats/SET_SERIAL"]),
    ...mapActions(["stats/setQueryForm"])
  },
  mounted() {
    camDevicePositionList().then(response => {
      console.log("cam-PositionList", response);
      this.data_position = response.data_positions;
      devicePositionList().then(response => {
        console.log("cj-PositionList", response);
        // this.data_position = response.data_positions;
        this.data_position.push.apply(this.data_position, response.data_positions);
        getqxMapMarkerList().then(response => {
          console.log("qx-PositionList", response);
          this.data_position.push.apply(this.data_position, response.data_positions);
          // if (!this.$store.getters.group_num.includes(this.myDeviceList[i].GroupNum)) {
          //   console.log("no permission to see this row: ", this.myDeviceList[i])
          //   delete this.myDeviceList[i]
          // }
          console.log("this.data_position", this.data_position)
          console.log("user.group_num", this.$store.state.user.group_num)
          console.log("getters.group_num", this.$store.getters.group_num)
          this.point();
        });
      });
    });
  },
  methods: {
    point() {
      const markers = [];
      const windows = [];
      const that = this;
      this.data_position.forEach((item, index) => {
        markers.push({
          position: item.position.split(","),
          // icon:item.url, //不设置默认蓝色水滴
          events: {
            init(o) {
              // that.markerRefs.push(o); // 产生点覆盖物。
              // console.log("that.markerRefs", that.markerRefs);
            },
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
          name: item.name,
          stats: item.stats,
          activateTime: item.createTime
        });
      });
      //  加点
      this.markers = markers;
      // 加弹窗
      this.windows = windows;
    },
    _renderCluserMarker(context) {
      const count = this.markers.length;

      const factor = Math.pow(context.count / count, 1 / 18);
      const div = document.createElement("div");
      const Hue = 180 - factor * 180;
      const bgColor = "hsla(" + Hue + ",100%,50%,0.7)";
      const fontColor = "hsla(" + Hue + ",100%,20%,1)";
      const borderColor = "hsla(" + Hue + ",100%,40%,1)";
      const shadowColor = "hsla(" + Hue + ",100%,50%,1)";
      div.style.backgroundColor = bgColor;
      const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
      div.style.width = div.style.height = size + "px";
      div.style.border = "solid 1px " + borderColor;
      div.style.borderRadius = size / 2 + "px";
      div.style.boxShadow = "0 0 1px " + shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size + "px";
      div.style.color = fontColor;
      div.style.fontSize = "14px";
      div.style.textAlign = "center";
      // eslint-disable-next-line no-undef
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
    },
    history_data() {
      console.log(this.data_position[this.index_temp].serial);
      this.$router.push("" + this.data_position[this.index_temp].serial);
    },
    jump2CJDeviceHistory() {
      this.$store.commit("stats/SET_SERIAL", this.data_position[this.index_temp].serial);
      // console.log("调用SET_SERIAL赋值");
      this.$router.push("/stats/Carousel");
    },
    jump2DeviceHistory() {
      console.log("this.data_position[this.index_temp]:", this.data_position[this.index_temp])
      if (this.data_position[this.index_temp].type === "cam") {
        this.$store.commit("cam/SET_SERIAL", this.data_position[this.index_temp].serial);
        console.log("this.$store")
        this.$router.push("/stats/realTime");
      } else if (this.data_position[this.index_temp].type === "cj") {
        this.$store.commit("stats/SET_SERIAL", this.data_position[this.index_temp].serial);
        this.$router.push("/stats/Carousel");
      } else {
        this.$store.commit("qxstats/SET_SERIAL", this.data_position[this.index_temp].serial);
        this.$router.push("/stats/Inclination");
      }
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
  width: 250px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
</style>
