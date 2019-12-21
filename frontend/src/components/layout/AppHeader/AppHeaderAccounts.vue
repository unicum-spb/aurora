<template>
  <div class="">
    <v-icon>face</v-icon>

    <v-menu
      transition="scale-transition"
      origin="right top"
      bottom
      left
      content-class="accounts-menu"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          small
          text
          class="ml-1"
          v-on="on"
        >
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="{ text, icon, route } in group"
          :key="icon"
          :to="route"
        >
          <v-list-item-title>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
            <span>{{ $t(text) }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class AppHeaderAccountsMenu extends Vue {
  group: Array<any> = [
    {
      text: 'titles.accounts',
      icon: 'account_box',
      route: {
        name: 'Account/all',
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
