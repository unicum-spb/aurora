/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { createDecorator } from 'vue-class-component';

export const Meta = createDecorator((options, key) => {
  if (!options.methods) return;
  options.metaInfo = options.methods[key];
});
