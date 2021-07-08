<template>
  <div class="app-container">
    <el-tabs v-loading="listLoading" class="type" @tab-click="handleTabClick">
      <el-tab-pane class="qx" label="> > > 点击筛选倾斜设备" name="倾斜设备">
        <h5>筛选条件冲突时返回设备列表为空，请酌情选择筛选条件</h5>
        <el-form class="GeoFilter" :inline="true" :model="GeoSearchQXForm">
          <el-form-item label="地址">
            <el-select v-model="GeoSearchQXForm.addr" placeholder="请选择查询区域">
              <el-option label="不做筛选" value="" />
              <el-option
                v-for="(item, index, key) in GeoQXForm.Addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="杆塔">
            <el-select v-model="GeoSearchQXForm.Tower" placeholder="请选择查询杆塔">
              <el-option label="不做筛选" value="" />
              <el-option
                v-for="(item, index, key) in GeoQXForm.Tower"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="线路">
            <el-select v-model="GeoSearchQXForm.Line" placeholder="请选择查询线路">
              <el-option label="不做筛选" value="" />
              <el-option
                v-for="(item, index) in GeoQXForm.Line"
                :key="index"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="生成设备列表">
            <el-button icon="el-icon-search" style="left-margin=5px;" circle @click="searchDevice" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <span v-show="isclickedTabButton">请先选择设备</span>
    <el-divider />
    <el-form ref="statForm" class="StatForm" :inline="true" :rules="statFormRules" :model="StatsQueryForm">
      <el-form-item label="选择查询起始时间:" prop="date1">
        <el-date-picker v-model="StatsQueryForm.date1" type="date" placeholder="选择日期" style="width: 150px;" />
      </el-form-item>
      <el-form-item prop="time1">
        <el-time-picker v-model="StatsQueryForm.time1" placeholder="选择时间" style="width: 140px;" />
      </el-form-item>
      <el-form-item label="选择查询结束时间:" prop="date2">
        <el-date-picker v-model="StatsQueryForm.date2" type="date" placeholder="选择日期" style="width: 150px;" />
      </el-form-item>
      <el-form-item prop="time2">
        <el-time-picker v-model="StatsQueryForm.time2" placeholder="选择时间" style="width: 140px;" />
      </el-form-item>
      <el-form-item label="选择设备">
        <el-select v-model="StatsQueryForm.serial" placeholder="请选择设备">
          <el-option
            v-for="(item, index, key) in DeviceList"
            :key="key"
            :label="item.serial+'-' + item.name+'(' + item.addr+ ')'"
            :value="item.serial"
          />
        </el-select>
        <el-button
          class="searchButton"
          icon="el-icon-search"
          style="left-margin=5px;"
          circle
          @click="submitForm('statForm')"
        />
      </el-form-item>
    </el-form>
    <el-divider />
    <div id="lineChart">
      <two-line-chart />
      <!-- <chart height="95%" width="100%" /> -->
    </div>
    <el-table-row>
      <el-input v-model="filename" :placeholder="文件名" style="margin:0 0 20px 20px;width:300px;" prefix-icon="el-icon-document" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="info" plain icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>
    </el-table-row>
    <div class="qxstatsTable">
      <el-table
        id="table"
        v-loading="listLoading"
        :data="QXStatList"
        border
        fit
        highlight-current-row
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <!-- <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.index }}</span>
          </template>
        </el-table-column> -->

        <el-table-column width="200px" align="center" sortable prop="date" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="顺向倾斜角">
          <template slot-scope="scope">
            <span>{{ scope.row.vstat.toFixed(4) }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="横向倾斜角">
          <template slot-scope="scope">
            <span>{{ scope.row.hstat.toFixed(4) }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import TwoLineChart from "./components/line";
import { qxDeviceLineList, qxDeviceAddrList, qxDeviceTowerList, searchQXDeviceAccurate } from "@/api/qx"
import XLSX from "xlsx"

export default {
  name: "Inclination",
  components: { TwoLineChart },
  data() {
    return {
      isclickedTabButton: true,
      GeoSearchQXForm: {
        Line: "",
        Tower: "",
        addr: ""
      },
      GeoQXForm: {
        Line: [],
        Tower: [],
        Addr: []
      },
      StatsQueryForm: {
        serial: "",
        date1: "",
        time1: "",
        date2: "",
        time2: ""
      },
      statFormRules: {
        serial: [
          { required: true, message: "请选择设备", trigger: "change" }
        ],
        date1: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        date2: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        time1: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        time2: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      DeviceList: [],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map(item => ({
              value: ++this.id,
              label: `选项${this.id}`,
              leaf: level >= 2
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 100);
        }
      }
    };
  },
  computed: {
    filename() {
      return this.$store.state.qxstats.label
    },
    QXStatList() {
      if (this.$store.state.qxstats.vstat) {
        const len = this.$store.state.qxstats.vstat.length
        var obj = new Array(len);
        for (let i = 0; i < len; i++) {
          obj[i] = {};
          obj[i]["vstat"] = this.$store.state.qxstats.vstat[i]
          obj[i]["hstat"] = this.$store.state.qxstats.hstat[i]
          obj[i]["createTime"] = this.$store.state.qxstats.time[i].toString().slice(0, 10) + "-" + this.$store.state.qxstats.time[i].toString().slice(11, 19)
        }
        // console.log("this.$store.state.qxstats.time", this.$store.state.qxstats.time);
        // console.log("tableObj", obj);
        return obj
      } else {
        return []
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.listLoading = false;
    }, 1.0 * 1000);
    this.getQXLineData();
    this.getQXTowerData();
    this.getQXAddrData();
    this.searchDevice();
    this.fetchMonitorData()
  },
  methods: {
    handleTabClick() {
      this.isclickedTabButton = false
      this.listLoading = false
    },
    searchDevice() {
      this.listLoading = true
      searchQXDeviceAccurate(this.GeoSearchQXForm)
        .then(Response => {
          console.log("fetch Device List", Response)
          this.listLoading = false
          if (Response.code !== []) {
            this.DeviceList = Response
            this.DeviceList.forEach((item, index) => {
              if(this.$store.getters.group_num.indexOf(item.GroupNum) < 0) {
                console.log("item.GroupNum", item.index)
                this.DeviceList.splice(index,1)
              }
            })
            this.$notify({
              title: "查询成功",
              message: "已得到设备列表",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "设备列表为空,请重新查询"
            });
          }
        })
    },
    getQXLineData() {
      qxDeviceLineList().then(Response => {
        this.GeoQXForm.Line = Response.Linelist
      })
    },
    getQXTowerData() {
      qxDeviceTowerList().then(Response => {
        // console.log("qxDeviceTowerList", Response.Towerlist)
        this.GeoQXForm.Tower = Response.Towerlist
      })
    },
    getQXAddrData() {
      qxDeviceAddrList().then(Response => {
        // console.log("qxDeviceAddrList", Response.addrlist)
        this.GeoQXForm.Addr = Response.addrlist
      })
    },
    fetchMonitorData() {
      if (this.StatsQueryForm.serial !== "") {
        console.log("\'fetchMonitorData\'\:this\.StatsQueryForm", this.StatsQueryForm);
        this.$store.dispatch("qxstats/setQueryForm", this.StatsQueryForm)
        this.$store.dispatch("qxstats/initChartProto")
      } else {
        console.log("'fetchMonitorData'\:no preset serial of device to search");
        console.log("dispatch store/qxstats/setQueryForm, default { serial: 1 }");
        this.$store.dispatch("qxstats/setQueryForm", { serial: 1 })
      }
    },
    echoValue(item) {
      console.log("item", item)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchMonitorData()
          this.$notify({
            title: "提交查询成功",
            // message: "mounted msg",
            position: "top-right"
          })
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查表单信息是否完整"
          });
          return false;
        }
      });
    },
    handleDownload() {
      console.log("handleDownload")
      const table = document.getElementById("table")
      const worksheet = XLSX.utils.table_to_sheet(table)
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");
      XLSX.writeFile(workbook, this.filename + ".xlsx");
    }
  }
};
</script>

<style scoped>
.components-container {
  position: relative;
  height: 100vh;
}
/* .edit-input {
  padding-right: 100px;
} */
/* .cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
} */
.dateChoice {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.el-cascader {
  position: relative;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}
.searchButton {
  margin-left: 2vh;
}
.lineChart {
  height: 50vh;
  display: block;
}
</style>
