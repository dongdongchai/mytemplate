<template>
  <div class="app-container">
    <el-tabs v-loading="listLoading" class="type" @tab-click="handleTabClick">
      <el-tab-pane class="cj" label="> > > 点击筛选沉降设备" name="沉降设备">
        <h5>筛选条件冲突时返回设备列表为空，请酌情选择筛选条件</h5>
        <el-form class="GeoFilter" :inline="true" :model="GeoSearchCJForm">
          <el-form-item label="地址">
            <el-select v-model="GeoSearchCJForm.addr" placeholder="请选择查询区域">
              <el-option label="不做筛选" value="" />
              <el-option
                v-for="(item, index, key) in GeoCJForm.Addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="杆塔">
            <el-select v-model="GeoSearchCJForm.Tower" placeholder="请选择查询杆塔">
              <el-option label="不做筛选" value="" />
              <el-option
                v-for="(item, index, key) in GeoCJForm.Tower"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="线路">
            <el-select v-model="GeoSearchCJForm.Line" placeholder="请选择查询线路">
              <el-option label="不做筛选" value="" />
              <el-option
                v-for="(item, index) in GeoCJForm.Line"
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
    <el-form ref="form" class="StatForm" :model="StatsQueryForm">
      <el-form-item label="选择查询起始时间">
        <el-col :span="8">
          <el-form-item prop="date1">
            <el-date-picker v-model="StatsQueryForm.date1" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center;">--</el-col>
        <el-col :span="8">
          <el-form-item prop="date2">
            <el-time-picker v-model="StatsQueryForm.time1" placeholder="选择时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="选择查询结束时间">
        <el-col :span="8">
          <el-form-item prop="date1">
            <el-date-picker v-model="StatsQueryForm.date2" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center;">--</el-col>
        <el-col :span="8">
          <el-form-item prop="date2">
            <el-time-picker v-model="StatsQueryForm.time2" placeholder="选择时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- <el-form-item class="DateSpan" label="时间区间">
        <el-col :span="10">
          <el-form-item prop="date1">
            <el-date-picker v-model="StatsQueryForm.date1" type="date" placeholder="选择开始日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center;">--</el-col>
        <el-col :span="10">
          <el-form-item prop="date1">
            <el-date-picker v-model="StatsQueryForm.date2" type="date" placeholder="选择结束日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item label="选择设备">
        <el-select v-model="StatsQueryForm.serial" placeholder="请选择设备">
          <el-option
            v-for="(item, index, key) in DeviceList"
            :key="key"
            :label="item.serial+'-' + item.name+'(' + item.addr+ ')'"
            :value="item.serial"
            @click="fetchMonitorData"
          />
        </el-select>
        <!-- 搜索按钮 -->
        <el-button
          class="searchButton"
          icon="el-icon-search"
          style="left-margin=5px;"
          circle
          @click="fetchMonitorData"
        />
      </el-form-item>

      <!-- 级联菜单 -->
      <!-- <el-form-item class="DeviceChoice" label="选择设备2">
        <el-cascader :props="props" />
        <el-button
          class="searchButton"
          icon="el-icon-search"
          style="left-margin=5px;"
          circle
          @click="fetchMonitorData"
        />
      </el-form-item> -->
    </el-form>
    <el-divider />
    <div id="lineChart">
      <three-line-chart />
      <!-- <chart height="95%" width="100%" /> -->
    </div>
    <div class="statsTable">
      <el-table
        v-loading="listLoading"
        :data="CJStatList"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <!-- <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.cjs_id }}</span>
          </template>
        </el-table-column> -->

        <el-table-column align="center" label="createTime">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="东向偏移">
          <template slot-scope="scope">
            <span>{{ scope.row.east }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="北向偏移">
          <template slot-scope="scope">
            <span>{{ scope.row.north }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="高程偏移">
          <template slot-scope="scope">
            <span>{{ scope.row.height }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getTestCJStatsList } from "@/api/stats";
import ThreeLineChart from "./components/line";
// import { searchCJDeviceAccurate } from "@/api/cjdevice"
import { cjDeviceLineList, cjDeviceAddrList, cjDeviceTowerList, searchCJDeviceAccurate } from "@/api/cj"
// canvas bg color #880015

export default {
  components: { ThreeLineChart },
  data() {
    return {
      isclickedTabButton: true,
      listLoading: true,
      GeoSearchCJForm: {
        Line: "",
        Tower: "",
        addr: ""
      },
      GeoCJForm: {
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
      DeviceList: [],
      CJStatList0: {
        east: this.$store.state.stats.ve,
        north: this.$store.state.stats.hn,
        height: this.$store.state.stats.h,
        time: this.$store.state.stats.time
      },
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
    ...mapActions(["initChartProto", "setQueryForm"]),
    ...mapState(["ve", "hn", "h", "time"]),
    CJStatList() {
      const len = this.$store.state.stats.ve.length
      var obj = new Array(len);
      for (let i = 0; i < len; i++) {
        obj[i] = {};
        obj[i]["east"] = this.$store.state.stats.ve[i]
        obj[i]["north"] = this.$store.state.stats.hn[i]
        obj[i]["height"] = this.$store.state.stats.h[i]
        obj[i]["createTime"] = this.$store.state.stats.time[i]
      }
      console.log("tableObj", obj);
      return obj
    }

  },
  created() {
    this.getCJLineData();
    this.getCJTowerData();
    this.getCJAddrData();
    this.searchDevice();
    this.fetchMonitorData()
    setTimeout(() => {
      this.listLoading = false;
    }, 1.0 * 1000);
  },
  mounted() {
    // this.$notify({
    //   title: "mounted title",
    //   message: "mounted msg",
    //   position: "bottom-right"
    // })
  },
  methods: {
    handleTabClick() {
      this.isclickedTabButton = false
      this.listLoading = false
    },
    searchDevice() {
      searchCJDeviceAccurate(this.GeoSearchCJForm)
        .then(Response => {
          console.log("searchCJDeviceAccurate", Response)
          if (Response.code !== []) {
            this.DeviceList = Response
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
    QueryCJStats() {
      this.chartData = getTestCJStatsList()
    },
    onSubmit() {
      this.$message("submit!");
      console.log(this.form);
      // this.$message(this.form);
    },
    getCJLineData() {
      cjDeviceLineList().then(Response => {
        this.GeoCJForm.Line = Response.Linelist
      })
    },
    getCJTowerData() {
      cjDeviceTowerList().then(Response => {
        // console.log("cjDeviceTowerList", Response.Towerlist)
        this.GeoCJForm.Tower = Response.Towerlist
      })
    },
    getCJAddrData() {
      cjDeviceAddrList().then(Response => {
        // console.log("cjDeviceAddrList", Response.addrlist)
        this.GeoCJForm.Addr = Response.addrlist
      })
    },
    fetchMonitorData() {
      if (this.StatsQueryForm.serial !== "") {
        console.log("\'fetchMonitorData\'\:this\.StatsQueryForm", this.StatsQueryForm);
        this.$store.dispatch("stats/setQueryForm", this.StatsQueryForm)
        this.$store.dispatch("stats/initChartProto")
        // searchSpanCJStat(this.StatsQueryForm).then(Response => {
        //   console.log("searchSpanCJStat", Response)
        //   this.CJStatList = Response
        //   this.$store.dispatch("stats/initChartProto", this.StatsQueryForm)
        // })

        // this.CJStatList.east = this.$store.state.stats.ve
        // this.CJStatList.north = this.$store.state.stats.hn
        // this.CJStatList.height = this.$store.state.stats.h
        // console.log("this.CJStatList.height", this.CJStatList.height);
      } else {
        console.log("'fetchMonitorData'\:no preset serial of device to search");
      }
    },
    echoValue(item) {
      console.log("item", item)
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
