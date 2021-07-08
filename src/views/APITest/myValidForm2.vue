<template>
  <div>
    <!-- <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <el-divide />
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
          :model="ruleForm" ref="ruleForm" label="类型" status-icon :rules="rules" label-width="100px" class="demo-ruleForm"
        >
          <el-form-item label="设备名称" prop="name">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="沉降" value="cj" />
              <el-radio label="倾斜" value="qx" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="序列号" prop="serial">
            <el-input v-model="ruleForm.serial" />
          </el-form-item>
          <el-form-item label="线路" prop="Line">
            <el-input v-model="ruleForm.Line" />
          </el-form-item>
          <el-form-item label="杆塔" prop="Tower">
            <el-input v-model="ruleForm.Tower" />
          </el-form-item>
          <el-form-item label="联系电话" prop="Tel">
            <el-input v-model="ruleForm.Tel" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择设备类型"));
      } else {
        callback();
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
    var checkSerial = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("serial不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值(沉降为xx，倾斜为1xx)"));
        } else {
          if (value > 255 || value < 1) {
            callback(new Error("序列号必须为介于1-255的整数"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    
    return {
      ruleForm: {
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
        type: [
          { validator: validateType, trigger: "blur" }
        ],
        serial: [
          { validator: checkSerial, trigger: "blur" }
        ],
        name: [
          { validator: validateName, trigger: "blur" }
        ]
      }
    };
  },
  }
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
