<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <!-- add device form / update device form -->
      <el-form-item label="设备类型" prop="name">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="沉降" value="cj" />
          <el-radio label="倾斜" value="qx" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item
        label="序列号"
        prop="serial"
        :rules="[
          { required: true, message: '序列号不能为空'},
          { type: 'number', message: '序列号必须为数字值'}
        ]"
      >
        <el-input v-model="ruleForm.serial" />
      </el-form-item>
      <el-form-item label="序列号2" prop="serial2">
        <el-input v-model="ruleForm.serial2" />
      </el-form-item>
      <el-form-item label="线路" prop="Line">
        <el-input v-model="ruleForm.Line" />
      </el-form-item>
      <!-- button -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
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
