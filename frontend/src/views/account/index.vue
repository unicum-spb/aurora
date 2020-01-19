<template>
  <Base-Card
    :back-to="{ name: 'Home' }"
    :toolbar-border="true"
    :column="true"
    height="calc(100vh - 100px)"
    class="compare-card"
  >
    <template v-slot:toolbar-title>
      <v-card-title>{{ $t('account.your') }}</v-card-title>
    </template>

    <v-layout>
      <v-navigation-drawer
        value="true"
        stateless
        height="auto"
        width="240px"
        class="compare-card__sidebar"
      >
        <v-list-item
          v-for="({ text, route }, idx) in items"
          :key="idx"
          :to="route"
          dense
        >
          <v-list-item-title
            :title="text"
            v-text="text"
          />
        </v-list-item>
      </v-navigation-drawer>

      <v-container class="d-flex flex-column">
        <Account-Edit-Form />
      </v-container>
    </v-layout>
  </Base-Card>
</template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

import BaseCard from '@/components/layout/BaseCard.vue';
import AccountEditForm from '@/components/forms/AccountEdit.vue';


@Component({
  inheritAttrs: false,
  components: {
    BaseCard,
    AccountEditForm,
  }
})
export default class Account extends Vue {
  public items: Array<any> = [
    {
      text: 'titles.accounts',
      route: {
        name: 'Account',
      }
    },
    {
      text: 'auth.sign_out',
      route: {
        name: 'Account',
      }
    },
  ]
}

</script>
