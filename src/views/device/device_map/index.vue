<template>
  <div class="app-container">
    <h3>设备树</h3>
    <DeviceTree />
    <h3>30min内在线传感器数量</h3>
    <div><panel-group /></div>
    <device-map />
  </div>
</template>

<script>
// import PanelGroup from "./components/PanelGroup"
import PanelGroup from "@/components/OnlineDevicePanel";
import DeviceMap from "@/components/DeviceMap";
import DeviceTree from "./components/DeviceTree";
import { getcjDeviceList } from "@/api/cj";

export default {
  components: {
    PanelGroup,
    DeviceMap,
    DeviceTree
  },
  data() {
    return {
      CamList: [],
      QXList: [],
      CJList: [],
      // filterText: "",
      treeData: [
        {
          label: "图像监控设备",
          serial: 464654,
          children: this.CamList
        },
        {
          label: "沉降监控设备",
          serial: 464654,
          children: this.CJList
        },
        {
          label: "倾斜监控设备",
          serial: 464654,
          children: this.QXList
        }
      ],
      defaultProps: {
        children: "children",
        // name: "name",
        // serial: "serial",
        label: "label"
      }
    };
  },
  watch: {
  },
  mounted() {
    this.getTreeList();
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getTreeList() {
      // const list = getcjDeviceList();
      // console.log(list);

      // this.CamList = list.CJdeviceList;
      // this.QXList = list.QXList;

      // this.CJList = list.CJList;

      getcjDeviceList().then(Response => {
        this.CJList = Response.CJdeviceList;
      })
    }
  }
}
</script>
