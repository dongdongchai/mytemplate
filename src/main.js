import Vue from "vue";
import "@/styles/index.scss"; // global css
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
// import ElementUI from "element-ui";
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
//import BaiduMap from 'vue-baidu-map'
import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

// import "element-ui/lib/theme-chalk/index.css"; // 添加
// https://unpkg.com/browse/element-ui@2.14.1/lib/theme-chalk/index.css
import axios from "axios";
import echarts from "echarts";


axios.defaults.baseURL = "http://127.0.0.1:8200/api"; // 指定后端的地址，也就是django运行的地址
// axios.defaults.baseURL = "http://118.89.236.242:810/api";
Vue.prototype.$http = axios; // 添加
 Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
//  vue.use(BaiduMap,{
//    ak:'fVxkuGQkx3HGscDnV6g1oIi5n7E7SnuE'
//  })
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明

// Vue.use(ElementUI);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
