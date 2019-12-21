/* eslint-disable import/prefer-default-export */
/* eslint-disable no-lonely-if */
import { Route } from 'vue-router/types';

import { StorageService } from '@/services/storage';

export function checkAuth ({ fullPath, matched }: Route, from: Route, next: Function): void {
  if (matched.some(record => record.meta.allowAnonymous)) {
    // этот путь разрешает отсутствие авторизации,
    next();
  } else {
    // проверяем есть ли токен, и если нет,
    // перенаправляем на страницу логина
    if (!StorageService.contains('token')) {
      next({
        name: 'Auth',
        query: { redirect: fullPath }
      });
    } else {
      next();
    }
  }
}
