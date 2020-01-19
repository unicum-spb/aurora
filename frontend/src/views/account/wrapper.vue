<template>
  <v-content fill-height>
    <v-container pb-0>
      <v-row>
        <v-spacer />
        <v-col cols="8">
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Scalars } from '@/types';

@Component({ inheritAttrs: false })
export default class AccountsWrapper extends Vue {
  @Call('Account/getOwnAccount')
  public callGetOwnAccount!: () => Promise<Scalars['Boolean']>

  created () {
    this.getOwnAccount();
  }

  /**
   * getAccount
   */
  public getOwnAccount () {
    this.callGetOwnAccount();
  }
}

</script>
