<template>
  <ul class="amap-page-container">
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

    <el-collapse v-model="activeNames">
      <el-collapse-item title="点击此处可收放表单" name="1">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 32 }"
            :sm="{ span: 32 }"
            :md="{ span: 32 }"
            :lg="{ span: 18 }"
            :xl="{ span: 18 }"
            style="padding-right: 8px; margin-bottom: 10px"
          >
            <el-form :model="query" label-width="80px">
              <el-form-item label="类型">
                <el-radio-group v-model="query.type">
                  <el-radio label="沉降" value="cj" />
                  <el-radio label="倾斜" value="qx" />
                  <el-radio label="图像" value="cam" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="query.name" />
              </el-form-item>
              <!-- <el-form-item v-show="isUpdate" label="序列号" prop="serial">
                <el-input v-model="query.serial" :disable="true" />
              </el-form-item>
              <el-form-item v-show="!isUpdate" label="序列号" prop="serial">
                <el-input v-model="query.serial" :disable="true" />
              </el-form-item> -->
              <el-form-item label="序列号" prop="serial">
                <el-input v-model="query.serial" :disabled="isUpdate" />
              </el-form-item>
              <el-form-item label="线路" prop="Line">
                <el-input v-model="query.Line" />
              </el-form-item>
              <el-form-item label="杆塔" prop="Tower">
                <el-input v-model="query.Tower" />
              </el-form-item>
              <el-form-item label="组号" prop="GroupNum">
                <el-input v-model="query.GroupNum" />
              </el-form-item>
              <el-form-item label="联系电话" prop="Tel">
                <el-input v-model="query.Tel" />
              </el-form-item>
              <el-form-item label="sim卡号码" prop="simNum">
                <el-input v-model="query.simNum" />
              </el-form-item>
              <!-- <el-form-item label="地址">
                <el-input v-model="query.addr" :disabled="true" />
              </el-form-item> -->
            </el-form>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <br>
    <br>
    <!-- 地图信息 -->

    <div class="amap">
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
    </div>
    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="padding-right: 8px; margin-bottom: 10px"
      >
        <el-form :model="query" label-width="80px">
          <el-form-item label="地址" prop="addr">
            <el-input v-model="query.addr" :disabled="true" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <center>
      <el-form :model="query" label-width="80px">
        <el-form-item>
          <el-popover v-model="visible" placement="top" width="200">
            <p style="text-align: center"> 确认提交？</p>
            <div style="text-align: center; margin: 0">
              <el-button
                align="left"
                type="info"
                @click="cancel_import_device()"
              >取消</el-button>
              <el-button
                align="right"
                type="primary"
                @click="confirm_import_device()"
              >确认</el-button>
            </div>
            <el-button slot="reference" type="primary" @click="judge_query">提交</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </center>
  </ul>
</template>

