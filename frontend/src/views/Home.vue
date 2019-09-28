<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" @change="onSubmit($event.target.files)" />
      </label>
    </div>
  </div>

  </div>
</template>

<script>

import axios from 'axios';

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },

  methods: {
    async onSubmit (files) {
      console.log(files);
      
      const formData = new FormData();
      for (const file of files) {
        formData.append('file', file);
      }

      try {
        const result = await axios.post( 'http://localhost:3000/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log(result);
        this.$refs.file.value = '';
      } catch (error) {
        console.error(error.response.data);
      }
    }
  }
};

</script>
