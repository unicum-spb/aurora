<template>
  <v-menu
    transition="slide-y-reverse-transition"
    :nudge-right="128"
    :nudge-bottom="36"
    content-class="accounts-menu"
    min-width="160px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        class="ml-1"
        :disabled="pending"
        :loading="pending"
        v-on="on"
      >
        <span class="pr-2">{{ accountFullName }}</span>
        <v-icon>face</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="{ text, icon, route } in group"
        :key="icon"
        :to="route"
      >
        <v-list-item-title>
          <v-icon
            size="24px"
            class="mr-2"
          >
            {{ icon }}
          </v-icon>
          <span>{{ $t(text) }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Scalars } from '@/types';


@Component({ inheritAttrs: false })
export default class AppHeaderAccountsMenu extends Vue {
  group: Array<any> = [
    {
      text: 'titles.accounts',
      icon: 'account_box',
      route: {
        name: 'Account',
      }
    },
    {
      text: 'auth.sign_out',
      icon: 'exit_to_app',
      route: {
        name: 'Auth/signOut',
      }
    },
  ]

  public get pending () {
    return this.$store.state.Account.pending.getOwnAccount;
  }

  @Call('Account/getOwnAccount')
  callGetOwnAccount!: () => Promise<Scalars['Boolean']>

  created () {
    this.getOwnAccount();
  }

  /**
   * get profile
   */
  public get accountFullName () {
    return this.$store.getters['Account/fullName'];
  }

  /**
   * getAccount
   */
  public getOwnAccount () {
    this.callGetOwnAccount();
  }
}

</script>

<style lang="scss">

.accounts-menu {
  .v-list-item {
    &__title {
      display: flex;
      .v-icon {
        margin-right: 6px;
        color: currentColor;
      }
      span {
        display: inline-block;
        margin-top: 2px;
        line-height: 24px;
      }
    }
  }
}

</style>
