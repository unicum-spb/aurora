<template>
  <v-card>
    <v-card-title>
      {{ reportIds }}
    </v-card-title>

    <v-card-text>
      <Line-Chart
        width="100%"
        height="480px"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { Call, Get } from 'vuex-pathify';

import { QuantumReportModel } from '@/types/api';

import LineChart from '@/components/charts/simple.vue';


@Component({
  inheritAttrs: false,
  components: {
    LineChart,
  }
})
export default class ReportsCompare extends Vue {
  @Prop({ type: Array, required: true })
  public reportIds!: ReadonlyArray<QuantumReportModel['id']>;

  @Get('Reports/compared') compared!: ReadonlyArray<Omit<QuantumReportModel, 'userId'>>;

  @Call('Reports/getByListOfId')
  public callReportsGetByListOfId!: (reportIds: ReadonlyArray<QuantumReportModel['id']>) => Promise<boolean>;

  async created () {
    await this.callReportsGetByListOfId(this.reportIds);

    // this.expanded = [...this.selected.reports];
  }
}

</script>
