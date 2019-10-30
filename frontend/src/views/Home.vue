<template>
  <div class="home">
    <div class="large-12 medium-12 small-12 cell">
      <form ref="form">
        <label>File
          <input
            id="file"
            ref="file"
            type="file"
            @change="onSubmit($event.target)"
          >
        </label>
        <button type="submit">
          submit
        </button>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { Vue, Component } from 'vue-property-decorator';

import axios from 'axios';

import worker from '../Worker';

@Component({ inheritAttrs: false })
export default class Home extends Vue {
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
      const result = await axios.post(
        'http://localhost:3000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log(result);
      const form = this.$refs.form as HTMLFormElement;
      form.reset();
    } catch (error) {
      console.error(error.response);
    }
  }
}

</script>


<style lang="scss">

.home {}

</style>
