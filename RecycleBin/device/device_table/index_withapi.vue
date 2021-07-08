<template>
  <div class="app-container">
    <el-table-column label="弹出框">
      <template slot-scope="scope">
        <el-button @click="testBtn(scope.row)">查看弹框</el-button>
        <!-- 这个scope.row是当前表格一行的所有数据，例如 scope.row.id就可以拿到后端传过来的id，然后把这个id传给后端，用来操作这一行（例如各种点击事件） -->
      </template>
    </el-table-column>
    <!-- 新增编辑 -->
    <el-dialog title="Edit" :visible.sync="isShowEditVisible">
      <el-form ref="dataForm" label-width="80px" :model="devform">
        <el-form-item label="序列号" prop="name">
          <el-input v-model="devform.name" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
          <el-input v-model="devform.date" />
        </el-form-item>
        <el-form-item v-model="devform.status" label="状态">
          <el-select v-model="devform.status" placeholder="关注状态">
            <el-option
              v-for="item in status"
              :key="item.statusId"
              :label="item.label"
              :value="item.statusId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <mmap />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="listLoading"
          class="title1"
          @click="updateData"
        >确定</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog title="删除" :visible.sync="deleteVisible" width="25%">
      <!-- <el-alert
        title="该设备所有数据将被删除"
        type="error"
        effect="dark"
      /> -->
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
          <el-select v-model="formInline.Type" placeholder="倾斜/沉降">
            <el-option label="沉降传感器" value="cj" />
            <el-option label="倾斜传感器" value="qx" />
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
      <!-- Device Table -->
      <el-table-column label="弹出框">
        <template slot-scope="scope">
          <el-button @click="testBtn(scope.row)">查看弹框</el-button>
          <!-- 这个scope.row是当前表格一行的所有数据，例如 scope.row.id就可以拿到后端传过来的id，然后把这个id传给后端，用来操作这一行（例如各种点击事件） -->
        </template>
      </el-table-column>
      <el-table
        v-loading="listLoading"
        :data="myDeviceList"
        border
        element-loading-text="拼命加载中"
        style="width: 100%;"
      >
        <el-table-column prop="cj_id" label="ID" width="50px" />
        <el-table-column prop="serial" label="编号" width="100" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="addr" label="地址" width="150px" />
        <el-table-column prop="Line" label="线路" width="100px" />
        <el-table-column prop="Tower" label="杆塔" width="100px" />
        <el-table-column prop="Tel" label="联系电话" width="120px" />
        <el-table-column prop="createTime" label="创建时间" width="250px" />
        <el-table-column prop="operation" label="操作 " width="250px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="jump2AddDevice"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteUpdate(scope.row)"
            >删除</el-button>
            <el-button
              size="small"
              type="info"
              @click="jump2DeviceHistory(scope.row)"
            >监测数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { getList, updateArticle } from "@/api/table";

