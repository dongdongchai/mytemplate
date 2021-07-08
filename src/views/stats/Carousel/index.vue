<template>
  <div class="app-container">
    <!-- <el-tabs v-loading="listLoading" class="type" @tab-click="handleTabClick">
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
    </el-tabs> -->
    <!-- <span v-show="isclickedTabButton">请先选择设备</span>
    <el-divider /> -->
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
        <el-button  style="margin:0 0 20px 20px;"  @click="stop">暂停</el-button>
         <el-button  style="margin:0 0 20px 20px;"  @click="next">继续</el-button>
      <!-- <el-form-item label="选择设备">
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
      </el-form-item> -->
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
      <line1 />
      <!-- <chart height="95%" width="100%" /> -->
    </div>
    <el-table-row>
           <el-input v-model="filename"  placeholder="请输入文件名" style="margin:0 0 20px 20px;width:300px;" prefix-icon="el-icon-document" ></el-input>
        <!-- <el-input v-model="filename" :placeholder="文件名" style="margin:0 0 20px 20px;width:300px;" prefix-icon="el-icon-document" /> -->
      <el-button  style="margin:0 0 20px 20px;" type="info" plain icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>
      <el-button type="success" icon="el-icon-check" circle  @click="handleTabClick1" ></el-button>
     <el-button type="danger" icon="el-icon-delete" circle  @click="handleTabClick2" ></el-button>
    </el-table-row>
    <div class="statsTable">
      <el-table
        id="table"
      
        :data="CJStatList"
        border
        fit
        highlight-current-row
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >

        <!-- <el-table-column width="200px" align="center" sortable prop="date" label="创建时间">
          <template slot-scope="scope">
         
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column> -->

        <el-table-column width="200px" align="center" label="位置">
          <template slot-scope="scope">
            <span>{{ scope.row.location.toFixed(3) }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="温度">
          <template slot-scope="scope">
            <span>{{ scope.row.temp.toFixed(3) }}</span>
          </template>
        </el-table-column>



      </el-table>
    </div>
  </div>
</template>

<script>
import line1 from "./components/line1";

// canvas bg color #880015
import XLSX from "xlsx"
export default {
  name: "Carousel",
  components: { line1 },
  data() {
    return {
      filename:"",
     
     
     listLoading:false,
      test:new Array(10001),

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
     

    };
  },
  computed: {
    // filename() {
    //   return "raman test"
    // },
    CJStatList() {
    if(this.listLoading){

        const len = this.$store.state.test.Temp.length
        var obj = new Array(100);
        for (let i = 0; i < 100; i++) {
          obj[i] = {};
          obj[i]["location"] = this.$store.state.test.Location[2000+i]
          obj[i]["temp"] = this.$store.state.test.Temp[2000+i]
        
          //obj[i]["createTime"] = this.$store.state.test.time[i].toString().slice(0, 10) + "-" + this.$store.state.test.time[i].toString().slice(11, 19)
        }
       //console.log("tableObj", obj);
        return obj
    }else{
      return[]
    }
    
    }
  },
  mounted() {
    this.gettest();
    // setTimeout(() => {
    //   this.listLoading = false;
    // }, 1.0 * 1000);
   
    //this.fetchMonitorData();

  },
  methods: {
   gettest(){
     setInterval(() => {
            this.test.fill(0)
            this.test.fill(Math.ceil(Math.random()*5),1500,6000)
            this.$store.commit("test/setmap",this.test[3000])
            this.$store.commit("test/settempp",this.test)
             },2000)  
   },
  

    stop(){
      let l='true'
        this.$store.commit("test/setstop",l)
    },
    next(){
      let l1="false"
        this.$store.commit("test/setstop",l1)
    },
     handleTabClick1() {
     
      this.listLoading = true
    },
     handleTabClick2() {
     
      this.listLoading = false
    },
    fetchMonitorData() {
      setInterval(() => {
      this.$store.dispatch("test/initChartProto")
        },1000)
    },
 

    handleDownload() {
      console.log("handleDownload")
      const table = document.getElementById("table")
        // if (this.$store.state.stats.ve) {
        //   const len = this.$store.state.stats.ve.length
        //   var obj = new Array(len);
        //   for (let i = 0; i < len; i++) {
        //     obj[i] = {};
        //     obj[i]["east"] = this.$store.state.stats.ve[i]
        //     obj[i]["north"] = this.$store.state.stats.hn[i]
        //     obj[i]["height"] = this.$store.state.stats.h[i]
        //     obj[i]["createDate"] = this.$store.state.stats.time[i].toString().slice(0, 19)
        //     obj[i]["createTime"] = this.$store.state.stats.time[i].toString().slice(0, 19)
        //   }
        //   console.log("tableObj", obj);
        //   return obj
        // }
      
      const worksheet = XLSX.utils.table_to_sheet(table)
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");
      XLSX.writeFile(workbook,this.filename+ ".xlsx");
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
  font-size: 12px;
}
.el-cascader {
  position: relative;
  font-size: 12px;
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
.line{
  margin-left: 10px
}
</style>
