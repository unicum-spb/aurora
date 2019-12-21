<template>
  <v-card>
    <v-form
      ref="form"
      v-model="isValid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <v-card-text>
        <v-file-input
          ref="file"
          :label="$t('reports.upload')"
          :loading="pending"
          multiple
          small-chips
          show-size
          counter
          outlined
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          type="submit"
          :loading="pending"
        >
          {{ 'submit' }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { Vue, Component, Ref } from 'vue-property-decorator';

import { Call, Get } from 'vuex-pathify';

import { QuantumReportModel } from '@/types/api';

interface IVFileInput {
  lazyValue: Array<File>
}


@Component({ inheritAttrs: false })
export default class UploadReportForm extends Vue {
  @Ref('file') $file!: IVFileInput;
  @Ref('form') $form!: HTMLFormElement;

  isValid: boolean = false;

  get pending () {
    return this.$store.state.Reports.pending.create;
  }

  get files () {
    if (this.$file) {
      return this.$file.lazyValue;
    }
    return [];
  }

  @Call('Reports/create') callReportsCreate!: (payload: FormData) => Promise<boolean>;

  private async onSubmit () {
    const { files } = this;

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
        this.$form.reset();
      } catch (error) {
        console.error(error.response);
      }
    }
  }
}

</script>

<style lang="scss">

.upload-report {}

</style>
