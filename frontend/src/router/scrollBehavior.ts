import { Route } from 'vue-router/types';
// @ts-ignore
import goTo from 'vuetify/lib/services/goto';

type Position = { x: number; y: number }
type PositionResult = Position | { selector: string; offset?: Position } | void

export default (to: Route, from: Route, savedPosition: Position | void): PositionResult | Promise<PositionResult> => {
  let scrollTo: string | number = 0;

  if (savedPosition) {
    scrollTo = savedPosition.y;
  }

  return goTo(scrollTo);
};
