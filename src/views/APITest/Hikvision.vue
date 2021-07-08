<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="查询区域">
        <el-select v-model="form.region" placeholder="请选择查询区域">
          <el-option
            v-for="(item, index, key) in uniqueAddrList"
            :key="key"
            :label="item.addr"
            :value="item.addr"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row gutter="20">
      <el-col v-for="(v, i, k) in ACamList" :key="k" :span="5">
        <el-card shadow="hover">
          <el-button style="height=100% weidth=100%">
            摄像头{{ v.serial }}-{{ v.id }}
          </el-button>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import { color } from "echarts/lib/export";
export default {
  data() {
    return {
      addrList: [
        {
          serial: "RTO",
          sensortype: 3,
          addr: "000001111122222",
          createTime: "2020-09-28T21:23:35.641082+08:00",
          modifyTime: "2020-09-28T21:23:35.641082+08:00",
          day_since_created: 10,
          type_selected: 30
        },
        {
          serial: "PQO",
          sensortype: 1,
          addr: "000001111122222",
          createTime: "2020-09-28T21:23:35.717094+08:00",
          modifyTime: "2020-09-28T21:23:35.717094+08:00",
          day_since_created: 10,
          type_selected: 10
        },
        {
          serial: "HYS",
          sensortype: 2,
          addr: "000001111122222",
          createTime: "2020-09-28T21:23:35.815090+08:00",
          modifyTime: "2020-09-28T21:23:35.815090+08:00",
          day_since_created: 10,
          type_selected: 20
        }
      ],
      uniqueAddrList: [],
      ACamList: [],
      form: {
        region: ""
      }
    };
  },
  mounted() {
    this.uniqueAddrList = this.unique(this.addrList);
  },
  methods: {
    onSubmit() {
      // this.$message("submit!");
      this.$notify({
        title: "form option",
        message: "submit!",
        position: "bottom-right"
      });
      console.log(this.form);
      // this.$message(this.form);
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.addr) && res.set(arr.addr, 1));
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
