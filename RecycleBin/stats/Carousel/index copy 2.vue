<template>
  <div class="app-container">
    <!-- <el-cascader :props="props" /> -->
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

      <el-table-column width="180px" align="center" label="createTime">
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
</template>

<script>
// const id = 0;
// import { CJStat_DeviceSerial } from "@/api/stats";
// import { creatCJDevice } from "@/api/device";
// import { fetchList } from "@/api/article";
// import { CJStatList } from "@/api/cjdevice"
// import { parseTime } from "@/utils"
import { getTestCJStatsList } from "@/api/stats";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  components: { Pagination },
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
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          console.log("node", node);
          const { level } = node;
          console.log(level)
        }
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        generater_id: 35,
        page: 1,
        limit: 10
      },
      CJStatList: null
    }
  },
  created() {
    this.getList();
    this.getData();
  },
  methods: {
    getList() {
      // this.listLoading = true;
      // getTestCJStatsList().then(response => {
      //   this.total = 40;

      //   // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
      // });
      console.log("getList");
    },
    getData() {
      console.log("returnValue", getTestCJStatsList());
      this.CJStatList = getTestCJStatsList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
