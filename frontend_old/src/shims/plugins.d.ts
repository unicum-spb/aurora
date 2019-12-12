import { Vue } from 'vue-property-decorator';
import { Store } from 'vuex/types';

import { RootState } from '@/types/store/index.d';
import { NotificationEvent, Notification } from '@/types/notify.d';
import { AlertEvent, Alert } from '@/types/alert.d';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: Store<RootState>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $notify: (payload: Notification) => Promise<NotificationEvent>
    $alert: (payload: AlertEvent) => Promise<Alert>
    $console: Console | void;
    isProduction: boolean;
    isDark: boolean;
    $store: Store<RootState>
  }
}
