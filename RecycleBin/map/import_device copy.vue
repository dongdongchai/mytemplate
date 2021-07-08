/* eslint-disable no-undef */
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
    <el-collapse ref="ruleForm" v-model="activeNames" :rules="rules">
      <el-collapse-item title="所需填入的信息" name="1">
        <el-row :gutter="8">
          <el-col
            :xs="{ span: 32 }"
            :sm="{ span: 32 }"
            :md="{ span: 32 }"
            :lg="{ span: 18 }"
            :xl="{ span: 18 }"
            style="padding-right: 8px; margin-bottom: 10px"
          >
            <el-form
              :model="query"
              label-width="80px"
            >
              <el-form-item label="类型">
                <el-radio-group v-model="query.type">
                  <el-radio label="沉降" value="cj" />
                  <el-radio label="倾斜" value="qx" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="query.name" />
              </el-form-item>
              <el-form-item label="序列号" prop="serial">
                <el-input v-model="query.serial" />
              </el-form-item>
              <el-form-item label="线路" prop="Line">
                <el-input v-model="query.Line" />
              </el-form-item>
              <el-form-item label="杆塔" prop="Tower">
                <el-input v-model="query.Tower" />
              </el-form-item>
              <el-form-item label="联系电话" prop="Tel">
                <el-input v-model="query.Tel" />
              </el-form-item>

              <!-- <el-form-item label="地址">
                <el-input v-model="query.address" :disabled="true" />
              </el-form-item> -->
            </el-form>
            <el-button type="primary" @click="submitForm('ruleForm')">验证提交</el-button>
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
        <el-form
          :model="query"
          label-width="80px"
        >
          <el-form-item label="地址" prop="address">
            <el-input v-model="query.address" :disabled="true" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <center>
      <el-form :model="query" label-width="80px">
        <el-form-item>
          <!-- <el-button type="primary" @click="comfirm_add_device">确认</el-button> -->
          <el-popover v-model="visible" placement="top" width="160">
            <p>确认提交？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="mini"
                :plain="true"
                @click="cancel_import_device('query')"
              >取消</el-button>
              <el-button
                type="primary"
                :plain="true"
                @click="confirm_import_device('query')"
              >确认</el-button>
            </div>
            <el-button slot="reference" type="primary">提交</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </center>

  </ul>
</template>

<script>
// NPM 方式
// import { AMapManager } from "vue-amap";
import VueAMap from "vue-amap";

const amapManager = new VueAMap.AMapManager();

export default {
  name: "Mmap",
  data: function() {
    var serial = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("serial不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 1) {
            callback(new Error("必须大于0"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const self = this;

    return {
      //* ******************地图和组件初始化设置**********************//
      amapManager,
      zoom: 12,
      activeNames: ["1"],
      center: [112.722638, 37.74656],
      markers: [],
      //* ******************数据库所需要的信息**********************//
      query: {
        type: "", // 类型
        name: "", // 设备号
        serial: "", // 序列号
        Line: "0", // 线路
        Tower: "0", // 杆塔
        address: "", // 地址
        Lng: "", // 经度
        Lat: "", // 纬度
        Tel: "" // 联系电话
      },
      rules: {
        serial: [
          { validator: serial, trigger: "blur" }
        ]
      },
      visible: false,
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
          console.log(self.markers);

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
      // console.log(a);
      return "creat success";
    },
    cancel_import_device(query) {
      // message: "成功取消";
      alert("成功取消")
      // this.$refs[query].resetFields();
      // this.$message("成功重置");
      this.visible = false;
    },
    confirm_import_device(query) {
      // this.$refs[query].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      // console.log(this.query);
      this.demo(this.query);
      // this.$message("" + this.demo(query));
      this.visible = false;
      alert("" + this.demo(this.query))
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.amap-page-container {
  width: 70%;
  height: 900px;
}
.amap {
  width: 100%;
  height: 450px;
  margin-left: 30px;
}
</style>
