<template>
  <div class="app-container">
    <el-button type="primary" @click="onSubmit">
      提交
    </el-button>
    <el-button @click="onCancel">取消</el-button>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { post } from "@/utils/my-axios-wrapper"
import axios from "axios"
export default {
  data() {
    return {
      send: "",
      parse: ""
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    sendParams() {
      post("", this)
    },
    onSubmit() {
      // params参数必写 , 如果没有参数传{}也可以
      axios.post("http://127.0.0.1:8000/api/v2/return_hello/", {
        params: {
          id: 12345,
          name: "userName"
        }
      })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
