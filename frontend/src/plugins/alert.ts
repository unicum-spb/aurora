/* eslint-disable no-param-reassign */
import { AlertEvent, Alert } from '@/types/alert.d';
import EventService from '@/services/event';

const $notify = {
  install (Vue: any) {
    Vue.prototype.$alert = ({
      title,
      message,
      fullscreen = false,
      cancellable = true
    }: AlertEvent) => new Promise((resolve, reject) => {
      EventService.emit('call-alert', {
        id: `alert-${Math.round(Math.random() * 1000000)}`,
        title,
        message,
        fullscreen,
        cancellable,
        resolve,
        reject
      } as Alert);
    });
  },
};

export default $notify;
