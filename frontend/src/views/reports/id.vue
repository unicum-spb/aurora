<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="selected.reports"
      :expanded.sync="expanded"
      :search="search"
      item-key="title"
      show-expand
      disable-pagination
      hide-default-header
      hide-default-footer
      class="elevation-1 pt-4"
    >
      <template v-slot:header>
        <thead>
          <tr>
            <th width="56px" />
            <th class="px-0">
              <v-toolbar flat>
                <v-row no-gutters>
                  <v-col>
                    <v-toolbar-title>{{ selected.meta.date | toLongLocaleDate }}</v-toolbar-title>
                  </v-col>

                  <v-spacer />

                  <v-col>
                    <v-text-field
                      v-model="search"
                      prepend-inner-icon="search"
                      :label="'search'"
                      single-line
                      hide-details
                      solo
                      flat
                      outlined
                      clearable
                      dense
                    />
                  </v-col>
                </v-row>
              </v-toolbar>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:expanded-item="{ item, headers }">
        <td :colspan="headers.length">
          <v-data-table
            :headers="innerHeaders"
            :items="item.fields"
            hide-default-footer
          >
            <template v-slot:item.relative="{ item }">
              <img
                :src="`/img/${ item.relative }.gif`"
                alt="item.relative"
              >
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

import { Call } from 'vuex-pathify';
import { DataIteratorHeader } from '@/types/vuetify';
import { QuantumReportModel, ReportResultModel } from '@/types/api';


@Component({ inheritAttrs: false })
export default class ReportDetail extends Vue {
  @Prop({ type: String, required: true })
  public reportId!: string;

  public search: string = '';
  public expanded: Array<ReportResultModel> = [];
  public singleExpand: boolean = false;

  public headers: ReadonlyArray<DataIteratorHeader> = [
    { text: '', value: 'data-table-expand' },
    {
      text: 'report_title',
      align: 'start',
      value: 'title',
    },
  ];

  public innerHeaders: ReadonlyArray<DataIteratorHeader> = [
    {
      text: 'title',
      align: 'start',
      value: 'title',
      sortable: false,
      width: '60%'
    },
    {
      text: 'min',
      align: 'start',
      value: 'min',
      sortable: false,
    },
    {
      text: 'value',
      align: 'start',
      value: 'value',
      sortable: false,
    },
    {
      text: 'max',
      align: 'start',
      value: 'max',
      sortable: false,
    },
    {
      text: 'relative',
      align: 'center',
      value: 'relative',
      sortable: false,
    },
  ]

  public get selected () {
    return this.$store.state.Reports.selected;
  }

  @Call('Reports/getById')
  public callReportsGetById!: (reportId: QuantumReportModel['id']) => Promise<boolean>

  async created () {
    await this.callReportsGetById(this.reportId);

    // this.expanded = [...this.selected.reports];
  }
}

</script>

<style lang="scss">

.v-data-table__expanded__content {
  box-shadow: none !important;

  > td {
    padding-left: 56px !important;

    tbody tr:last-child td {
      border-bottom: none !important;
    }
  }
}

</style>
