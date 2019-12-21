<template>
  <v-menu
    transition="scale-transition"
    origin="right top"
    nudge-top="-100px"
    bottom
    left
    content-class="apps-menu"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        small
        v-on="on"
      >
        <v-icon>apps</v-icon>
      </v-btn>
    </template>

    <v-card width="290px">
      <v-card-title class="d-block text-xs-center">
        Приложения
      </v-card-title>
      <v-item-group>
        <v-container
          grid-list-md
          class="pt-2"
        >
          <v-layout
            wrap
            class="apps-menu__list"
          >
            <v-flex
              v-for="{ text, icon, route } in apps"
              :key="text"
              xs4
              class="pa-0"
            >
              <v-btn
                :to="route"
                text
                block
                class="apps-menu__button"
              >
                <v-icon size="30px">
                  {{ icon }}
                </v-icon>
                <span>{{ text }}</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-item-group>
    </v-card>
  </v-menu>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class AppHeaderAppsMenu extends Vue {
  menu: boolean = false;

  apps: Array<any> = [
    {
      text: 'Виджеты',
      icon: 'widgets',
      route: {
        name: '',
        params: '',
      }
    },
  ];
}

</script>
