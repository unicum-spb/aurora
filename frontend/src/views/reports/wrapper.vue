<template>
  <v-content fill-height>
    <v-container>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class ReportWrapper extends Vue {
}

</script>
