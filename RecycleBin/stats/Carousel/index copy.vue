<template>
  <div class="app-container">
    <split-pane
      :min-percent="20"
      :default-percent="30"
      split="horizontal"
    >
      <template slot="paneL">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" label="ID" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.cjs_id }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="Date">
            <template slot-scope="scope">
              <span>{{
                scope.row.createTime | parseTime("{y}-{m}-{d} {h}:{i}")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="Author">
            <template slot-scope="scope">
              <span>{{ scope.row.addr }}</span>
            </template>
          </el-table-column>

          <el-table-column width="100px" label="Importance">
            <template slot-scope="scope">
              <svg-icon
                v-for="n in +scope.row.importance"
                :key="n"
                icon-class="star"
                class="meta-item__icon"
              />
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="Status" width="110">
            <template slot-scope="{ row }">
              <el-tag :type="row.status | statusFilter">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column min-width="300px" label="Title">
            <template slot-scope="{ row }">
              <router-link :to="'/example/edit/' + row.id" class="link-type">
                <span>{{ row.title }}</span>
              </router-link>
            </template>
          </el-table-column>

          <el-table-column align="center" label="Actions" width="120">
            <template slot-scope="scope">
              <router-link :to="'/example/edit/' + scope.row.id">
                <el-button type="primary" size="small" icon="el-icon-edit">
                  Edit
                </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="paneR">
        <split-pane split="vertical">
          <template slot="paneL">
            <div class="app-container2">
              <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="查询区域">
                  <el-select v-model="form.region" placeholder="请选择查询区域">
                    <el-option
                      v-for="(item, index, key) in uniqueAddrList"
                      :key="key"
                      :label="item.addr"
                      :value="item.addr"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="查询起始时间">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.date1"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%;"
                    />
                  </el-col>
                  <el-col :span="2" class="line">-</el-col>
                  <el-col :span="11">
                    <el-time-picker
                      v-model="form.clock1"
                      type="fixed-time"
                      placeholder="选择时刻"
                      style="width: 100%;"
                    />
                  </el-col>
                </el-form-item>
                <el-form-item label="查询终止时间">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.date2"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%;"
                    />
                  </el-col>
                  <el-col :span="2" class="line">-</el-col>
                  <el-col :span="11">
                    <el-time-picker
                      v-model="form.clock2"
                      type="fixed-time"
                      placeholder="选择时刻"
                      style="width: 100%;"
                    />
                  </el-col>
                </el-form-item>
                <el-form-item label="监测数据类型">
                  <el-radio-group v-model="form.alarmType">
                    <el-radio label="沉降" value="Carousel" />
                    <el-radio label="倾斜" value="Inclination" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">提交</el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
          <template slot="paneR">
            C
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import { CJStat_DeviceSerial } from "@/api/stats";
// import { creatCJDevice } from "@/api/device";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import splitPane from "vue-splitpane";

export default {
  components: { Pagination, splitPane },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      addrList: [
        {
          serial: "RTO",
          sensortype: 3,
          addr: "000001111122222",
          createTime: "2020-09-28T21:23:35.641082+08:00",
          modifyTime: "2020-09-28T21:23:35.641082+08:00",
          day_since_created: 10,
          type_selected: 30
        },
        {
          serial: "PQO",
          sensortype: 1,
          addr: "000001111122222",
          createTime: "2020-09-28T21:23:35.717094+08:00",
          modifyTime: "2020-09-28T21:23:35.717094+08:00",
          day_since_created: 10,
          type_selected: 10
        },
        {
          serial: "HYS",
          sensortype: 2,
          addr: "000001111122222",
          createTime: "2020-09-28T21:23:35.815090+08:00",
          modifyTime: "2020-09-28T21:23:35.815090+08:00",
          day_since_created: 10,
          type_selected: 20
        }
      ],
      uniqueAddrList: [],
      form: {
        region: "",
        date1: "",
        clock1: "",
        date2: "",
        clock2: "",
        alarmType: ""
      },

      listLoading: true,
      listQuery: {
        generater_id: 35,
        page: 1,
        limit: 10
      },
      CJStatList: null
    };
  },
  created() {
    this.getList();
    this.getData();
  },
  mounted() {
    this.uniqueAddrList = this.unique(this.addrList);
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        // this.list = response.results
        console.log(response);
        this.total = 40;
        console.log(this.total);

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    onSubmit() {
      this.$message("submit!");
      console.log(this.form);
      // this.$message(this.form);
    },
    getData() {
      CJStat_DeviceSerial(this.listQuery);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.addr) && res.set(arr.addr, 1));
    }
  }
};
</script>

<style scoped>
.components-container {
  position: relative;
  height: 100vh;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.line {
  text-align: center;
}
</style>
