/* eslint-disable no-param-reassign */
import EventService from '@/services/event';

import { AlertEvent, Alert } from '@/types/alert.d';

export function callAlert ({
  title,
  message,
  cancellable = false,
  destination,
}: AlertEvent) {
  return new Promise((resolve, reject) => {
    EventService.emit('call-alert', {
      id: `alert-${Math.round(Math.random() * 1000000)}`,
      title,
      message,
      cancellable,
      destination,
      resolve,
      reject,
    } as Alert);
  });
}
