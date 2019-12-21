<template>
  <div class="home">
    {{ reports }}
  </div>
</template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

import { QuantumReportModel } from '@/types/api';

@Component({ inheritAttrs: false })
export default class Home extends Vue {
  @Get('Reports/parsed') reports!: Array<QuantumReportModel>;
}

</script>