<script>
// NPM 方式
import Vue from "vue";
// import { AMapManager } from "vue-amap";
import VueAMap from "vue-amap";
import { creatCJDevice, updateCJDevice } from "@/api/cj";
import { creatQXDevice, updateQXDevice } from "@/api/qx";
import { creatCAMDevice, updateCAMDevice } from "@/api/cam";
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
    const self = this;
    return {
      // 添加数据提示框标识
      addVisible: false,
      //* ******************地图和组件初始化设置**********************//
      amapManager,
      zoom: 10,
      activeNames: ["1"],
      center: [112.654432, 35.534617],
      markers: [],
      //* ******************数据库所需要的信息**********************//
      query: {
        type: "", // 类型
        name: "", // 设备号
        serial: "", // 序列号
        Line: "0", // 线路
        Tower: "0", // 杆塔
        addr: "", // 地址
        GroupNum: "", // 组号
        Lng: "", // 经度
        Lat: "", // 纬度
        Tel: "", // 联系电话
        simNum: "" // sim号码
      },
      visible: false,
      txt: "",
      events: {
        init(o) {
          o.getCity((result) => {
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
          // console.log(self.markers);

          geocoder.getAddress(position_xy, function(status, result) {
            // console.log(result)
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.query.addr = result.regeocode.formattedAddress;

                self.$nextTick();
              }
            }
          });
          // console.log(self.query);
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
  computed: {
    isUpdate() {
      if (this.$store.state.device.devform.serial) {
        console.log("this.$store.state.device.devform", this.$store.state.device.devform)
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.query = Object.assign({}, this.$store.state.device.devform);
    console.log("this.query", this.query)
  },
  //* ******************在地图上添加点**********************//
  methods: {
    isLetter(str) {
      for (var i in str) {
        var asc = str.charCodeAt(i);
        if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
          return true;
        }
      }
      return false;
    },
    judge_type() {
      this.$message(this.query.type);
      if (this.query.type === "") {
        this.$message("请选择设备类型");
        this.txt = this.txt + "请选择设备类型\n"
      }
    },
    judge_name() {
      if (this.query.name.trim().length === 0) {
        this.txt = this.txt + "请输入设备名称\n"
      }
    },
    judge_serial() {
      console.log("this.query.type-------", this.query.type)
      if (this.query.type !== "图像") {
        if (this.isLetter(this.query.serial) || (this.query.serial.toString().trim().length === 0)) {
          this.txt = this.txt + "请正确输入设备序列号，检查是否有字母 & "
        } else if (parseInt(this.query.serial) > 255) {
          this.txt = this.txt + "序列号只能在0-255之间"
        }
      }
    },
    judge_adress() {
      if (this.query.addr.trim().length === 0) {
        this.txt = this.txt + "请选择设备位置 & "
        console.log("444");
      }
    },
    judge_Tel() {
      if (this.isLetter(this.query.Tel) || (this.query.Tel.trim().length === 0)) {
        this.txt = this.txt + "请正确输入联系电话";
        console.log("555");
      }
    },
    judge_GroupNum() {
      if (this.isLetter(this.query.GroupNum) || (this.query.GroupNum.toString().trim().length === 0)) {
        this.txt = this.txt + "组号为正整数";
        console.log("666");
      }
    },
    judge() {
      this.txt = ""
      this.judge_type()
      this.judge_name()
      this.judge_serial()
      this.judge_adress()
      this.judge_Tel()
      this.judge_GroupNum()
      return this.txt;
    },
    judge_query() {
      this.addVisible = true;
      // this.devform = Object.assign({}, row);
      // this.$message({
      //   message: "该设备将被添加",
      //   type: "warning"
      // });
    },
    cancel_import_device() {
      // message: "成功取消";
      // console.log("hehehe");
      this.visible = false;
      alert("成功取消")
    },
    confirm_import_device() {
      this.visible = false;
      // this.$message("" + this.demo(query));
      // alert("" + this.txt)
      this.txt = this.judge();
      console.log("this.query", this.query);
      console.log("this.txt", this.txt);

      if (this.txt === "") {
        // true时跳转页面
        if (this.query.type === "沉降") {
          if (this.isUpdate) {
            updateCJDevice(this.query).then(response => {
              console.log("response", response);
              if (response.code === 200) {
                this.$router.push("/device/device_table")
                return true;
              } else {
                this.txt = "添加失败" + response.msg;
                return false;
              }
            })
          } else {
            creatCJDevice(this.query).then(response => {
              console.log("response", response);
              if (response.code === 200) {
                this.$router.push("/device/device_table")
                return true;
              } else {
                this.txt = "添加失败" + response.msg;
                return false;
              }
            })
          }
        } else {
          if (this.query.type === "倾斜") {
            if (this.isUpdate) {
              updateQXDevice(this.query).then(response => {
                console.log("response", response);
                if (response.code === 200) {
                  this.$router.push("/device/device_table")
                  return true;
                } else {
                  this.txt = "添加失败" + response.msg;
                  return false;
                }
              })
            } else {
              creatQXDevice(this.query).then(response => {
                console.log("response", response);
                if (response.code === 200) {
                  this.$router.push("/device/device_table")
                  return true;
                } else {
                  this.txt = "添加失败" + response.msg;
                  return false;
                }
              })
            }
          } else {
            if (this.query.type === "图像") {
              if (this.isUpdate) {
                updateCAMDevice(this.query).then(response => {
                  console.log("response", response);
                  if (response.code === 200) {
                    this.$router.push("/device/device_table")
                    return true;
                  } else {
                    this.txt = "添加失败" + response.msg;
                    return false;
                  }
                })
              } else {
                creatCAMDevice(this.query).then(response => {
                  console.log("response", response);
                  if (response.code === 200) {
                    this.$router.push("/device/device_table")
                    return true;
                  } else {
                    this.txt = "添加失败" + response.msg;
                    return false;
                  }
                })
              }
            }
          }
        }
      } else {
        this.$message(this.txt);
      }
    }
  }
};
</script>

<style>
.amap-page-container {
  width: 70%;
  height:1000px;
}
.amap {
  width: 100%;
  height: 300px;
  margin-left: 30px;
}
</style>
