<template>
  <div class="demo-image">
    <center>
      <el-collapse v-model="activeNames">
        <!-- <el-collapse-item title="图片显示1" name="1">
          <div class="demo-image__lazy">
            <el-image
              v-for="(item, index) in images_info.url"
              :key="index"
              :index="index"
              :src="require('@/assets/images/' + item)"
              lazy
            />
          </div>
        </el-collapse-item> -->
        <!-- 。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
        <el-collapse-item title="图片显示2" name="2">
          <div class="demo-image__carousel">
            <el-carousel :interval="4000" type="card" height="400px">
              <el-carousel-item v-for="(item, index) in images_info.url" :key="item" :index="index">
                <img id="dd" :src="require('@/assets/images/' + item)" alt="smile">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-collapse-item>
        <!-- 。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
        <!-- <el-collapse-item title="图片显示3" name="3">
          <div class="demo-image__carousel">
            <el-carousel :interval="4000" type="card" height="400px">
              <el-carousel-item
                v-for="(item, index) in images_info.url"
                :key="item"
                :index="index"
              >
                <img id="dd" :src="require(item)" alt="smile">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-collapse-item> -->
      </el-collapse>
    </center>
  </div>
</template>

<script>
export default {
  name: "HistoryImg",
  components: {},
  data() {
    return {
      activeNames: ["1"],
      urls: [],
      images_info: {
        date: "2020-10-10",
        serial: 20,
        url: [
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
    }
  }
};
</script>

<style>
.demo-image__lazy {
  width: 50%;
}

.demo-image__carousel {
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
