<template>
  <v-progress-linear
    v-if="active"
    :indeterminate="true"
    :height="4"
    class="progress"
  />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class AppHeaderProgress extends Vue {
  active: boolean = true;

  created () {
    this.active = true;

    this.$router.beforeEach((to, from, next) => {
      this.active = true;
      next();
    });

    this.$router.afterEach(() => {
      this.active = false;
    });
  }

  mounted () {
    this.active = false;
  }
}

</script>

<style lang="scss" scoped>

.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  margin: 0;
}

</style>
