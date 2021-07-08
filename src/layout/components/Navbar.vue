<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <el-image :src="url" style="height:35px; width:420px;" /> -->
      <!-- <el-image :src="logoUrl" style="height:35px; width:420px;" /> -->

      <!--<el-dropdown class="avatar-container" trigger="click">-->
      <!--  <div class="avatar-wrapper">-->
      <!--    <img :src="avatarUrl" style="margin-bottom: 8px" class="user-avatar">-->
      <!--    <i class="el-icon-caret-bottom" />-->
      <!--  </div>-->
      <!--  <el-dropdown-menu slot="dropdown" class="user-dropdown">-->
      <!--    <router-link to="/">-->
      <!--      <el-dropdown-item>-->
      <!--        首 页-->
      <!--      </el-dropdown-item>-->
      <!--    </router-link>-->
      <!--    <el-dropdown-item divided @click.native="logout">-->
      <!--      <span>登 出</span>-->
      <!--    </el-dropdown-item>-->
      <!--  </el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      // 修改顶部导航栏图片
      // 晋能控股山西科学技术研究院（晋城）技术研究院
      // url: "https://s3.ax1x.com/2021/02/18/yWIyeH.jpg",
      // 修改顶部导航栏图片，修改时使用//注释该行，不用直接替换，以免造成错误无法回退到历史版本
     // url: "https://s3.ax1x.com/2021/02/18/yWIyeH.jpg",
      // 晋能控股山西科学技术研究院（晋城）技术研究院
      // url: "https://s3.ax1x.com/2021/02/18/yWIyeH.jpg",
    //  avatarUrl: "https://s3.ax1x.com/2021/02/10/yw5At1.png"
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    logoUrl() {
      console.log("why cannot use avatar url?", this.$store.state.user.avatar)
      this.url = this.$store.state.user.avatar
      return this.$store.state.user.avatar
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .NavInfo {
    // position: relative;
    // vertical-align: center;
    // height: 100%;
    font-size: 18px;
    //text-align: center;
    font-weight: bold;
    margin-bottom: 70px;
    // margin: 10px auto 30px 10px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .el-image {
      padding: 0 8px;
      margin-top: 7px;
      margin-bottom: 7px;
      display: inline-block;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
