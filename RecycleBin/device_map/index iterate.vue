<template>
  <el-tree ref="tree" :props="props" :load="loadNode" :node-key="label" lazy />
</template>
<script>
import { getAllDeviceList } from "@/api/device";

export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      CamList: [],
      QXList: [],
      CJList: [],
      node_had: [], // 触发 tree 的 :load=loadNode 重复触发  动态更新tree
      resolve_had: [] // 触发 tree 的 :load=loadNode 重复触发  动态更新tree
    };
  },
  created() {
    this.getTreeList();
  },
  methods: {
    // loadNode0(node, resolve) {
    //   // console.log(node, resolve)
    //   // 一级节点处理
    //   if (node.level === 0) {
    //     this.node_had = node; // 这里是关键！在data里面定义一个变量，将node.level == 0的node存起来
    //     this.resolve_had = resolve; // 同上，把node.level == 0的resolve也存起来
    //     this.requestTree(resolve);
    //   }
    //   // 其余节点处理
    //   if (node.level >= 1) {
    //     // 注意！把resolve传到你自己的异步中去
    //     this.getIndex(node, resolve);
    //   }
    // },
    // // 触发 tree 的 :load=loadNode 重复触发  动态更新tree
    // requestNewData() {
    //   this.node_had.childNodes = []; // 把存起来的node的子节点清空，不然会界面会出现重复树！
    //   this.loadNode(this.node_had, this.resolve_had); // 再次执行懒加载的方法
    // },
    // // 点击 按钮时 显示tree 时候 触发 函数 重新渲染tree
    // _handleCopy(_tableSelection) {
    //   this.requestNewData(this.node_had, this.resolve_had);
    // },
    refreshNodeBy(label) {
      const node = this.$refs.asyncTree.getNode(label); // 通过节点id找到对应树节点对象
      node.loaded = false;
      node.expand(); // 主动调用展开节点方法，重新查询该节点下的所有子节点
    },
    loadNode(node, resolve) {
      console.log(node);
      console.log(node.childNodes);
      if (node.level === 0) {
        return resolve([
          {
            name: "图像监控设备"
          },
          {
            name: "沉降监控设备"
            // leaf: true
          },
          {
            name: "倾斜监控设备"
            // leaf: true
          }
        ]);
      }
      if (node.childNodes.data === "沉降监控设备") return resolve([]);
      setTimeout(() => {
        const data = this.CamList;
        resolve(data);
      }, 5);
      if (node.childNodes.data === "图像监控设备") return resolve([]);
      setTimeout(() => {
        const data = this.QXList;
        resolve(data);
      }, 5);
    },
    getTreeList() {
      const list = getAllDeviceList();
      this.CamList = list.CamList;
      this.QXList = list.QXList;
      this.CJList = list.CJList;
      // eslint-disable-next-line no-sequences
      // [this.CamList, this.QXList, this.CJList] = list
      console.log(this.CamList);
      console.log("data2");
      console.log(this.data2);
    }
  }
};
</script>
