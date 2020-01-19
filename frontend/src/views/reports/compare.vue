<template>
  <Base-Card
    :back-to="{ name: 'Reports/list' }"
    :toolbar-border="true"
    :column="true"
    height="calc(100vh - 100px)"
    class="compare-card"
  >
    <template v-slot:toolbar-title>
      <v-card-title>Сравнение отчётов</v-card-title>
    </template>

    <v-layout
      style="overflow-y:auto"
    >
      <v-navigation-drawer
        value="true"
        stateless
        height="auto"
        width="400px"
        class="compare-card__sidebar"
      >
        <v-list-group
          v-for="(report, index) in selectedReport.reports"
          :key="index"
          dense
          color="indigo"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title :title="report.title">
                {{ report.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="({ title }, idx) in report.fields"
            :key="idx"
            dense
            :class="{ 'v-list-item--active': values && values.title === title }"
            @click="showReport({ title: report.title, subtitle: title })"
          >
            <v-list-item-action>
              <v-checkbox
                color="primary"
                :value="isSelectedForMapping({ title: report.title, subtitle: title })"
                @click.stop="selectForMapping({ title: report.title, subtitle: title })"
              />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :title="title"
                v-text="title"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-navigation-drawer>

      <simple-bar
        class="container d-flex flex-column"
        data-simplebar-auto-hide="false"
        style="overflow-y:auto"
      >
        <template v-if="mappedValues.length > 0">
          <Line-Chart
            v-for="map in mappedValues"
            :key="map.title"
            :title="map.title"
            :report="map"
            :zoom="zoom"
            width="100%"
            height="480px"
            @zoom="onZoomChange"
          />
        </template>

        <template v-else-if="values && values.dates.length">
          <h4 class="subtitle-1 mb-2">
            Отображена динамика во времени
          </h4>

          <Line-Chart
            width="100%"
            height="480px"
            :title="values.title"
            :report="values"
          />
        </template>

        <h4
          v-else
          class="subtitle-1"
        >
          Выберите пункт для сравнения из списка слева
        </h4>
      </simple-bar>
    </v-layout>
  </Base-Card>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { Call, Get } from 'vuex-pathify';
// @ts-ignore
import SimpleBar from 'simplebar-vue';

import { Dictionary } from 'vue-router/types/router';
import { Scalars, ComparedQuantumReportModel } from '@/types';
import { QuantumReportModel, ReportFieldModel } from '@/types/api';

import BaseCard from '@/components/layout/BaseCard.vue';
import LineChart from '@/components/charts/LineChart.vue';

interface SelectedForMapping {
  title: ReportFieldModel['title']
  subtitle: ComparedQuantumReportModel['title']
}

@Component({
  inheritAttrs: false,
  components: {
    SimpleBar,
    LineChart,
    BaseCard,
  }
})
export default class ReportsCompare extends Vue {
  @Prop({ type: Array, required: true })
  public reportIds!: ReadonlyArray<QuantumReportModel['id']>;

  public selected: SelectedForMapping = {
    title: '',
    subtitle: '',
  };

  public mapped: Array<SelectedForMapping> = [];

  public zoom: Dictionary<Scalars['Number']> = {};

  public get selectedReport (): QuantumReportModel {
    return this.$store.state.Reports.selected;
  }

  public get values () {
    const { title, subtitle } = this.selected;

    if (title.length && subtitle.length) {
      const source = this.comparedRecords(title);
      return source.find(report => report.title === subtitle);
    }

    return {
      title: '',
      dates: [],
      value: [],
      min: [],
      max: [],
    };
  }

  public get mappedValues () {
    const emptyValue = {
      title: '',
      dates: [],
      value: [],
      min: [],
      max: [],
    };

    return this.mapped.map(({ title, subtitle }) => {
      if (title.length && subtitle.length) {
        const source = this.comparedRecords(title);
        return source.find(report => report.title === subtitle) || emptyValue;
      }

      return emptyValue;
    });
  }

  @Get('Reports/compared')
  public comparedRecords!: (filtered: ReportFieldModel['title']) => Array<ComparedQuantumReportModel>;

  @Call('Reports/getByListOfId')
  public callReportsGetByListOfId!: (reportIds: ReadonlyArray<QuantumReportModel['id']>) => Promise<boolean>;

  async created () {
    await this.callReportsGetByListOfId(this.reportIds);
  }

  /**
   * showReport
   */
  public showReport ({ title, subtitle }: SelectedForMapping) {
    this.selected = {
      title,
      subtitle
    };
  }

  /**
   * selectForMapping
   */
  public selectForMapping ({ title, subtitle }: SelectedForMapping) {
    const index = this.mapped.findIndex(m => m.subtitle === subtitle);
    if (index !== -1) {
      this.mapped.splice(index, 1);
    } else {
      this.mapped.push({ title, subtitle });
    }
  }

  /**
   * selectForMapping
   */
  public isSelectedForMapping ({ title, subtitle }: SelectedForMapping) {
    const index = this.mapped.findIndex(mapper => (
      mapper.title === title && mapper.subtitle === subtitle
    ));
    return index !== -1;
  }

  /**
   * onZoomChange
   */
  public onZoomChange (value: Dictionary<Scalars['Number']>) {
    this.zoom = value;
  }
}

</script>

<style lang="scss">

.compare-card {
  &__sidebar.v-navigation-drawer {
    overflow-y: auto;
    max-height: calc( 100vh - 164px );
  }
  .v-list-item__title {
    font-size: 0.9rem;
  }
}

</style>
