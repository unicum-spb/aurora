
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { Dictionary } from '@/types';

Vue.use(VueI18n);

const {
  VUE_APP_LOCALE,
  VUE_APP_FALLBACK_LOCALE
} = process.env;

function loadLocaleMessages () {
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.ts$/i);
  const messages: Dictionary<any> = {};
  locales.keys().forEach((key) => {
    if (key === './index.ts') return;
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

// http://kazupon.github.io/vue-i18n/guide/pluralization.html#custom-pluralization
/**
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} an overall amount of available choices
 * @returns a final choice index to select plural word by
* */
VueI18n.prototype.getChoiceIndex = function getChoiceIndex (choice: number, choicesLength: number): number {
  // this === VueI18n instance, so the locale property also exists here
  if (this.locale !== 'ru') {
    // proceed to the default implementation
  }
  if (choice === 0) {
    return 0;
  }
  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;
  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }
  return (choicesLength < 4) ? 2 : 3;
};

export default new VueI18n({
  locale: VUE_APP_LOCALE,
  fallbackLocale: VUE_APP_FALLBACK_LOCALE,
  messages: loadLocaleMessages()
});
