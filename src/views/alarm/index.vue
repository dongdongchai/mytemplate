<template>
  <div class="app-container">
    <el-table-column label="弹出框">
      <template slot-scope="scope">
        <el-button @click="testBtn(scope.row)">查看弹框</el-button>
        <!-- 这个scope.row是当前表格一行的所有数据，例如 scope.row.id就可以拿到后端传过来的id，然后把这个id传给后端，用来操作这一行（例如各种点击事件） -->
      </template>
    </el-table-column>
    <!-- 自动校零漂弹框 -->
    <el-dialog title="自动校正零漂" :visible.sync="autoZeroDriftVisible" width="25%">
      <span>该设备零漂将自动校准, 若其本身原始监测数值较大，此操作将抹平该偏差。操作不可撤销，确认校准吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="autoZeroDriftVisible = false">取 消</el-button>
        <el-button type="primary" @click="autoSubmitAdjustZeroDrift">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 手动校零漂弹框 -->
    <el-dialog title="手动校准零漂" :visible.sync="manuZeroDriftVisible" width="25%">
      <el-form v-show="!isQXType" ref="devform" :model="devform">
        <el-form-item label="北向零漂">
          <el-input v-model="devform.eastDrift" />
        </el-form-item>
        <el-form-item label="东向零漂">
          <el-input v-model="devform.heightDrift" />
        </el-form-item>
        <el-form-item label="高程零漂">
          <el-input v-model="devform.northDrift" />
        </el-form-item>
      </el-form>
      <el-form v-show="isQXType" ref="qxdevform" :model="devform">
        <el-form-item label="横向零漂">
          <el-input v-model="devform.hstatDrift" />
        </el-form-item>
        <el-form-item label="顺向零漂">
          <el-input v-model="devform.vstatDrift" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="manuZeroDriftVisible = false">取 消</el-button>
        <el-button type="primary" @click="manuSubmitAdjustZeroDrift">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 手动设置报警阈值对话框 -->
    <el-dialog title="设置报警阈值" :visible.sync="isSetThreshold" width="25%">
      <el-form v-show="!isQXType" :model="thresholdForm">
        <el-form-item label="北向阈值">
          <el-input v-model="thresholdForm.east" />
        </el-form-item>
        <el-form-item label="东向阈值">
          <el-input v-model="thresholdForm.height" />
        </el-form-item>
        <el-form-item label="高程阈值">
          <el-input v-model="thresholdForm.north" />
        </el-form-item>
      </el-form>
      <el-form v-show="isQXType" :model="thresholdForm">
        <el-form-item label="横向阈值">
          <el-input v-model="thresholdForm.hstat" />
        </el-form-item>
        <el-form-item label="顺向阈值">
          <el-input v-model="thresholdForm.vstat" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSetThreshold = false">取 消</el-button>
        <el-button type="primary" @click="submitThreshold">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <!-- Fuzzy Search -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索关键字">
          <el-input v-model="formInline.keyWords" placeholder="keyWords" />
        </el-form-item>
        <el-form-item label="传感器类型">
          <el-select v-model="formInline.Type" placeholder="倾斜/沉降">
            <el-option label="沉降传感器" value="cj" @click.native="onSubmit" />
            <el-option label="倾斜传感器" value="qx" @click.native="onSubmit" />
          </el-select>
        </el-form-item>
        <el-form-item />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">模糊查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="openThresholdDlg">修改报警阈值</el-button>
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
        :data="watchDeviceList"
        border
        element-loading-text="拼命加载中"
        style="width: 100%;"
      >
        <el-table-column prop="serial" label="编号" width="100" />
        <el-table-column prop="name" label="名称" />

        <el-table-column v-if="formInline.Type=='cj'" prop="eastDrift" label="北向零漂" />
        <el-table-column v-if="formInline.Type=='cj'" prop="heightDrift" label="东向零漂" />
        <el-table-column v-if="formInline.Type=='cj'" prop="northDrift" label="高程零漂" />

        <el-table-column v-if="formInline.Type=='qx'" prop="hstatDrift" label="横向零漂" />
        <el-table-column v-if="formInline.Type=='qx'" prop="vstatDrift" label="顺向零漂" />

        <el-table-column prop="operation" label="操作 " width="250px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="manuAdjusZeroDrift(scope.row)"
            >手动校准零漂</el-button>
            <el-button
              size="small"
              type="danger"
              @click="autoAdjusZeroDrift(scope.row)"
            >自动校准零漂</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <alarm-stats-table />
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import {
  searchCJDeviceFuzzy,
  searchCJDeviceAll,
  autoSetCJDeviceZeroDrift,
  setCJDeviceZeroDrift,
  getThreshold,
  setThreshold
} from "@/api/cj";
import {
  autoSetQXDeviceZeroDrift,
  setQXDeviceZeroDrift,
  searchQXDeviceFuzzy,
  searchQXDeviceAll
} from "@/api/qx";
import alarmStatsTable from "./alarmStatsTable.vue";
export default {
  components: { alarmStatsTable },
  data() {
    return {
      listLoading: true,
      isShowEditVisible: false,
      deleteVisible: false,
      autoZeroDriftVisible: false,
      manuZeroDriftVisible: false,
      isSetThreshold: false,
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
        eastDrift: "",
        northDrift: "",
        heightDrift: ""
      },
      thresholdForm: {
        east: "",
        height: "",
        north: "",
        hstat: "",
        vstat: ""
      },
      total: 0,
      curserial: 0,
      value: "",
      searchName: ""
    };
  },
  computed: {
    ...mapMutations(["stats/SET_SERIAL", "device/SET_DEVFORM"]),
    watchDeviceList() {
      return this.myDeviceList
    },
    isQXType() {
      if (this.formInline.Type === "qx") {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    devtype: function(newVal, oldVal) {
      this.onSubmit()
    }
  },
  mounted() {
    this.onSubmit()
    // this.listLoading = false;
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
        }
      }
      this.listLoading = false;
    },
    onSubmit() {
      this.listLoading = true
      console.log("this.formInline.keyWords", this.formInline.keyWords);
      console.log("this.formInline.Type", this.formInline.Type);
      if (this.formInline.Type === "cj") {
        searchCJDeviceFuzzy(this.formInline.keyWords).then(response => {
          this.myDeviceList = response;
        });
      } else {
        searchQXDeviceFuzzy(this.formInline.keyWords).then(response => {
          console.log("searchQXDevice_response", response)
          this.myDeviceList = response;
          this.formInline.Type = "qx"
        });
      }
      getThreshold().then(response => {
        console.log("getThreshold:", response)
        // this.thresholdForm = response;
      });
      this.listLoading = false
    },
    submitThreshold() {
      console.log("submitThreshold")
      setThreshold(this.thresholdForm).then(response => {
        this.$notify({
          title: response.msg,
          position: "top-right"
        })
        this.isSetThreshold = false
      });
    },
    openThresholdDlg() {
      getThreshold().then(response => {
        this.thresholdForm = response.threshold;
        console.log("this.thresholdForm", this.thresholdForm)
      });
      this.isSetThreshold = true
    },
    autoAdjusZeroDrift(row) {
      console.log("deleteUpdate.row", row);
      this.curserial = row.serial
      this.autoZeroDriftVisible = true;
      // this.devform = Object.assign({}, row);
      this.$message({
        message: "该设零漂将被自动修改",
        type: "warning"
      });
    },
    manuAdjusZeroDrift(row) {
      console.log("deleteUpdate.row", row);
      this.curserial = row.serial
      this.manuZeroDriftVisible = true;
      // this.devform = Object.assign({}, row);
      this.$message({
        message: "该设零漂将被手动修改",
        type: "warning"
      });
    },
    // 自动设零漂，仅能对cj设备进行设置
    autoSubmitAdjustZeroDrift() {
      console.log("this.formInline.Type", this.formInline.Type);
      if (this.formInline.Type === "cj") {
        autoSetCJDeviceZeroDrift({ serial: this.curserial });
      } else {
        if (this.formInline.Type === "qx") {
          autoSetQXDeviceZeroDrift({ serial: this.curserial });
        }
      }
      this.autoZeroDriftVisible = false;
      this.listLoading = true
      this.onSubmit();
      this.listLoading = false
      this.$notify({
        title: "done",
        message: "提交成功",
        type: "success",
        duration: 3000
      });
    },
    // 手动设零漂，仅能对cj设备进行设置
    manuSubmitAdjustZeroDrift() {
      console.log("this.formInline.Type", this.formInline.Type)
      if (this.formInline.Type === "cj") {
        setCJDeviceZeroDrift({
          serial: this.curserial, northDrift: this.devform.northDrift,
          heightDrift: this.devform.heightDrift, eastDrift: this.devform.eastDrift })
      } else {
        if (this.formInline.Type === "qx") {
          setQXDeviceZeroDrift({
            serial: this.curserial,
            hstatDrift: this.devform.hstatDrift,
            vstatDrift: this.devform.vstatDrift
          })
        }
      }
      // this.fetchData()
      // console.log("this.fetchData()", this.fetchData())
      this.manuZeroDriftVisible = false;
      this.listLoading = true
      this.onSubmit();
      this.listLoading = false
      this.$notify({
        title: "成功",
        message: "校准成功",
        type: "success",
        duration: 3000
      });
    }
  }
};
</script>
