import request from "@/utils/request";
import axios from "axios";

export function getCameraList0() {
  console.log("/v1/camera/show_cam");
  return request({
    url: "/v1/camera/show_cam",
    method: "get"
  });
}

export function addCamera(data) {
  return request({
    url: "/api/camera",
    method: "post",
    data
  });
}

export function updateCamera(id, data) {
  return request({
    url: `/api/camera/${id}`,
    method: "put",
    data
  });
}

export function deleteCamera(id) {
  return request({
    url: `/api/camera/${id}`,
    method: "delete"
  });
}

export function getCameraAccessToken(data) {
  // data stand for appKey&appSecret
  return request({
    url: `https://open.ys7.com/api/lapp/token/get`,
    method: "post",
    data
  });
}

export function UpdateTokenNTime(CamQuery) {
  // const CamQuery = {
  //   appKey: "15f2c1a32d2045c08a0b2833de82b34b",
  //   appSecret: "c7234c3fcec12a5889dfe5901ff1718f"
  // };
  var Token = "";
  var Time = "";
  axios.$http
    .post(
      `https://open.ys7.com/api/lapp/token/get?appKey=${CamQuery.appKey}&appSecret=${CamQuery.appSecret}`
    )
    .then(response => {
      console.log(response);
      if (response.data.code === "200") {
        console.log("发送请求成功");
        Token = response.data.data.accessToken;
        Time = response.data.data.expireTime;
        console.log("expireTime=");
        console.log(this.expireTime);
        console.log("accessToke=");
        console.log(this.accessToke);
        console.log("获取accessToken数据成功");
      }
    })
    .catch(err => {
      console.log(err);
      console.log("获取accessToken数据失败");
    });
  return {
    accessToken: Token,
    expireTime: Time
  };
}

export function getCameraList1() {
  console.log("/v1/camera/");
  var results = {};
  axios.$http
    .get(`/v1/camera/`)
    .then(response => {
      console.log(response);
      results = response.results;
    })
    .catch(err => {
      console.log(err);
    });
  return {
    data: results
  };
}

export function getCameraList() {
  console.log("/v1/camera/");
  return request({
    url: "/v1/camera/",
    method: "get"
  });
}

export function getAddrList() {
  console.log("/cam/addr_list/");
  return request({
    url: "/cam/addr_list/",
    method: "get"
  });
}

// export function getliveAddress0(params) {
//   return post("https://open.ys7.com/api/lapp/live/address/limited", params);
// }

export function getliveAddress(Params) {
  var Token = "";
  var Time = "";
  axios.$http
    .post(
      `https://open.ys7.com/api/lapp/live/address/limited?accessToken=${Params.accessToken}&deviceSerial=${Params.deviceSerial}&channelNo=1&expireTime=300`
    )
    .then(response => {
      // 返回数据
      // {
      //   "data": {
      //       "deviceSerial": "440912222",
      //       "channelNo": 1,
      //       "deviceName":"萤小石",
      //       "liveAddress": "http://open.ys7.com/openlive/temp.m3u8?t=8Yh6jnVwyq6-RU33oaX3nEogqryuNBU2P1Qqce-dT6V-TsLRWj-7kPVukT8lIlvm",
      //       "hdAddress": "http://open.ys7.com/openlive/temp.hd.m3u8?t=8Yh6jnVwyq6-RU33oaX3nEogqryuNBU2P1Qqce-dT6V-TsLRWj-7kPVukT8lIlvm",
      //       "rtmp": null,
      //       "rtmpHd": null,
      //       "status": 1,
      //       "exception": 0,
      //       "beginTime": 1484038680939,
      //       "endTime": 1484038980939
      //   },
      //   "code": "200",
      //   "msg": "操作成功!"
      // }
      console.log(response);
      if (response.data.status === 1) {
        console.log("device is online");
      }
    })
    .catch(err => {
      console.log(err);
      console.log("获取数据失败");
    });
  return {
    deviceName: Token,
    expireTime: Time
  };
}
