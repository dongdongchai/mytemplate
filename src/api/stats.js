// import request from "@/utils/request";
import { get } from "@/utils/my-axios-wrapper";
// import { Message } from "element-ui";

export function fetchList_useMyView(query) {
  return get("device/stats/cj/", query);
}

export function fetchStatsList(query) {
  return get("drf/stats/", query);
}

export function CJStat_DeviceSerial(query) {
  return get("device/cjstats/", query);
}

export function getTestCJStatsList0() {
  const arr = [
    {
      cjs_id: 3834,
      serial: 35,
      north: 9.934195359749078,
      east: 4.087105751823027,
      height: 3.8688852544304897,
      createTime: "2020-10-30T16:07:41.563135+08:00"
    },
    {
      cjs_id: 3912,
      serial: 35,
      north: 3.1798786692011802,
      east: 3.955283674607352,
      height: 9.374254627105291,
      createTime: "2020-10-30T16:07:55.118849+08:00"
    },
    {
      cjs_id: 3931,
      serial: 35,
      north: 9.39636150701685,
      east: 2.7836406941795913,
      height: 7.101220254380216,
      createTime: "2020-10-30T16:07:58.415205+08:00"
    },
    {
      cjs_id: 3938,
      serial: 35,
      north: 5.6397358529179575,
      east: 3.7078220125610937,
      height: 3.5010618341034485,
      createTime: "2020-10-30T16:07:59.502680+08:00"
    },
    {
      cjs_id: 4030,
      serial: 35,
      north: 1.6264673626635784,
      east: 6.046463668262261,
      height: 1.822802098714903,
      createTime: "2020-10-30T16:08:15.564595+08:00"
    },
    {
      cjs_id: 4045,
      serial: 35,
      north: 9.088822382984667,
      east: 4.152424328407913,
      height: 5.123478242548338,
      createTime: "2020-10-30T16:08:18.082966+08:00"
    },
    {
      cjs_id: 4050,
      serial: 35,
      north: 0.7232757057994177,
      east: 4.791171728880822,
      height: 0.2864861842801114,
      createTime: "2020-10-30T16:08:18.848415+08:00"
    },
    {
      cjs_id: 4057,
      serial: 35,
      north: 5.478107750341445,
      east: 8.897610997551872,
      height: 0.09878532199989798,
      createTime: "2020-10-30T16:08:20.147402+08:00"
    },
    {
      cjs_id: 4113,
      serial: 35,
      north: 6.973889998509187,
      east: 9.755184415076457,
      height: 4.36377833310409,
      createTime: "2020-10-30T16:08:29.880063+08:00"
    },
    {
      cjs_id: 4114,
      serial: 35,
      north: 4.889909615316379,
      east: 1.2713926412890975,
      height: 7.272696378806311,
      createTime: "2020-10-30T16:08:30.031326+08:00"
    },
    {
      cjs_id: 4142,
      serial: 35,
      north: 1.4930699164344885,
      east: 9.987354866261594,
      height: 0.17851939850483056,
      createTime: "2020-10-30T16:08:36.163763+08:00"
    },
    {
      cjs_id: 4227,
      serial: 35,
      north: 0.5986878390766825,
      east: 5.352597105835745,
      height: 4.547430541498755,
      createTime: "2020-10-30T16:08:50.712931+08:00"
    },
    {
      cjs_id: 4284,
      serial: 35,
      north: 2.846435469108876,
      east: 3.282317437976472,
      height: 5.279584465593032,
      createTime: "2020-10-30T16:09:00.682844+08:00"
    }
  ];

  setTimeout(() => {
    console.log("delay 300 ms");
    return arr;
  }, 300);
}

export function getChartStatsImmediately() {
  const arr = {
    serial: 35,
    north: [2.2, 1.82, 1.91, 1.34, 1.5, 1.2, 1.1, 1.25, 1.45, 1.22, 1.65, 1.2],
    east: [1.2, 1.1, 10.25, 1.45, 1.22, 1.65, 1.22, 2.2, 1.82, 1.91, 1.34, 1.0],
    height: [2.2, 1.82, 1.25, 1.45, 1.22, 1.91, 1.34, 1.5, 1.2, 1.1, 1.65, 1.2],
    createTime: [
      "13:00",
      "13:05",
      "13:10",
      "13:15",
      "13:20",
      "13:25",
      "13:30",
      "13:35",
      "13:40",
      "13:45",
      "13:50",
      "13:55"
    ]
  };
  return arr;
}

export function getTestCJStatsList(query) {
  console.log(query);
  // setTimeout(() => {
  //   console.log("delay ${query} ms");
  //   // console.log(getChartStatsImmediately().then(()=>{
  //   //   console.log("enterThen");
  //   // }));
  //   return post("device/stats/cj/", query);
  // }, query);
  console.log(get("http://192.168.1.122:8100/api/drf/cjStats/", { params: { createTime: "2020-11-04T10:42:03.979545+08:00", serial: 2 }}));
  return get("http://192.168.1.122:8100/api/drf/cjStats/", { params: { createTime: "2020-11-04T10:42:03.979545+08:00", serial: 2 }});
}
