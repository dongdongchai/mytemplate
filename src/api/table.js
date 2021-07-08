import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/vue-admin-template/table/list",
    method: "get",
    params
  });
}

export function getUserinfoList() {
  return request({
    url: "localhost:800/api/userinfo/",
    method: "get"
  });
}
