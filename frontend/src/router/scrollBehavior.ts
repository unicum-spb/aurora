import { Route } from 'vue-router/types'
import { Position } from 'vue-router/types/router'

export default (to: Route, from: Route, savedPosition: Position | void) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
