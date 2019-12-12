<template>
  <div class="home">
    <div class="large-12 medium-12 small-12 cell">
      <form ref="form">
        <label>File
          <input
            id="file"
            ref="file"
            type="file"
            multiple
          >
        </label>
        <button type="submit">
          submit
        </button>
        <button
          type="button"
          @click="hello"
        >
          hello
        </button>
      </form>
    </div>
    {{ reports }}
  </div>
</template>


<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { Vue, Component } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import Axios from 'axios';
import { TypeQuantumReportModel } from '@/types';


@Component({ inheritAttrs: false })
export default class Home extends Vue {
  get reports () {
    return this.$store.state.Reports.reports;
  }

  @Call('Reports/create') callReportsCreate!: (payload: FormData) => Promise<TypeQuantumReportModel>;

  async onSubmit ({ files }: HTMLInputElement) {
    console.log({ files });

    const formData = new FormData();

    for (const key in files) {
      if (key) {
        const file = files[Number(key)];
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
