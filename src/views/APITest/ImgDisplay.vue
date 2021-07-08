<template>
  <div class="demo-image">
    <center>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="图片显示1" name="1">
          <div class="demo-image__lazy">
            <el-image
              v-for="(item, index) in images_info.url"
              :key="index"
              :index="index"
              :src="require('@/assets/images/' + item)"
              lazy
            />
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片显示2" name="2">
          <div class="demo-image__carousel">
            <el-carousel :interval="4000" type="card" height="400px">
              <el-carousel-item v-for="(item, index) in images_info.url" :key="item" :index="index">
                <!-- <h3>{{ item }}</h3> -->
                <img id="dd" :src="require('@/assets/images/' + item)" alt="smile">
                <!-- <img  :src="require('../assets/images/' + item)" alt="" > -->
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-collapse-item>
      </el-collapse>

    </center>
  </div>
</template>

<script>
export default {
  name: "Images",
  components: {},
  data() {
    // const v = ["1", "2", "3", "4", "5"];
    return {
      activeNames: ["1"],
      //   v: [1, 2, 3, 4, 5],
      //   v: new Array("1", "2", "3", "4", "5"),
      urls: [],
      images_info: {
        date: "2020-10-10",
        serial: 20,
        //   url: require("@/assets/images/image"+this.v[0]+".jpg"),
        //   url: [
        //       "../assets/images/image"+v[0]+".jpg",
        //       require("../assets/images/image"+v[1]+".jpg"),
        //       require("../assets/images/image3.jpg"),
        //       require("../assets/images/image4.jpg"),
        //       require("../assets/images/image5.jpg"),
        //       require("../assets/images/image6.jpg"),
        //   ],
        url: [
          "image1.jpg",
          "image2.jpg",
          "image3.jpg",
          "image4.jpg",
          "image5.jpg"
        ]
      }
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      console.log(this.images_info);
      //   console.log(this.v);
      //   const urls=[];
      //   let index_temp=0;
      //   const that=this;
      //   this.images_info.forEach((item,index)=>{
      //       urls.push({
      //           url:item.url,
      //           url:item.url.split(","),
      //       })
      //   })
      //   this.urls = urls;
    }
  }
};
</script>

<style>
.demo-image__lazy {
  width: 50%;
}

.demo-image__carousel{
    width: 70%;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
