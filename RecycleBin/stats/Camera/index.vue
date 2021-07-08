<template>
  <div style="width: 100%">
    <!-- {{ msg }} -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {
      msg: "Views/Device/Camera"
    };
  }
};
</script>

<style lang="scss" scoped></style>