import { updateArticle } from "@/api/article";
import { searchCJDeviceFuzzy,searchCJDeviceAll,deleteCJDevice } from "@/api/cj";
// import { creatCJDevice, deleteCJDevice, updateCJDevice } from "@/api/cjdevice";
// import { parseTime } from "@/utils/index.js";
import mmap from "@/views/device/device_table/components/addDevice";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        2: "danger"
      };
      return statusMap[status];
    }
  },
  components() {
    mmap;
  },
  data() {
    return {
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      deleteVisible: false,
      myDeviceList: [],
      formInline: {
        keyWords: "",
        Type: ""
      },
      list: {
        code: 20000,
        data: {
          total: 100,
          list: [],
          items: [
            {
              id: 1,
              timestamp: 587960855591,
              author: "Linda",
              reviewer: "Jason",
              title:
                "Zkntpocum Yhnr Hicmlwn Wqjmdpu Gulr Lvxavi Jgnhwhfb Buaj Hficyxs",
              content_short: "mock data",
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              forecast: 42.83,
              importance: 3,
              type: "JP",
              status: "draft",
              display_time: "1997-08-03 09:14:00",
              comment_disabled: true,
              pageviews: 3628,
              image_uri:
                "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
              platforms: ["a-platform"]
            },
            {
              id: 2,
              timestamp: 93070777059,
              author: "Angela",
              reviewer: "Paul",
              title:
                "Yoqfce Mydd Mocnbq Vojqxol Uiqdnin Gutcojp Wplu Hodyfdoky",
              content_short: "mock data",
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              forecast: 75.38,
              importance: 3,
              type: "JP",
              status: "draft",
              display_time: "1980-10-22 08:15:02",
              comment_disabled: true,
              pageviews: 1108,
              image_uri:
                "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
              platforms: ["a-platform"]
            },
            {
              id: 19,
              timestamp: 733928421223,
              author: "Donna",
              reviewer: "Jeffrey",
              title:
                "Cfeihj Sinrv Sefqud Fnlooqhr Rgtar Dhpnygu Frmkqt Uorteftc Qsrj",
              content_short: "mock data",
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              forecast: 78.28,
              importance: 1,
              type: "EU",
              status: "draft",
              display_time: "2014-12-27 20:42:31",
              comment_disabled: true,
              pageviews: 3652,
              image_uri:
                "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
              platforms: ["a-platform"]
            },
            {
              id: 20,
              timestamp: 1308951761632,
              author: "Michael",
              reviewer: "Jose",
              title: "Vgazyp Cmgul Hmqudokmi Hszvsa Rwvmxf Tcryhycxew",
              content_short: "mock data",
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              forecast: 50.08,
              importance: 2,
              type: "JP",
              status: "draft",
              display_time: "1975-12-27 16:13:28",
              comment_disabled: true,
              pageviews: 3764,
              image_uri:
                "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
              platforms: ["a-platform"]
            }
          ]
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
        Tel: ""
      },
      total: 0,
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
      searchName: "",
      filterTableDataEnd: []
    };
  },
  created() {
    this.fetchData();
    
  },
  methods: {
    testBtn(item) {
      console.log();
    },
    fetchData() {
      this.listLoading = true;
      this.total = this.list.data.length;
      this.tableList = this.list.data.items;
      this.listLoading = false;
      searchCJDeviceAll().then(response => {
          console.log(response);
          this.myDeviceList = response

     
    })
      // console.log("myDeviceList", this.myDeviceList);
    },
    addDevice() {
      this.jump2AddDevice()
    },
    onSubmit() {
      // console.log("submit", this.formInline);
      console.log("submit",this.formInline.keyWords);
      console.log("submit",this.formInline.Type);
      if (this.formInline.Type === "cj") {
        searchCJDeviceFuzzy(this.formInline.keyWords).then(response => {
          console.log(response);
          this.myDeviceList = response

      // const re = {
      //   data: response.data,
      //   code: 200,
      //   msg: "返回非空可展示列表"
      // };
      // if (response.status === 200) {
      //   if (response.data.length !== 0) {
      //     console.log(re);
      //     return re;
      //   } else {
      //     re.msg = "查询成功，但结果为空"
      //     re.code = 400
      //     console.log(re);
      //   }
      // } else {
      //   re.msg = "查询失败"
      //   re.code = 500
      //   console.log(re);
      // }
    })
        
      }
    },
    jump2AddDevice() {
      this.$router.push("/map/import_map")
      console.log("this.$router", this.$router);
    },
    jump2DeviceHistory() {
      this.$router.push("/stats/Carousel")
      console.log("this.$router", this.$router);
    },
    doFilter() {
      if (this.searchName === "") {
        this.fetchData();
        // this.$message.warning('查询条件不能为空！')
        return;
      }
      console.log(this.searchName);
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];
      this.tableList.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.searchName) >= 0) {
            this.filterTableDataEnd.push(value);
            console.log(this.filterTableDataEnd);
          }
        }
      });
      // 页面数据改变重新统计数据数量和当前页
      this.page = 1;
      this.total = this.filterTableDataEnd.length;
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd);
    },
    clickfun(e) {
      console.log(e.target.innerText);
    },
    handleUpdate(row) {
      this.isShowEditVisible = true;
      this.devform = Object.assign({}, row);
      console.log(row);
    },
    deleteUpdate(row) {
      console.log("deleteUpdate", row.serial);
      this.deleteVisible = true;
      this.devform = Object.assign({}, row);
      // console.log(row)
      this.$message({
        message: "该设备所有数据将被删除",
        type: "warning"
      });
    },
    submitDelete() {
      const tempData = Object.assign({}, this.devform);
      console.log(tempData);
      console.log(this.tableList);

      deleteCJDevice(tempData).then(response => {
          console.log(response);
          location.reload();
        
      }
      )

      for (const v of this.tableList) {
        if (v.serial === this.devform.serial) {
          const index = this.tableList.indexOf(v);
          this.tableList.splice(index, 1);
          this.fetchData();
          console.log(this.tableList);
          break;
        }
      }
      this.deleteVisible = false;
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      console.log(row);
      row.status = status;
    },
    updateData() {
      const tempData = Object.assign({}, this.devform);
      console.log(tempData);
      updateArticle(tempData).then(() => {
        for (const v of this.tableList) {
          if (v.serial === this.devform.serial) {
            const index = this.tableList.indexOf(v);
            this.tableList.splice(index, 1, this.devform);
            break;
          }
        }
        this.isShowEditVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
      });
    },
    handleSizeChange(val) {
      this.page = val;
      console.log(this.page);
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(this.page);
      this.fetchData();
    },
    currentChangePage(list) {
      let from = (this.page - 1) * this.pageSize;
      const to = this.page * this.pageSize;
      this.tableList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableList.push(list[from]);
        }
      }
    }
  }
};
</script>
