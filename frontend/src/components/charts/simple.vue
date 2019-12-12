<template>
  <div class="simple-chart" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

import ECharts from 'echarts';

@Component({ inheritAttrs: false })
export default class SimpleChart extends Vue {

}

</script>

<style lang="scss">

.simple-chart {}

</style>
