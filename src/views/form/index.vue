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
      <el-form-item label="查询起始时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.clock1"
            type="fixed-time"
            placeholder="选择时刻"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="查询终止时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date2"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.clock2"
            type="fixed-time"
            placeholder="选择时刻"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="监测数据类型">
        <el-radio-group v-model="form.alarmType">
          <el-radio label="沉降" value="Carousel" />
          <el-radio label="倾斜" value="Inclination" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      form: {
        region: "",
        date1: "",
        clock1: "",
        date2: "",
        clock2: "",
        alarmType: ""
      }
    };
  },
  mounted() {
    this.uniqueAddrList = this.unique(this.addrList);
  },
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
