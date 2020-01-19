<template>
  <v-card class="report-list">
    <v-toolbar
      color="light-blue"
      light
    >
      <v-toolbar-title>{{ $t('reports.list.title') }}</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>view-module</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-fab-transition>
          <v-btn
            v-if="!dialog"
            fab
            bottom
            left
            absolute
            @click="dialog = !dialog"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>

        <v-spacer />

        <v-fade-transition
          tag="div"
          group
        >
          <v-btn
            key="compare"
            :to="compareDestination"
            :disabled="selected.length < 2"
            class="mx-2"
          >
            <v-icon
              left
              class="mr-3"
            >
              compare_arrows
            </v-icon>
            compare
          </v-btn>

          <v-btn
            key="delete"
            :disabled="!selected.length"
            @click.stop="deleteReports(selectedReportIds)"
          >
            <v-icon
              small
            >
              delete
            </v-icon>
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
    >
      <template v-slot:top>
        <div class="py-4" />
      </template>

      <template v-slot:header.data-table-select="{ on, props }">
        <v-simple-checkbox
          :disabled="!reports.length"
          v-bind="props"
          v-on="on"
        />
      </template>

      <template v-slot:item.meta.date="{ item }">
        {{ item.meta.date | toLongLocaleDate }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          @click.stop="viewReport(item)"
        >
          <v-icon>
            remove_red_eye
          </v-icon>
        </v-btn>
      </template>

      <template v-slot:no-data>
        {{ $t('reports.list.no_data') }}
      </template>

      <template v-slot:no-results>
        {{ $t('reports.list.no_results') }}
      </template>
    </v-data-table>

    <Dialog
      v-if="dialog"
      max-width="420px"
      :persistent="pending"
      @close="dialog = false"
    >
      <Report-Upload-Form @close="dialog = false" />
    </Dialog>
  </v-card>
</template>

<script lang="ts">

import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Location, Route } from 'vue-router/types';
import { Scalars } from '@/types';
import { QuantumReportModel } from '@/types/api';
import { DataIteratorHeader } from '@/types/vuetify';

import { AlertMixin, NotifyMixin } from '@/mixins';

import ReportUploadForm from '@/components/forms/ReportUpload.vue';
import Dialog from '@/components/dialogs/base.vue';

@Component({
  inheritAttrs: false,
  components: {
    ReportUploadForm,
    Dialog,
  }
})
export default class ReportsList extends Mixins(AlertMixin, NotifyMixin) {
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

  public get selectedReportIds () {
    return this.selected
      .map(report => report.id)
      .reverse();
  }

  public get compareDestination (): Location {
    return {
      name: 'Reports/compare',
      query: {
        reportIds: this.selectedReportIds
      }
    };
  }

  public get reports () {
    return this.$store.state.Reports.list;
  }

  public get loading () {
    return this.$store.state.Reports.pending.get;
  }

  public get pending () {
    return this.$store.state.Reports.pending.create;
  }

  @Watch('$route', { deep: true, immediate: true })
  public onRouteChange ({ name, query }: Route) {
    if (query['add-dialog']) {
      this.dialog = true;
      this.$router.replace({ name: 'Reports/list' });
    }
  }

  @Call('Reports/getAll')
  public callReportsGetAll!: () => Promise<boolean>;

  @Call('Reports/removeByListOfId')
  public callReportsRemoveByListOfId!: (reportIds: ReadonlyArray<QuantumReportModel['id']>) => Promise<boolean>;

  /**
   * deleteReports
   * call remove selected reports
   */
  public async deleteReports (selectedIds: Array<QuantumReportModel['id']>) {
    try {
      await this.$alert({
        title: 'dialogs.removing.title',
        message: 'dialogs.removing.message',
      });
    } catch (cancel) {
      this.clearSelectedReports();
      return;
    }

    try {
      await this.callReportsRemoveByListOfId(selectedIds);

      this.$notify({
        type: 'info',
        translate: 'report.removed',
        timeout: 5000
      });

      this.clearSelectedReports();
      this.callReportsGetAll();
    } catch (error) {
      this.$notify({
        type: 'error',
        translate: 'failed',
        timeout: 5000
      });
    }
  }

  /**
   * viewReport
   */
  public viewReport ({ id: reportId }: QuantumReportModel) {
    this.$router.push({
      name: 'Reports/id',
      params: { reportId },
    });
  }

  /**
   * clearSelectedReports
   */
  public clearSelectedReports () {
    this.selected.splice(0, this.selected.length);
  }

  async created () {
    await this.callReportsGetAll();
  }
}

</script>

<style lang="scss">

.report-list {
  .v-data-table__expanded__content > td {
    padding-left: 56px !important;

    tbody tr:last-child td {
      border-bottom: none !important;
    }
  }

  .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
  }
}


</style>
