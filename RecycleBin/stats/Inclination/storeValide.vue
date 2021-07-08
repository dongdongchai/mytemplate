<template>
  <div class="inclination">
    Inclination Monitoring
    <div class="selectDev-from">
      <h3>addrForm</h3>
      <div class="app-container">
        <el-form ref="addrForm" :model="addrForm" label-width="120px">
          <el-form-item label="查询区域">
            <el-select v-model="addrForm.region" placeholder="请选择查询区域">
              <el-option
                v-for="(item, index, key) in addrList"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <li>根据addr[0]查询设备，得到该地设备列表</li>
    <el-button
      style="margin:10px; border:10px; padding:10px;"
      @click="getCamList"
    >
      UpdateList
    </el-button>
    <div class="device-from">
      <h3>device</h3>
      <div class="app-container">
        <el-form ref="devForm" :model="devForm" label-width="120px">
          <el-form-item label="选择设备">
            <el-select v-model="devForm.device" placeholder="请选择设备">
              <el-option
                v-for="(item, index, key) in camList"
                :key="key"
                :label="item.serial + ' type-' + String(item.sensortype)"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="inclination-tab">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
// import axios from "axios";
import { title } from "@/settings";
import fetchAddrList from "@/api/stats";
export default {
  data() {
    return {
      addrList: [],
      camList: [],
      camTypeList: ["typeA", "typeB", "typeC", "typeD"],
      msg: "Views/APITest",
      accessToken: "accessToken",
      tabPosition: "left",
      addrForm: {
        region: ""
      },
      devForm: {
        device: ""
      }
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$message("submit!");
      console.log(this.form);
      // this.$message(this.form);
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    getList() {
      console.log("getdevlist start");
      this.$http
        .get("/device/addr_list/")
        .then(res => {
          console.log(res);
          // if (res.status == 200) {
          //   this.devlist = res.data.results;
          //   console.log("devlist:");
          //   console.log(this.devlist);
          //   this.listLoading = false;
          //   this.$message.success("获取device list数据成功");
          // } else {
          //   this.$message.warning("后端数据为空");
          // }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取用户数据失败");
        });
    },
    getCamList() {
      this.$http
        .get(`/dev-api/drf/camera/?addr=${this.addrForm.region}`)
        .then(res => {
          if (res.code === 200 || res.status === 200) {
            this.camList = res.data.results;
            console.log("camList");
            console.log(res);
            this.$message.error("获取camera/?addr数据成功");
            // "item.serial + ' type-' + String(item.sensertype)"
            this.$notify({
              title: this.camList[0].sensortype,
              message: this.camList[0].sensortype,
              position: "bottom-left"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取camera/?addr 数据失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
