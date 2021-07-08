<template>
  <div>
    <!-- <iframe height=400px weidth=800px :src=src></iframe> -->
    <iframe
      id="ysOpenDevice"
      :src="src"
      width="100%"
      height="600"
      allowfullscreen
    />
    <el-row :gutter="32">
      <el-col :xs="16" :sm="16" :lg="8">
        <el-button @click="store.state.camera.UpdateAvailableToken">getToken</el-button>
        <p v-text="this.$store.state.camera.CameraInfo.expireTime" />
        <p v-text="this.$store.state.camera.CameraInfo.accessToken" />
      </el-col>
      <el-col :xs="16" :sm="16" :lg="8">
        <el-button @click="getJoke">getJoke</el-button>
        <p v-text="joke.slice(1, 10)" />
      </el-col>
    </el-row>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from "axios";
// import { mapGetters } from "vuex";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      listLoading: true,
      CamQuery: {
        appKey: "15f2c1a32d2045c08a0b2833de82b34b",
        appSecret: "c7234c3fcec12a5889dfe5901ff1718f"
      },
      msg: "Views/APITest",
      // accessToken: "accessToken",
      // expireTime: 9992166585948,
      joke: "jokeAPITestAPITest",
      src: "https://segmentfault.com/",
      src0:
        "https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/E16170999/1.live&autoplay=0&audio=1&accessToken=at.1w1dhhbp2dznbc64a2j98lby6868y3ma-2rtigwhr48-08jdq7c-1pwfmieam&templete=2"
    };
  },

  computed: {
    ...mapGetters(["CameraInfo"])
  },

  mounted() {
    // this.$store.camera.commit("RESET_TOKEN");
    this.$message.success("created");
  },
  methods: {
    PlayVideo0() {
      this.listLoading = true;
      this.$http
        .post(
          "https://open.ys7.com/api/lapp/token/get?appKey=" +
            this.CamQuery.appKey +
            "&appSecret=" +
            this.CamQuery.appSecret
        )
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.code == "200") {
            this.$message.success("发送请求成功");
            this.$store.state.accessToken = response.data.data.accessToken;
            this.$store.state.expireTime = response.data.data.expireTime;
            console.log("expireTime");
            console.log(this.expireTime);
            console.log("accessToke");
            console.log(this.accessToke);
            this.$message.success("获取accessToken数据成功");
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("获取accessToken数据失败");
        });
    },

    PlayVideo() {
      this.$message.success("PlayVideo Button clicked");
      this.store.commit("camera/AvailableToken");
      this.$message.success("commit AvailableToken");
      console.log(this);
      // if (
      //   this.$store.camera.expireTime - Date.now() < 86400000 ||
      //   this.$store.camera.expireTime - Date.now() > 86400000 * 6
      // ) {
      //   // this.$store.camera.commit("UPDATE_TOKEN");
      //   // this.$message.success("commit 'UPDATE_TOKEN' 并获取accessToken");
      //   this.resetTokenAction()
      //   this.$message.success("resetTokenAction");
      // }
      // this.$message.success("then 直接从store获取accessToken");
    },

    handleClick() {
      // this.$message.success("handleClick Button clicked");
      this.$store.dispatch("camera/UpdateAvailableToken");
    },

    getJoke: function() {
      this.$http
        .get("https://autumnfish.cn/api/joke")
        .then(response => {
          this.joke = response.data;
          // console.log(response);
          // console.log(this.joke);
          this.$message.success("获取joke数据成功");
        })
        .catch(err => {
          this.$message.error("获取joke数据失败");
        });
    },

    async resetTokenAction() {
      await this.$store.camera.dispatch("resetAccessToken");
      console.log("async action: callback mutation 'RESET_TOKEN' ");
    }
  }
};
</script>
<style scoped></style>
