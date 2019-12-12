<template>
  <v-switch
    v-model="computedTheme"
    :disabled="disabled"
    primary
    label="Dark"
  />
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */

import { Vue, Component, Watch } from 'vue-property-decorator';

import EventService from '@/services/event';

import { ColorSchemes } from '@/types/enums';

const PREFERS_COLOR_SCHEME = 'prefers-color-scheme';
const MEDIA = 'media';
const { LIGHT } = ColorSchemes;
const { DARK } = ColorSchemes;
const NO_PREFERENCE = 'no-preference';
const MQ_DARK = `(${PREFERS_COLOR_SCHEME}:${DARK})`;
const MQ_LIGHT = `(${PREFERS_COLOR_SCHEME}:${LIGHT}),(${PREFERS_COLOR_SCHEME}:${NO_PREFERENCE})`;
const LINK_REL_STYLESHEET = 'link[rel=stylesheet]';
const ALL = 'all';
const NOT_ALL = 'not all';

const manifests = document.querySelectorAll('link[rel="manifest"]');
const favicons = document.querySelectorAll('link[rel="icon"]');
const themeColor = document.querySelector('meta[name="theme-color"]');

const darkCSS = document.querySelectorAll(`${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${DARK}"]`);
const lightCSS = document.querySelectorAll(`${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${LIGHT}"],${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${NO_PREFERENCE}"]`);

@Component({})
export default class ThemeProvider extends Vue {
  private theme: ColorSchemes;
  private disabled: boolean;

  constructor () {
    super();
    this.theme = DARK;
    this.disabled = false;
  }

  get computedTheme () {
    return this.theme === DARK;
  }

  set computedTheme (value) {
    this.$vuetify.theme.dark = value;
    this.theme = value
      ? DARK
      : LIGHT;
  }

  @Watch('theme')
  onThemeChange (value: ColorSchemes) {
    document.dispatchEvent(
      new CustomEvent('colorschemechange', {
        bubbles: true,
        composed: true,
        detail: value,
      })
    );

    if (value === LIGHT) {
      lightCSS.forEach(link => {
        // @ts-ignore
        link.media = ALL;
        // @ts-ignore
        link.disabled = false;
      });
      darkCSS.forEach(link => {
        // @ts-ignore
        link.media = NOT_ALL;
        // @ts-ignore
        link.disabled = true;
      });
    } else {
      darkCSS.forEach(link => {
        // @ts-ignore
        link.media = ALL;
        // @ts-ignore
        link.disabled = false;
      });
      lightCSS.forEach(link => {
        // @ts-ignore
        link.media = NOT_ALL;
        // @ts-ignore
        link.disabled = true;
      });
    }
  }

  created () {
    if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
      console.warn('Your browser does not support the `prefers-color-scheme` media query.');
      this.disabled = true;
      return;
    }

    this.computedTheme = matchMedia(MQ_DARK).matches;
    this.theme = matchMedia(MQ_DARK).matches
      ? DARK
      : LIGHT;

    const toggleTheme = (event: any) => {
      const darkModeOn = event.matches;
      this.computedTheme = darkModeOn;
      // @ts-ignore
      manifests.forEach(link => link.href = darkModeOn ? link.dataset.hrefDark : link.dataset.hrefLight);
      // @ts-ignore
      favicons.forEach(link => link.href = darkModeOn ? link.dataset.hrefDark : link.dataset.hrefLight);
      // @ts-ignore
      themeColor.content = darkModeOn ? 'black' : 'white';
    };

    matchMedia(MQ_DARK).addListener(toggleTheme);
  }
}

</script>
