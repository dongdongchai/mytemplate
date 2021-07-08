<template>
  <div class="app-container">
    <el-tabs v-loading="listLoading" class="type" @tab-click="handleTabClick">
      <el-tab-pane class="cj" label="沉降设备" name="沉降设备">
        <el-form class="GeoFilter" :inline="true" :model="GeoCJForm">

          <el-form-item label="杆塔列表">
            <el-select v-model="GeoCJForm.Tower" placeholder="请选择查询杆塔">
              <el-option
                v-for="(item, index, key) in GeoCJForm.Tower"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="线路列表">
            <el-select v-model="GeoCJForm.Line" placeholder="请选择查询线路">
              <el-option
                v-for="(item, index) in GeoCJForm.Line"
                :key="index"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="查询设备">
            <el-button icon="el-icon-search" style="left-margin=5px;" circle @click="searchDevice" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane class="qx" label="倾斜设备" name="倾斜设备">
        qx
      </el-tab-pane>
    </el-tabs>
    <span v-show="isclickedTabButton">请先选择设备</span>
    <el-divider />
    <el-form ref="form" class="StatForm" :model="StatsQueryForm">
      <el-form-item class="DateSpan" label="时间区间">
        <el-col :span="10">
          <el-date-picker
            v-model="StatsQueryForm.date1"
            type="date"
            placeholder="选择开始日期"
            style="width: 100%;"
          />
        </el-col>
        <el-col class="line" :span="1" style="text-align: center;">--</el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="StatsQueryForm.date2"
            type="date"
            placeholder="选择结束日期"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item class="DeviceChoice" label="选择设备">
        <el-cascader :props="props" />
        <el-button
          class="searchButton"
          icon="el-icon-search"
          style="left-margin=5px;"
          circle
        />
      </el-form-item>
      <el-form-item label="选择设备2">
        <el-select v-model="DeviceList" placeholder="请选择设备">
          <el-option
            v-for="(item, index, key) in DeviceList"
            :key="key"
            :label="item"
            :value="item"
            @click="QueryCJStats"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider />
  </div>
</template>

<script>
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择设备类型"));
      } else {
        callback();
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("设备简要说明不能重复且不能为空"));
      } else {
        // if (this.ruleForm.name !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    var checkSerial2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("serial不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("设备编号必须为正整数(1-255)"));
          } else {
            callback();
          }
        }
      }, 500);
    };

    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        type: "", // 类型
        name: "", // 设备号
        serial: "", // 序列号
        serial2: "", // 序列号2
        Line: "0", // 线路
        Tower: "0", // 杆塔
        address: "", // 地址
        Lng: "", // 经度
        Lat: "", // 纬度
        Tel: "" // 联系电话
      },
      rules: {
        // pass: [
        //   { validator: validatePass, trigger: "blur" }
        // ],
        // checkPass: [
        //   { validator: validatePass2, trigger: "blur" }
        // ],
        // age: [
        //   { validator: checkAge, trigger: "blur" }
        // ],
        type: [
          { validator: validateType, trigger: "blur" }
        ],
        serial2: [
          { validator: checkSerial2, trigger: "blur" }
        ],
        name: [
          { validator: validateName, trigger: "blur" }
        ]

      }
    };
  },
  methods: {
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
<style lang="scss" scoped>

</style>
