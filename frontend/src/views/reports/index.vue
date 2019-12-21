<template>
  <v-card>
    <v-toolbar
      color="light-blue"
      light
    >
      <v-toolbar-title>
        My files
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>view-module</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-btn
          fab
          bottom
          left
          absolute
          @click="dialog = !dialog"
        >
          <v-icon>add</v-icon>
        </v-btn>

        <v-spacer />

        <v-fade-transition>
          <v-btn
            v-if="selected.length"
            :to="compareDestination"
            class="mx-2"
          >
            <v-icon
              left
              class="mr-3"
            >
              compare_arrows
            </v-icon>
            Сравнить
          </v-btn>
        </v-fade-transition>
      </template>
    </v-toolbar>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="reports"
      :single-select="singleSelect"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="id"
      show-select
      class="elevation-1"
      @click:row="onReportRowClick"
    >
      <template v-slot:top>
        <!-- <v-switch
            v-model="singleSelect"
            label="Single select"
            class="pa-3"
          /> -->
        <div class="py-5" />
      </template>

      <template v-slot:item.data-table-select="{ isSelected, select }">
        <v-simple-checkbox
          color="green"
          :value="isSelected"
          @input="select($event)"
        />
      </template>

      <template v-slot:item.meta.date="{ item }">
        {{ item.meta.date | toLongLocaleDate }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          @click.stop="deleteReport(item.id)"
        >
          <v-icon
            small
          >
            delete
          </v-icon>
        </v-btn>
      </template>

      <template v-slot:no-data>
        NO DATA HERE!
      </template>

      <template v-slot:no-results>
        NO RESULTS HERE!
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <Upload-Report-Form />
    </v-dialog>
  </v-card>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Location } from 'vue-router/types';
import { QuantumReportModel } from '@/types/api';
import { DataIteratorHeader } from '@/types/vuetify';

import UploadReportForm from '@/components/forms/UploadReport.vue';


@Component({
  inheritAttrs: false,
  components: {
    UploadReportForm
  }
})
export default class ReportsList extends Vue {
  public dialog: boolean = false;
  public singleSelect: boolean = false;
  public selected: Array<QuantumReportModel> = [];
  public headers: ReadonlyArray<DataIteratorHeader> = [
    {
      text: 'Дата в отчёте',
      align: 'start',
      sortable: false,
      value: 'meta.date',
    },
    {
      text: 'name',
      value: 'meta.name',
      sortable: false,
    },
    {
      text: 'height',
      align: 'start',
      value: 'meta.physique.height',
      sortable: false,
    },
    {
      text: 'weight',
      align: 'start',
      value: 'meta.physique.weight',
      sortable: false,
    },
    {
      text: 'actions',
      align: 'center',
      value: 'actions',
      width: '100px',
      sortable: false,
    },
  ];

  public get compareDestination (): Location {
    return {
      name: 'Reports/compare',
      query: {
        reportIds: this.selected.map(report => report.id)
      }
    };
  }

  public get reports () {
    return this.$store.state.Reports.list;
  }

  public get loading () {
    return this.$store.state.Reports.pending.get;
  }

  @Call('Reports/getAll')
  public callReportsGetAll!: () => Promise<boolean>;

  public onReportRowClick (report: QuantumReportModel) {
    return this.$router.push({
      name: 'Reports/id',
      params: { reportId: report.id },
    });
  }

  /**
   * deleteReport
   */
  public deleteReport (report: QuantumReportModel) {
    console.log('deleteReport - ', report);
  }

  async created () {
    await this.callReportsGetAll();
  }
}

</script>

<style lang="scss">

.v-data-table__expanded__content > td {
  padding-left: 56px !important;

  tbody tr:last-child td {
    border-bottom: none !important;
  }
}

</style>
