// indexmport request from "@/utils/request";
import { get } from "@/utils/request";

// ******************************************************************
//
//         2020.10.28 新增需求api，前端文档、后端文档待补充
//
// ******************************************************************

export function getAllDeviceList() {
  const datalist = {
    CamList: [],
    QXList: [],
    CJList: [
      {
        serial: 464654,
        name: "asdasdas",
        leaf: true
      },
      {
        serial: 464654,
        name: "asdasdas",
        leaf: true
      }
    ]
  };
  return datalist;
}

// ******************************************************************
//
//             2020.10.25 基础需求api，前端文档、后端文档已完成
//
// ******************************************************************

// query为空即可
export function getDevicePositionList(query) {
  return get("drf/sensor/", query);
}

// query为空即可
export function creatCJDevice(query) {
  const list = {
    count: 8,
    next: null,
    previous: null,
    results: [
      {
        cj_id: 1,
        name: "5463",
        serial: 453645,
        addr: "4564563",
        Line: "456546",
        Tower: "4564",
        Tel: "15265982596",
        Lng: 453453,
        Lat: 4536456345
      },
      {
        cj_id: 8,
        name: "一个汉字三个字符九十一二三四五六七八九十一二",
        serial: 5345,
        addr: "4564563",
        Line: "456546",
        Tower: "4564",
        Tel: "15265982596",
        Lng: 453453,
        Lat: 4536456345
      }
    ]
  };
  return list;
}

// 添加沉降传感器
export function creatDevice(query) {
  return query;
}

// 删除沉降传感器
export function deleteDevice(query) {
  return query;
}

// 更新沉降传感器信息
export function updateDevice(query) {
  return query;
}

// 查询沉降传感器信息

export function searchDevice(query) {
  return query;
}
// 精确查询沉降传感器信息

export function searchDeviceAccurate(query) {
  return query;
}

// 模糊查询沉降传感器信息
export function searchDeviceFuzzy0(query) {
  return query;
}

export function searchDeviceFuzzy(query) {
  console.log("query = ", query);
  const list = {
    data: [
      {
        cj_id: 4,
        name: "一个汉字三个字符",
        serial: 4565,
        addr: "4564563",
        Line: "456546",
        Tower: "4564",
        Tel: "15265982596",
        Lng: 453453.0,
        Lat: 4536456345.0,
        createTime: "2020-10-12T17:05:52.094228+08:00"
      }
    ],
    msg: "查询数据成功",
    code: 200
  };
  return list;
}

// 沉降传感器地址列表
export function devicePositionList(query) {
  return query;
}

// 沉降传感器在线数量
export function cjDeviceCount() {
  return 59;
}

// 所有沉降传感器近5天报警数
export function cjDeviceAlarmCount(query) {
  return query;
}
// Cobalt2 ThemeColor MainPane:#122738   BottomDeepPanel  #15232d