/* eslint-disable vue/html-self-closing */
<template>
  <div class="apitest">
    {{ msg }}
    <div>
      <h1>{{ msg }}</h1>
      <el-button type="primary" @click="GetData">
        获取/api/camera返回数据
      </el-button>
      <el-button type="primary" @click="GetSerialData">
        GetFullData获取数据
      </el-button>
      <el-button type="primary" @click="getJoke">getJoke</el-button>
      <!-- <el-button type="primary" @click="getCameraList">GetSerialData</el-button> -->
      <el-button type="primary" @click="getAddrList">getAddrList</el-button>
      <li>serial:{{ serial }}</li>
      <li>addr:{{ addr }}</li>
      <li>joke：{{ joke }}</li>
      <map></map>
    </div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
// import axios from "axios";
import request from "@/utils/request";
import { fetchAddrList, fetchStatsList } from "@/api/stats";
import { amap } from "./amap";


// import hikvision from "./Hikvision";
// import { getCameraList } from "@/api/camera";
// import getCameraList from '@/api/camera'
// let amapManager = new VueAMap.AMapManager();
//       FastAMap.mapOptions.setOptions({
//   key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
//   version: '1.4.15'
// })

// export function getCameraList() {
//   console.log("getCameraList work well");
//   return request({
//     url: "/api/camera",
//     method: "get"
//   });
// }

export default {
  components: {
    amap
  },
  data() {
    return {
      serial: "",
      addr: "",
      UserNum: "",
      wholeRes: {},
      msg: "Views/APITest ---监控数据",
      joke: "",
      tags: ["JavaScript", "MVVM", "Vue.js"],
      zoom: 12,
      center: [121.59996, 31.197646],
            visible: true,
      rightVisible: true,
      message: 'Hello Vue Menu Sidebar'

      // amapManager,
      // events: {
      //   init(map) {
      //     AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
      //       const marker = new SimpleMarker({
      //         iconLabel: 'A',
      //         iconStyle: 'red',
      //         map: map,
      //         position: map.getCenter()
      //       });
      //     });
      //   }
      // }
    };
  },
  methods: {
    GetData() {
      this.$http
        .get("/dev-api/v1/camera/")
        .then(
          //  路径'/api/user/'为django后端对应的url路径
          res => {
            console.log(res);
            if (res.status == 200) {
              this.wholeRes = res.data.results;
              this.serial = this.wholeRes[11].serial;
              this.addr = this.wholeRes[11].addr;
              //   this.UserNum = res.data[0].UserNum;
              this.$message.success("获取用户数据成功");
            } else {
              this.$message.warning("后端数据为空");
            }
          }
        )
        .catch(err => {
          console.log(err);
          this.$message.error("获取用户数据失败");
        });
    },
    GetSerialData() {
      this.$http
        .get("/api/camera/")
        .then(
          //  路径'/api/user/'为django后端对应的url路径
          res => {
            console.log("res=");
            console.log(res);
            if (res.status == 200) {
              this.wholeRes = res.data.results;
              console.log("this.wholeRes=");
              console.log(this.wholeRes);
              this.serial = this.wholeRes[11].serial;
              this.addr = this.wholeRes[11].addr;
              //   this.UserNum = res.data[0].UserNum;
              this.$message.success("获取用户数据成功");
            } else {
              this.$message.warning("后端数据为空");
            }
          }
        )
        .catch(err => {
          console.log(err);
          this.$message.error("获取用户数据失败");
        });
    },
    GetFullData() {
      this.$http.get("http://localhost:800/api/camera/").then(res => {
        console.log(res.data);
        if (res.data.code == "200") {
          this.$message.success("GetFullData获取用户数据成功");
        }
      });
    },
    passMsg() {
      bus.$emit("msg", "i am from app");
    },
    getJoke: function() {
      this.$http
        .get("https://autumnfish.cn/api/joke")
        .then(response => {
          this.joke = response.data;
          console.log(response);
          console.log(this.joke);
          this.$message.success("获取用户数据成功");
        })
        .catch(err => {
          this.$message.error("获取joke数据失败");
        });
    },
    getAddrList() {
      // fetchAddrList()
      this.$http
        .post("/device/addr_list")
        // .post("/user/login")
        .then(
          //  路径'/api/user/'为django后端对应的url路径
          res => {
            console.log("res=");
            console.log(res);
          }
        )
        .catch(err => {
          console.log(err);
          this.$message.error("获取用户数据失败");
        });
    },
    getStatsListAPI() {
      fetchStatsList({
        generater_id: 35
      })
        .then(res => {
          console.log("res=");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取数据失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.apitest {
  display: block;
  /* padding: 20px; */
  text-align: center;
  margin: 20px;
}
.amap-demo {
  height: 300px;
}
</style>
