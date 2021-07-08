/* eslint-disable no-undef */
import axios from "axios";
// import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

const myAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

myAxios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  response => {
    const res = response.data;
    // if (res.indexOf("code") !== -1) {
    //   if (res.code !== 200) {
    //     Message({
    //       message: res.msg || "Code Error",
    //       type: "error",
    //       duration: 2 * 1000
    //     });
    //   }
    // } else { console.log("there is no code"); }
    // console.log("res.indexOf(code)", res.indexOf("code"))
    if (res.code) {
      if (res.code !== 200) {
        ELEMENT.Message({
          message: res.msg || "Code Error",
          type: "error",
          duration: 2 * 1000
        });
      }
    }
    if (response.status !== 200) {
      ELEMENT.Message({
        message: res.message || "Http NetStat Error",
        type: "error",
        duration: 3 * 1000
      });
    } else {
      return res;
    }
  },
  error => {
    console.log("err:" + error); // for debug
    ELEMENT.Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export function get(urls, params) {
  return myAxios.get(urls, { params });
}

export function post(urls, params) {
  return myAxios.post(urls, { params });
}

export default myAxios;

