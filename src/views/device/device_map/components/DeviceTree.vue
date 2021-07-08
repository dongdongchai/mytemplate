<template>
  <div>
    <el-tabs v-loading="listLoading">
      <el-tree
        ref="camtree"
        :props="props"
        :load="loadNode0"
        :node-key="label"
        lazy
      />
      <el-tree
        ref="cjtree"
        :props="props"
        :load="loadNode1"
        :node-key="label"
        lazy
      />
      <el-tree
        ref="qxtree"
        :props="props"
        :load="loadNode2"
        :node-key="label"
        lazy
      />
    </el-tabs>
  </div>
</template>
<script>
// import { getAllDeviceList } from "@/api/device";
import { getcjDeviceList } from "@/api/cj";
import { getqxDeviceList } from "@/api/qx";

export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      // listLoading: true,
      CamList: [],
      QXList: [],
      CJList: []
    };
  },
  computed: {
    _CamList() {
      return this.CamList;
    },
    _QXList() {
      return this.QXList
    },
    _CJList() {
      return this.CJList
    }
  },
  mounted() {
    this.getTreeList();
  },
  methods: {
    loadNode0(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "图像监控设备" }]);
      }
      if (node.level === 1) return resolve(this._CamList);
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "沉降监控设备" }]);
      }
      if (node.level === 1) return resolve(this._CJList);
    },
    loadNode2(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "倾斜监控设备" }]);
      }
      if (node.level === 1) return resolve(this._QXList);
    },
    getTreeList() {
      getcjDeviceList().then(Response => {
        this.CJList = Response.CJdeviceList;
        console.log("getcjDeviceList:", this.CJList)
      });
      getqxDeviceList().then(Response => {
        this.QXList = Response.QXdeviceList;
        console.log("getqxDeviceList:", this.QXList)
      });
    }
  }
};
</script>
