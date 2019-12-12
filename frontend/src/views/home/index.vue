<template>
  <div class="home">
    <div class="large-12 medium-12 small-12 cell">
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >
        <v-file-input
          ref="file"
          :label="$t('reports.upload')"
          multiple
          small-chips
          show-size
          counter
          prepend-icon="mdi-paperclip"
          outlined
        />

        <v-btn type="submit">
          submit
        </v-btn>

        <v-btn
          type="button"
          @click="hello"
        >
          hello
        </v-btn>
      </v-form>
    </div>
    {{ reports }}
  </div>
</template>


<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { Vue, Component, Ref } from 'vue-property-decorator';
import { Call, Get } from 'vuex-pathify';

import Axios from 'axios';

import { TypeQuantumReportModel } from '@/types';

interface IVFileInput {
  lazyValue: Array<File>
}

@Component({ inheritAttrs: false })
export default class Home extends Vue {
  @Ref('file') $file!: IVFileInput;

  @Get('Reports/parsed') reports!: Array<TypeQuantumReportModel>;

  @Call('Reports/create') callReportsCreate!: (payload: FormData) => Promise<boolean>;

  async onSubmit () {
    const { lazyValue } = this.$file;

    console.dir(this.$file);

    const formData = new FormData();

    for (const key in lazyValue) {
      if (key) {
        const file = lazyValue[Number(key)];
        formData.append('file', file);
      }
    }

    try {
      const result = await this.callReportsCreate(formData);
      console.log(result);
      const form = this.$refs.form as HTMLFormElement;
      form.reset();
    } catch (error) {
      console.error(error.response);
    }
  }

  async hello () {
    try {
      const result = await Axios.get(
        `${process.env.VUE_APP_API_URL}/ping`,
      );
      console.log(result);
    } catch (error) {
      console.error(error.response);
    }
  }
}

</script>


<style lang="scss">

.home {}

</style>
