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
  async created () {
    const success = await this.$store.dispatch('Auth/signOut');
    if (success) window.location.href = '/auth/login';
  }
}

</script>
