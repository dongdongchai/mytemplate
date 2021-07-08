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
          <el-button type="primary" @click="history_data">历史数据</el-button>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
// NPM 方式
// eslint-disable-next-line no-unused-vars
import { AMapManager } from "vue-amap";
import VueAMap from "vue-amap";
// import AMap from 'AMap'
import { devicePositionList } from "@/api/cj";

const amapManager = new VueAMap.AMapManager();

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
              gridSize: 80,
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
            init(o) {
              that.markerRefs.push(o); // 产生点覆盖物。
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
          name: item.name
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
      this.$router.push("/stats/Carousel");
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
