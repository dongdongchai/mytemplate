import request from "@/utils/request";
import { post } from "@/utils/request";
import { get } from "@/utils/my-axios-wrapper"
// export function login(data) {
//   console.log(data);
//   return request({
//     // url: '/vue-admin-template/user/login',
//     url: "user/login",
//     method: "post",
//     data
//   });
// }

export function getInfo0(token) {
  // console.log(token);
  return request({
    // url: '/vue-admin-template/user/info',
    url: "/user/info",
    method: "get",
    params: { token }
  });
}

export function getInfo(token) {
  return get("/user/djangoInfo/", { token: token });
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: "/user/logout",
    method: "post"
  });
}

export function login0(query) {
  return post("user/login", query);
}

export function login(query) {
  return get("user/djangoLogin/", query);
}
