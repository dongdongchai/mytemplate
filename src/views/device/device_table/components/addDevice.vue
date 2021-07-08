<template>
  <div class="amap-page-container">
    <!-- 导入设备信息的控件 -->
    <!--
      | 参数名 | 参数说明         | 备注                  |
      | ------ | ---------------- | --------------------- |
      | name   | 设备名           | *非空*                |
      | serial | 序列号           | *非空*                |
      | addr   | 按地点查询时使用 | *非空*                |
      | Line   | 线路             | 可选，默认0，表示未知 |
      | Tower  | 杆塔             | 可选，默认0，表示未知 |
      | Lng    | 经度             | *非空*                |
      | Lat    | 纬度             | *非空*                |
      | Tel    | 联系电话         | *非空*                |

    -->
    <el-form ref="form" :model="query" label-width="80px">
      <el-form-item label="设备名称">
        <el-input v-model="query.name" />
      </el-form-item>
      <el-form-item label="序列号">
        <el-input v-model="query.serial" />
      </el-form-item>
      <el-form-item label="线路">
        <el-input v-model="query.Line" />
      </el-form-item>
      <el-form-item label="杆塔">
        <el-input v-model="query.Tower" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="query.Tel" />
      </el-form-item>
    </el-form>
    <!-- 地图信息 -->

    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      :events="events"
      :amap-manager="amapManager"
      :plugin="plugin"
      class="amap-demo"
    >
      <!-- 遍历显示 -->
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :events="marker.events"
        :position="marker.position"
      />
    </el-amap>
    <div class="toolbar">
      <center>
        position: [{{ lng }}, {{ lat }}] address: {{ query.address }}
      </center>
    </div>
    <el-button type="primary" @click="comfirm_add_device">确认</el-button>
  </div>
</template>

<style>
.amap-page-container {
  width: 100%;
  height: 500px;
}
</style>

<script>
// NPM 方式
// import { AMapManager } from "vue-amap";
import VueAMap from "vue-amap";
// import AMap from "AMap"
const amapManager = new VueAMap.AMapManager();

export default {
  name: "Mmap",
  data: function() {
    const self = this;

    return {
      //* ******************地图和组件初始化设置**********************//
      amapManager,
      zoom: 12,

      center: [112.722638, 37.74656],
      markers: [],
      //* ******************数据库所需要的信息**********************//
      query: {
        name: "", // 设备号
        serial: "", // 序列号
        Line: "0", // 线路
        Tower: "0", // 杆塔
        address: "", // 地址
        Lng: "", // 经度
        Lat: "", // 纬度
        Tel: "" // 联系电话
      },

      events: {
        init(o) {
          o.getCity(result => {
            // result 为地图初始化时所在位置的行政区域信息
            console.log(result);
          });
          console.log(self.zoom);
        },

        //* ******************鼠标点击产生确定地址**********************//
        click(e) {
          const { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          // 这里是通过高德地图 SDK 完成的
          // eslint-disable-next-line no-undef
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          var position_xy = [lng, lat];
          console.log(position_xy);

          //* ****************在鼠标点击处添加标注点*******************//
          if (self.markers.length);
          self.markers.splice(self.markers.length - 1, 1);
          const marker = {
            position: [lng, lat]
          };
          self.query.Lng = "" + self.lng;
          self.query.Lat = "" + self.lat;
          console.log(self.query.Lng);
          console.log(self.query.Lat);
          self.markers.push(marker);

          geocoder.getAddress(position_xy, function(status, result) {
            // console.log(result)
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.query.address = result.regeocode.formattedAddress;

                self.$nextTick();
              }
            }
          });
          console.log(self.query);
        }
      },

      lng: 0,
      lat: 0,
      //* ******************自定义组件**********************//
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

  //* ******************在地图上添加点**********************//

  methods: {
    demo(a) {
      console.log(a);
      return "creat success";
    },
    comfirm_add_device() {
      // 确认
      this.$confirm("是否确认提交", "提示", {
        confirmButtonText: "确定提交",
        cancelButtonText: "再检查检查",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            // message: "成功确认!",
            // 这种写法存在问题，无法进入到self.demo中
            message: this.demo(this.query)
            // 将对象存入到数据库中的函数
            // message : creatCJDevice([ obj{} ] query)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "再检查检查"
          });
        });
    }
  }
};
</script>
