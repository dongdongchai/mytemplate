<template>
  <div class="app-container">
    <el-table-column label="弹出框">
      <template slot-scope="scope">
        <el-button @click="testBtn(scope.row)">查看弹框</el-button>
        <!-- 这个scope.row是当前表格一行的所有数据，例如 scope.row.id就可以拿到后端传过来的id，然后把这个id传给后端，用来操作这一行（例如各种点击事件） -->
      </template>
    </el-table-column>

    <!-- 删除弹框 -->
    <el-dialog title="删除" :visible.sync="deleteVisible" width="25%">
      <span>该设备所有历史监测数据也将被删除,确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <!-- Fuzzy Search -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索关键字">
          <el-input v-model="formInline.keyWords" placeholder="keyWords" />
        </el-form-item>
        <el-form-item label="传感器类型">
          <el-select v-model="formInline.Type" placeholder="图像/倾斜/沉降">
            <el-option label="摄像设备" value="cam" @click.native="onSubmit" />
            <el-option label="沉降传感器" value="cj" @click.native="onSubmit" />
            <el-option label="倾斜传感器" value="qx" @click.native="onSubmit" />
          </el-select>
        </el-form-item>
        <el-form-item />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">模糊查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDevice">新增设备</el-button>
        </el-form-item>
      </el-form>
      <el-table-column label="弹出框">
        <template slot-scope="scope">
          <el-button @click="testBtn(scope.row)">查看弹框</el-button>
          <!-- 这个scope.row是当前表格一行的所有数据，例如 scope.row.id就可以拿到后端传过来的id，然后把这个id传给后端，用来操作这一行（例如各种点击事件） -->
        </template>
      </el-table-column>
      <el-table
        v-loading="listLoading"
        :data="myDeviceListTrim"
        border
        :default-sort="{prop: 'serial', order: 'ascending'}"
        element-loading-text="拼命加载中"
        style="width: 100%;"
      >
        <!-- <el-table-column prop="cj_id" label="ID" width="50px" /> -->
        <el-table-column prop="serial" label="编号" sortable width="110px" />
        <el-table-column prop="name" label="名称" sortable width="160px" />
        <el-table-column prop="addr" label="地址" sortable width="350px" />
        <el-table-column prop="Line" label="线路" sortable width="110px" />
        <el-table-column prop="Tower" label="杆塔" sortable width="110px" />
        <el-table-column prop="Tel" label="联系电话" sortable width="125px" />
        <el-table-column prop="GroupNum" label="组号" sortable width="100px" />
        <el-table-column prop="simNum" label="sim卡号码" sortable width="125px" />
        <el-table-column prop="createTime" label="创建时间" sortable width="170px" />
        <el-table-column prop="operation" label="操作 " width="240px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="jump2UpdateDevice(scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteUpdate(scope.row)"
            >删除</el-button>
            <el-button
              size="small"
              type="info"
              @click="jump2DeviceHistory(scope.row.serial)"
            >监测数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex"
import {
  searchCJDeviceFuzzy,
  searchCJDeviceAll,
  deleteCJDevice
} from "@/api/cj";
import {
  searchQXDeviceFuzzy,
  deleteQXDevice,
  searchQXDeviceAll
} from "@/api/qx";
import {
  searchCAMDeviceFuzzy,
  deleteCAMDevice,
  searchCAMDeviceAll
} from "@/api/cam";
export default {
  data() {
    return {
      listLoading: true,
      isShowEditVisible: false,
      deleteVisible: false,
      myDeviceList: [],
      formInline: {
        keyWords: "",
        Type: "cj"
      },
      list: {
        code: 20000,
        data: {
          total: 100,
          list: [],
          items: []
        }
      },
      devform: {
        date: "",
        status: "",
        name: "",
        serial: "",
        addr: "",
        Line: "",
        Tower: "",
        Lng: "",
        Lat: "",
        Tel: "",
        simNum: "",
        GroupNum: ""
      },
      total: 0,
      curserial: 0,
      page: 1,
      pageSize: 10,
      status: [
        {
          statusId: 1,
          label: "关注"
        },
        {
          statusId: 0,
          label: "不关注"
        }
      ],
      value: "",
      searchName: ""
    };
  },
  computed: {
    ...mapMutations(["stats/SET_SERIAL", "device/SET_DEVFORM"]),
    ...mapActions(["stats/setQueryForm"]),
    myDeviceListTrim() {
      if (this.myDeviceList) {
        const len = this.myDeviceList.length
        for (var i = 0; i < len; i++) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.myDeviceList[i].createTime = this.myDeviceList[i].createTime.toString().slice(0, 19)
          if (!this.$store.getters.group_num.includes(this.myDeviceList[i].GroupNum)) {
            console.log("no permission to see this row: ", this.myDeviceList[i])
            delete this.myDeviceList[i]
          }
        }
        console.log("user.group_num", this.$store.state.user.group_num)
        console.log("getters.group_num", this.$store.getters.group_num)
        return this.myDeviceList
      } else {

        return {}
      }
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    testBtn(item) {
      console.log();
    },
    fetchData() {
      this.listLoading = true;
      if (this.formInline.Type === "cj") {
        searchCJDeviceAll().then(response => {
          console.log("searchCJDeviceAll", response);
          this.myDeviceList = response;
        });
      } else {
        if (this.formInline.Type === "qx") {
          searchQXDeviceAll().then(response => {
            console.log(response);
            this.myDeviceList = response;
          });
        } else {
          if (this.formInline.Type === "cam") {
            searchCAMDeviceAll().then(response => {
              console.log(response);
              this.myDeviceList = response;
            });
          }
        }
      }

      this.listLoading = false;
    },
    addDevice() {
      this.jump2AddDevice();
    },
    onSubmit() {
      this.listLoading = true
      // console.log("this.formInline.keyWords", this.formInline.keyWords);
      // console.log("this.formInline.Type", this.formInline.Type);
      if (this.formInline.Type === "cj") {
        searchCJDeviceFuzzy(this.formInline.keyWords).then(response => {
          this.myDeviceList = response;
        });
      } else {
        if (this.formInline.Type === "qx") {
          searchQXDeviceFuzzy(this.formInline.keyWords).then(response => {
            console.log("searchQXDevice_response", response)
            this.myDeviceList = response;
            this.formInline.Type = "qx"
          });
        } else {
          if (this.formInline.Type === "cam") {
            searchCAMDeviceFuzzy(this.formInline.keyWords).then(response => {
              console.log("searchCAMDevice_response", response)
              this.myDeviceList = response;
              this.formInline.Type = "cam"
            });
          }
        }
      }
      this.listLoading = false
    },
    jump2UpdateDevice(info) {
      // console.log("scope.row", info);
      this.devform = Object.assign({}, info);
      console.log("this.devform", this.devform);
      this.$store.commit("device/SET_DEVFORM", info);
      this.$router.push("/map/import_map");
    },
    jump2AddDevice(info) {
      // console.log("scope.row", info);
      this.devform = Object.assign({}, info);
      console.log("this.devform", this.devform);
      this.$store.commit("device/SET_DEVFORM", {});
      this.$router.push("/map/import_map");
    },
    jump2DeviceHistory(serial) {
      if (this.formInline.Type === "cj") {
        // here it stand for set cj serial
        this.$store.commit("stats/SET_SERIAL", serial);
        this.$router.push("/stats/Carousel");
      } else {
        if (this.formInline.Type === "qx") {
          this.$store.commit("qxstats/SET_SERIAL", serial);
          this.$router.push("/stats/Inclination");
        } else {
          if (this.formInline.Type === "cam") {
            this.$store.commit("cam/SET_SERIAL", serial);
            this.$router.push("/stats/realTime");
          }
        }
      }
    },
    handleUpdate(row) {
      this.isShowEditVisible = true;
      this.devform = Object.assign({}, row);
      console.log("this.devform", this.devform);
    },
    deleteUpdate(row) {
      console.log("deleteUpdate.row", row);
      this.curserial = row.serial
      this.deleteVisible = true;
      // this.devform = Object.assign({}, row);
      this.$message({
        message: "该设备所有数据将被删除",
        type: "warning"
      });
    },
    submitDelete() {
      // console.log("this.formInline.Type", this.formInline.Type);
      if (this.formInline.Type === "cj") {
        deleteCJDevice({ serial: this.curserial });
      } else {
        if (this.formInline.Type === "qx") {
          deleteQXDevice({ serial: this.curserial });
        } else {
          if (this.formInline.Type === "cam") {
            deleteCAMDevice({ serial: this.curserial });
          }
        }
      }
      this.deleteVisible = false;
      this.listLoading = true
      this.onSubmit();
      this.listLoading = false
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
    }
  }
};
</script>
