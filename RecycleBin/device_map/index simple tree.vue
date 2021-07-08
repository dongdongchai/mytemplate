<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script>
import { getAllDeviceList } from "@/api/device";

export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: this.CamList
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: this.CJList
            },
            {
              label: "二级 2-2",
              children: this.QXList
            }
          ]
        }
      ],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  created() {
    this.getTreeList();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getTreeList() {
      const list = getAllDeviceList();
      console.log(list.CamList);
      this.CamList = list.CamList;
      this.QXList = list.QXList;
      this.CJList = list.CJList;
      console.log(this.data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
