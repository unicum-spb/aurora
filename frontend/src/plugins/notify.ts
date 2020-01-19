/* eslint-disable no-param-reassign */
import EventService from '@/services/event';

import { NotificationEvent, Notification } from '@/types/notify.d';

export function callNotify ({
  type,
  message,
  translate,
  positionX = 'right',
  positionY = 'bottom',
  timeout = 3000
}: NotificationEvent) {
  return new Promise((resolve, reject) => {
    EventService.emit('call-notification', {
      id: `snack-${Math.round(Math.random() * 1000000)}`,
      type,
      positionX,
      positionY,
      message,
      translate,
      timeout,
      resolve
    } as Notification);
  });
}
