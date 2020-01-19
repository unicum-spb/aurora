import { Vue, Component } from 'vue-property-decorator';

import { NotificationEvent } from '@/types/notify';
import { callNotify } from '@/plugins/notify';

@Component({})
export class NotifyMixin extends Vue {
  /**
   * $notify
   */
  public $notify (payload: NotificationEvent) {
    return callNotify(payload);
  }
}
