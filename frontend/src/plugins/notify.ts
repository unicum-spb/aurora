/* eslint-disable no-param-reassign */
import { NotificationEvent, Notification } from '@/types/notify.d';
import EventService from '@/services/event';

const $notify = {
  install (Vue: any) {
    Vue.prototype.$notify = ({
      type,
      message,
      translate,
      positionX = 'right',
      positionY = 'bottom',
      timeout = 3000
    }: Notification) => new Promise(resolve => {
      EventService.emit('call-notification', {
        id: `snack-${Math.round(Math.random() * 1000000)}`,
        type,
        positionX,
        positionY,
        message,
        translate,
        timeout,
        resolve
      } as NotificationEvent);
    });
  },
};

export default $notify;
