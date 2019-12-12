<template>
  <v-fade-transition
    mode="out-in"
    appear
  >
    <router-view />
  </v-fade-transition>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class AuthRoot extends Vue {
}

</script>
