/* eslint-disable consistent-return */
/* eslint-disable vue/return-in-computed-property */
import Vue from 'vue';

import Environment from '../services/environment';


export const global = Vue.extend({
  computed: {
    isProduction (): boolean {
      return Environment.isProduction;
    },
    $console (): Console | void {
      if (!this.isProduction) {
        return window.console;
      }
    },
    isDark (): boolean {
      return this.$store.getters['Interface/isDark'];
    },
  },
});
