<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="devlist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index + 15 }}</template>
      </el-table-column>
      <el-table-column label="序列号">
        <template slot-scope="scope">{{ scope.row.serial }}</template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sensortype | typeFilter">{{
            scope.row.sensortype
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="设备地址" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.addr }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建天数"
        width="90"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.day_since_created }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)"
            >Edit</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope)"
            >Delete</el-button
          >
          <el-button type="text" @click="open">点击打开 Message Box</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from "axios";
import { getList } from "@/api/table";

export default {
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: "success",
    //     draft: "gray",
    //     deleted: "danger",
    //   };
    //   return statusMap[status];
    // },
    typeFilter(sensortype) {
      const typeMap = {
        1: "success",
        2: "gray",
        3: "danger"
      };
      return typeMap[sensortype];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      devlist: null,
      listLoading: true
    };
  },
  created() {
    // this.fetchData();
    this.getdevlist();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.data.items;
        this.listLoading = false;
        console.log(this.list);
      });
      console.log(this.list);
    },
    getdevlist() {
      console.log("getdevlist start");
      this.$http
        .get("/drf/sensor/")
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.devlist = res.data.results;
            console.log("devlist:");
            console.log(this.devlist);
            this.listLoading = false;
            this.$message.success("获取device list数据成功");
          } else {
            this.$message.warning("后端数据为空");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取用户数据失败");
        });
    },
    handleEdit(scope) {
      console.log("use rest api update this line");
    },
    handleDelete({ $index, row }) {
      this.$confirm("Confirm to remove the role?", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      });
      console
        .log("use rest api delete this line")
        .then(async () => {
          await deleteRole(row.key);
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "Delete succed!"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    open() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
