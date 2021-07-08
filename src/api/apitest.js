import axios from "axios";
import { get, post } from "@/utils/request";

const web_url = "http://localhost:800/api";

export function getDept() {
  let arr = [];
  axios
    .get(web_url + "/addr_list", {
      params: {
        page: 1,
        limit: 10,
        id: 1
      }
    })
    .then(response => {
      arr = response;
      console.log(response);
    })
    .catch(reject => {
      console.log(reject);
    });
  return arr;
}

export function getStatList(query) {
  return get("drf/stats/", query);
}

export function postStatItem(query) {
  return post("drf/stats/", query);
}

export function fetchList(query) {
  return get("drf/stats/", query);
}
