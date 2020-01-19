import { Vue, Component } from 'vue-property-decorator';

import { AlertEvent } from '@/types/alert';
import { callAlert } from '@/plugins/alert';

@Component({})
export class AlertMixin extends Vue {
  /**
   * $alert
   */
  public $alert (payload: AlertEvent) {
    return callAlert(payload);
  }
}
