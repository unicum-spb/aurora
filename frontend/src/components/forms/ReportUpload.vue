<template>
  <v-card outlined>
    <v-card-title>{{ 'add_report' }}</v-card-title>

    <v-form
      ref="form"
      v-model="isValid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <v-card-text>
        <v-select
          v-model="selectedType"
          :items="types"
          :disabled="pending"
          :label="$t('reports.type.select')"
          item-value="id"
          item-text="title"
          prepend-icon="insert_drive_file"
          filled
          flat
        />

        <v-file-input
          ref="file"
          :placeholder="$t('reports.upload')"
          :loading="pending"
          :disabled="pending || !selectedType.length"
          :accept="selected.type || '*'"
          multiple
          solo
          flat
          small-chips
          show-size
          counter
          filled
          required
          @change="onFileChange"
        />

        <v-checkbox
          v-model="closeAfterUpload"
          label="Закрыть окно после импорта"
          hide-details
          class="pt-0"
        />
      </v-card-text>

      <v-card-actions class="px-4 pb-4">
        <v-btn
          color="orange"
          block
          depressed
          type="submit"
          :loading="pending"
          :disabled="pending || files.length < 1"
        >
          {{ 'submit' }}
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { Vue, Component, Ref, PropSync, Mixins, Watch } from 'vue-property-decorator';

import { Call, Get } from 'vuex-pathify';

import { Scalars, Dictionary } from '@/types';
import { QuantumReportModel } from '@/types/api';

import { AlertMixin, NotifyMixin } from '@/mixins';

interface IVFileInput {
  lazyValue: Array<File>
}


@Component({ inheritAttrs: false })
export default class UploadReportForm extends Mixins(AlertMixin, NotifyMixin) {
  @Ref('file') $file!: IVFileInput
  @Ref('form') $form!: HTMLFormElement

  public showForm: Scalars['Boolean'] = false
  public isValid: Scalars['Boolean'] = false
  public closeAfterUpload: Scalars['Boolean'] = false
  public files: Array<File> = []
  public selectedType: Scalars['String'] = ''

  public get types () {
    return this.$store.state.Reports.types;
  }

  public get pending () {
    return this.$store.state.Reports.pending.create;
  }

  public get selected () {
    return this.types.find(type => type.id === this.selectedType) || {};
  }

  @Call('Reports/create')
  public callReportsCreate!: (payload: FormData) => Promise<boolean>

  @Call('Reports/getTypes')
  public callReportsGetTypes!: () => Promise<boolean>

  async onSubmit () {
    const { files, closeAfterUpload } = this;

    const isValid = this.$form.validate();

    if (isValid) {
      const formData = new FormData();

      for (const key in files) {
        if (key) {
          const file = files[Number(key)];
          formData.append('file', file);
        }
      }

      try {
        const result = await this.callReportsCreate(formData);
        this.$notify({
          type: 'success',
          translate: 'reports.import.success'
        });

        if (!closeAfterUpload) {
          this.$form.reset();
          this.selectedType = '';
          return;
        }
        this.$emit('close');
      } catch (error) {
        console.error(error.response);
      }
    }
  }

  /**
   * onFileChange
   */
  onFileChange (files: Array<File>) {
    this.files = files;
  }

  async created () {
    try {
      await this.callReportsGetTypes();
    } catch (error) {
      this.$emit('close');
      this.$alert({
        title: 'error',
        message: 'missed',
      });
    }
  }
}

</script>
