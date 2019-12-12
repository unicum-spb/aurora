<template>
  <v-content fill-height>
    <v-container
      fill-height
      pa-0
    >
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'HomeWrapper',
})
export default class HomeWrapper extends Vue {
}

</script>
