<template>
  <v-layout
    justify-center
    align-center
  />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class SignOut extends Vue {
  created () {
    this.$store.dispatch('Auth/signOut');
    window.location.href = '/auth/login';
  }
}

</script>
