<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="沉降设备" name="沉降设备">
        <el-form class="GeoFilter" :inline="true" :model="formInline">
          <el-form-item label="设备地点">
            <el-select v-model="QueryForm.addr" placeholder="请选择查询区域">
              <el-option
                v-for="(item, index, key) in QueryForm.addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Tower">
            <el-select v-model="QueryForm.addr" placeholder="请选择查询杆塔">
              <el-option
                v-for="(item, index, key) in QueryForm.addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Line">
            <el-select v-model="QueryForm.addr" placeholder="请选择查询线路">
              <el-option
                v-for="(item, index, key) in QueryForm.addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="倾斜设备" name="倾斜设备">
        <el-form class="GeoFilter" :inline="true" :model="formInline">
          <el-form-item label="设备地点">
            <el-select v-model="QueryForm.addr" placeholder="请选择查询区域">
              <el-option
                v-for="(item, index, key) in QueryForm.addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Tower">
            <el-select v-model="QueryForm.addr" placeholder="请选择查询杆塔">
              <el-option
                v-for="(item, index, key) in QueryForm.addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Line">
            <el-select v-model="QueryForm.addr" placeholder="请选择查询线路">
              <el-option
                v-for="(item, index, key) in QueryForm.addr"
                :key="key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-divider />
    <el-form class="Type">
      <el-form-item label="监测数据类型">
        <el-radio-group v-model="QueryForm.type" class="TypeRadio">
          <el-radio label="沉降" />
          <el-radio label="倾斜" />
        </el-radio-group>
        <el-button
          class="searchButton"
          icon="el-icon-search"
          style="left-margin=5px;"
          circle
        />
      </el-form-item>
    </el-form>
    <el-divider />
    <el-form ref="form" class="StatForm" :model="QueryForm">
      <el-form-item class="DateSpan" label="时间区间">
        <el-col :span="10">
          <el-date-picker
            v-model="QueryForm.date1"
            type="date"
            placeholder="选择开始日期"
            style="width: 100%;"
          />
        </el-col>
        <el-col class="line" :span="1" style="text-align: center;">--</el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="QueryForm.date2"
            type="date"
            placeholder="选择结束日期"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item class="DeviceChoice" label="选择设备">
        <el-cascader :props="props" />
        <el-button
          class="searchButton"
          icon="el-icon-search"
          style="left-margin=5px;"
          circle
        />
      </el-form-item>
      <el-form-item label="选择设备2">
        <el-select v-model="QueryForm.addr" placeholder="请选择设备">
          <el-option
            v-for="(item, index, key) in QueryForm.addr"
            :key="key"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- <el-divider /> -->
    <div class="lineChart">
      <three-line-chart />
    </div>
    <el-divider />
    <div class="statsTable">
      <el-table
        v-loading="listLoading"
        :data="CJStatList"
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

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
// const id = 0;
import { getTestCJStatsList } from "@/api/stats";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import ThreeLineChart from "./components/line";

export default {
  components: { Pagination, ThreeLineChart },
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
      GeoForm: {
        addrlist: [],
        towerlist: [],
        linelist: [],
        type: ""
      },
      list: null,
      total: 0,
      id: 0,
      listLoading: true,
      QueryForm: {
        date1: "",
        date2: ""
      },
      listQuery: {
        generater_id: 35,
        page: 1,
        limit: 10
      },
      CJStatList: null,
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
  created() {
    this.getData();
  },
  mounted() {
    this.uniqueAddrList = this.unique(this.addrList);
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
      console.log(this.form);
      // this.$message(this.form);
    },
    getData() {
      console.log("returnValue", getTestCJStatsList());
      this.CJStatList = getTestCJStatsList();
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
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
.dateChoice {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.el-cascader {
  position: relative;
  font-size: 14px;
  /* width:200px; */
  display: inline-block;
  vertical-align: middle;
}
.searchButton {
  margin-left: 2vh;
}
</style>
