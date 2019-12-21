<template>
  <v-menu
    transition="scale-transition"
    origin="right top"
    top
    left
    content-class="notifications-menu"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        fab
        small
        text
        v-on="on"
      >
        <v-icon>apps</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="{ icon, text } in items"
        :key="icon"
      >
        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">

import { Location } from 'vue-router/types';

import { Vue, Component } from 'vue-property-decorator';

export type IconItem = {
  icon: string;
  text: string;
}

export type SidebarListItem = {
  icon?: string;
  iconComponent?: string;
  text: string;
  route: Location;
  active?: boolean;
}

@Component({ inheritAttrs: false })
export default class AppHeaderNotifications extends Vue {
  notifications: number = 0;

  items: IconItem[] = [
    { icon: 'trending_up', text: 'titles.audiences' },
    { icon: 'subscriptions', text: 'titles.collections' },
    { icon: 'history', text: 'titles.profiles' },
  ];
}

</script>
