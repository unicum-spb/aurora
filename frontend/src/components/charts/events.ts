import { Scalars } from '@/types';

// enumerating ECharts events for now

export const CHART_EVENTS: ReadonlyArray<Scalars['String']> = [
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'legendscroll',
  // 'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'pieselectchanged',
  'pieselected',
  'pieunselected',
  'mapselectchanged',
  'mapselected',
  'mapunselected',
  'axisareaselected',
  'focusnodeadjacency',
  'unfocusnodeadjacency',
  'brush',
  'brushselected',
  // 'rendered',
  'finished',
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousemove',
  'mousedown',
  'mouseup',
  'globalout',
  'contextmenu'
];

export const ZR_EVENTS: ReadonlyArray<Scalars['String']> = [
  'click',
  'mousedown',
  'mouseup',
  'mousewheel',
  'dblclick',
  'contextmenu'
];
