<template>
  <div class="app-notification">
    <v-slide-y-transition
      tag="ul"
      group
      class="notification-list _top _right"
    >
      <App-Notification-Item
        v-for="( item, index ) in queue.top.right"
        :key="item.id"
        v-bind="{ item, index }"
        @close="close(index, item.positionX, item.positionY)"
      />
    </v-slide-y-transition>

    <v-slide-y-reverse-transition
      tag="ul"
      group
      class="notification-list _bottom _right"
    >
      <App-Notification-Item
        v-for="( item, index ) in queue.bottom.right"
        :key="item.id"
        v-bind="{ item, index }"
        @close="close(index, item.positionX, item.positionY)"
      />
    </v-slide-y-reverse-transition>

    <v-slide-y-transition
      tag="ul"
      group
      class="notification-list _top _center"
    >
      <App-Notification-Item
        v-for="( item, index ) in queue.top.center"
        :key="item.id"
        v-bind="{ item, index }"
        @close="close(index, item.positionX, item.positionY)"
      />
    </v-slide-y-transition>

    <v-slide-y-reverse-transition
      tag="ul"
      group
      class="notification-list _bottom _center"
    >
      <App-Notification-Item
        v-for="( item, index ) in queue.bottom.center"
        :key="item.id"
        v-bind="{ item, index }"
        @close="close(index, item.positionX, item.positionY)"
      />
    </v-slide-y-reverse-transition>

    <v-slide-y-transition
      tag="ul"
      group
      class="notification-list _top _left"
    >
      <App-Notification-Item
        v-for="( item, index ) in queue.top.left"
        :key="item.id"
        v-bind="{ item, index }"
        @close="close(index, item.positionX, item.positionY)"
      />
    </v-slide-y-transition>

    <v-slide-y-reverse-transition
      tag="ul"
      group
      class="notification-list _bottom _left"
    >
      <App-Notification-Item
        v-for="( item, index ) in queue.bottom.left"
        :key="item.id"
        v-bind="{ item, index }"
        @close="close(index, item.positionX, item.positionY)"
      />
    </v-slide-y-reverse-transition>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

import { Dictionary } from '@/types';
import { Notification, NotificationEvent } from '@/types/notify.d';

import AppNotificationItem from './AppNotificationItem.vue';


@Component({
  inheritAttrs: false,
  components: {
    AppNotificationItem,
  },
})
export default class AppNotification extends Vue {
  queue: Dictionary<Dictionary<Notification[]>> = {
    top: {
      left: [],
      center: [],
      right: [],
    },
    bottom: {
      left: [],
      center: [],
      right: [],
    },
  };

  created () {
    this.$bus.on('call-notification', this.notify);
  }

  notify (notification: Notification): void {
    const { positionX, positionY } = notification;
    if (positionY && positionX) {
      this.queue[positionY][positionX].push(notification);
    }
  }

  close (index: number, positionX: Notification['positionX'], positionY: Notification['positionY']) {
    if (positionY && positionX) {
      this.queue[positionY][positionX].splice(index, 1);
    }
  }
}

</script>

<style lang="scss">

.app-notification {
  position: fixed;
  z-index: 1000;
  top: 72px;
  bottom: 8px;
  left: 100px;
  right: 0;
  pointer-events: none;
}

.notification-list {
  position: absolute;
  list-style: none;
  padding: 0;

  &._top {
    top: 0;
  }
  &._bottom {
    bottom: 0;
  }
  &._left {
    left: 0;
  }
  &._right {
    right: 0;
  }
  &._center {
    left: 50%;
    .v-snack {
      transform: translateX(-50%);
    }
  }
}

</style>
