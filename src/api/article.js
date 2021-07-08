import get from "@/utils/my-axios-wrapper";

export function fetchList(query) {
  return get("/drf/sensor/");
}

export function updateArticle(query) {
  return get("/drf/sensor/");
}

export function getCJAddrList() {
  return get("/lalalalal");
}
