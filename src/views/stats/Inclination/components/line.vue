<template>
  <div class="chart-container">
    <chart height="95%" width="100%" />
  </div>
</template>

<script>
import Chart from "./LineMarker"

export default {
  name: "LineChart",
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  /* height: calc(50vh + 1px); */
  height: 50vh;
}
</style>

