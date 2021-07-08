<template>
  <div class="app-container">
    <el-tabs v-loading="listLoading" class="type" @tab-click="handleTabClick">
      <el-tab-pane class="qx" label="展开历史报警记录" name="history">
        <el-row>
          <el-input
            v-model="filename"
            style="margin:0 0 20px 20px;width:300px;"
            prefix-icon="el-icon-document"
          />
          <el-button
            :loading="downloadLoading"
            style="margin:0 0 20px 20px;"
            type="info"
            plain
            icon="el-icon-document"
            @click="handleDownload"
          >
            导出Excel
          </el-button>
          <el-select
            v-model="formInline.Type"
            placeholder="倾斜/沉降"
            style="margin:0 0 20px 20px;"
          >
            <el-option label="沉降报警" value="cj" @click.native="onSubmit" />
            <el-option label="倾斜报警" value="qx" @click.native="onSubmit" />
          </el-select>
          <el-pagination
            background
            :total="alarmQueryStats.count"
            :page-size="20"
            layout="prev, pager, next"
            :current-page.sync="pageQuery.p"
            @current-change="handleCurrentChange"
          />
        </el-row>
        <el-table
          id="table"
          v-loading="listLoading"
          :data="logList"
          border
          element-loading-text="拼命加载中"
          style="width: 100%;"
        >
          <el-table-column prop="serial" label="传感器编号" width="100" />

          <el-table-column
            v-if="formInline.Type == 'cj'"
            prop="east"
            label="东向"
          />
          <el-table-column
            v-if="formInline.Type == 'cj'"
            prop="height"
            label="高程"
          />
          <el-table-column
            v-if="formInline.Type == 'cj'"
            prop="north"
            label="北向"
          />
          <el-table-column
            v-if="formInline.Type == 'cj'"
            prop="ori_east"
            label="原始东向数据"
          />
          <el-table-column
            v-if="formInline.Type == 'cj'"
            prop="ori_height"
            label="原始高程数据"
          />
          <el-table-column
            v-if="formInline.Type == 'cj'"
            prop="ori_north"
            label="原始北向数据"
          />

          <el-table-column
            v-if="formInline.Type == 'qx'"
            prop="hstat"
            label="横向"
          />
          <el-table-column
            v-if="formInline.Type == 'qx'"
            prop="vstat"
            label="顺向"
          />
          <el-table-column
            v-if="formInline.Type == 'qx'"
            prop="ori_hstat"
            label="原始横向数据"
          />
          <el-table-column
            v-if="formInline.Type == 'qx'"
            prop="ori_vstat"
            label="原始顺向数据"
          />

          <el-table-column prop="createTime" label="报警时间" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCJAlarmStats } from "@/api/cj";
import { getQXAlarmStats } from "@/api/qx";
import XLSX from "xlsx";

export default {
  props: {
    background: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      alarmQueryStats: {
        count: 1,
        result: []
      },
      isclickedTabButton: true,
      StatsQueryForm: {
        date1: "",
        time1: "",
        date2: "",
        time2: ""
      },
      formInline: {
        keyWords: "",
        Type: "cj"
      },
      statFormRules: {
        date1: [{ required: true, message: "请选择日期", trigger: "change" }],
        date2: [{ required: true, message: "请选择日期", trigger: "change" }],
        time1: [{ required: true, message: "请选择时间", trigger: "change" }],
        time2: [{ required: true, message: "请选择时间", trigger: "change" }]
      },
      pageQuery: {
        isAlarm: true,
        p: 1
      },
      logList: []
    };
  },
  computed: {
    total() {
      return this.alarmStats.count;
    },
    filename() {
      return "历史报警记录";
    },
    alarmStatsList() {
      return this.alarmStats.result;
    }
  },
  mounted() {
    setTimeout(() => {
      this.listLoading = false;
    }, 0.1 * 1000);
  },
  methods: {
    handleCurrentChange() {
      this.listLoading = true;
      getCJAlarmStats(this.pageQuery).then(Response => {
        this.logList = Response.results;
        console.log("this.alarmStats:", this.logList);
      });
      this.listLoading = false;
    },
    handleTabClick() {
      this.isclickedTabButton = !this.isclickedTabButton;
      // this.listLoading = !this.listLoading;
    },
    handleDownload() {
      console.log("handleDownload");
      const table = document.getElementById("table");
      const worksheet = XLSX.utils.table_to_sheet(table);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");
      XLSX.writeFile(workbook, this.filename + ".xlsx");
    },
    onSubmit() {
      this.listLoading = true;
      console.log("this.formInline.Type", this.formInline.Type);
      if (this.formInline.Type === "cj") {
        getCJAlarmStats(this.pageQuery).then(response => {
          this.alarmQueryStats.count = response.count;
          this.logList = response.results;
          console.log("response:", response);
          console.log("this.logList:", this.logList);
        });
      } else {
        getQXAlarmStats(this.pageQuery).then(response => {
          // console.log("this.formInline.Type == qx ", this.formInline.Type)
          // console.log("this.pageQuery", this.pageQuery)
          this.alarmQueryStats.count = response.count;
          this.logList = response.results;
          console.log("response:", response);
          console.log("this.logList:", this.logList);
        });
      }
      this.downloadLoading = false;
    }
  }
};
</script>

<style scoped>
.components-container {
  position: relative;
  height: 100vh;
}
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
