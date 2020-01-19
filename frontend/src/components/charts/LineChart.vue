<template>
  <div
    ref="chart"
    :class="className"
    :style="computedStyles"
  />
</template>

<script lang="ts">

import { Component, Prop, Mixins, Watch, Ref } from 'vue-property-decorator';
import ECharts, { EChartOption } from 'echarts';

import { Dictionary } from 'vue-router/types/router';
import { ComparedQuantumReportModel, Scalars } from '@/types';

import { ResizeMixin } from './mixins';
import { CHART_EVENTS, ZR_EVENTS } from './events';
import { toShortLocaleDateAndTime } from '@/utils/filters';


@Component({ inheritAttrs: false })
export default class LineChart extends Mixins(ResizeMixin) {
  @Prop({ default: 'chart' })
  public id!: Scalars['String']

  @Prop({ default: 'chart' })
  public className!: Scalars['String']

  @Prop({ default: '200px' })
  public width!: Scalars['String']

  @Prop({ default: '200px' })
  public height!: Scalars['String']

  @Prop({ required: true })
  public title!: Scalars['String']

  @Prop({ required: true })
  public report!: ComparedQuantumReportModel

  @Prop()
  public zoom!: EChartOption.DataZoom

  @Watch('isDark')
  @Watch('report', { deep: true })
  onReportChange () {
    this.destroyChart();
    this.initChart();
  }

  @Watch('zoom')
  onZoomChange (value: EChartOption.DataZoom) {
    if (this.chart) {
      this.chart.setOption({ dataZoom: [value] });
    }
  }

  @Ref('chart') chartRef!: HTMLDivElement

  public get computedStyles (): Dictionary<Scalars['String']> {
    const { height, width } = this;
    return { 'min-height': height, width };
  }

  mounted () {
    this.initChart();
  }

  beforeDestroy () {
    this.destroyChart();
  }

  public async initChart () {
    await this.$nextTick();
    this.chart = ECharts.init(this.chartRef);

    this.chart.setOption({
      backgroundColor: this.isDark ? '#394056' : 'white',

      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: 100,
          end: 100
        }
      ],

      tooltip: {
        trigger: 'axis'
      },

      legend: {
        top: 24,
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 6,
        itemGap: 12,
        data: [
          {
            name: 'min',
            icon: 'triangle'
          },
          {
            name: this.report.title,
            icon: 'circle'
          },
          {
            name: 'max',
            icon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
          },
        ],
        right: '4%',
        textStyle: {
          fontSize: 14,
          color: '#F1F1F3'
        }
      },

      grid: {
        top: 100,
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },

      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          position: 'top',
          offset: 20,
          data: this.report.dates.map(toShortLocaleDateAndTime)
        }
      ],

      yAxis: [
        {
          type: 'value',
          name: 'Значение',
          min: () => {
            const [min] = this.report.min;
            const [max] = this.report.max;
            return min > max
              ? 25 * (max / 100)
              : 25 * (min / 100);
          },
          axisTick: {
            show: false
          },

          axisLine: {
            lineStyle: {
              color: '#57617B'
            },
          },

          axisLabel: {
            show: false,
            margin: 10,
            fontSize: 14,
          },

          splitLine: {
            lineStyle: {
              color: '#57617B',
            }
          }
        }
      ],

      series: [
        {
          name: 'max',
          type: 'line',
          smooth: false,
          showSymbol: false,

          lineStyle: {
            width: 4
          },

          itemStyle: {
            color: '#F44336',
          },

          data: this.report.max.map(max => max.toFixed(3))
        },

        {
          name: this.report.title,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,

          lineStyle: {
            width: 4
          },

          itemStyle: {
            color: '#64ba69',
            borderWidth: 0
          },

          data: this.report.value
        },

        {
          name: 'min',
          type: 'line',
          smooth: false,
          showSymbol: false,

          lineStyle: {
            width: 4
          },

          itemStyle: {
            color: '#F44336',
          },

          data: this.report.min.map(min => min.toFixed(3))
        },
      ]
    } as EChartOption<EChartOption.SeriesLine>);

    CHART_EVENTS.forEach(event => {
      if (this.chart) {
        this.chart.on(event, (params: any) => this.$emit(event, params));
      }
    });

    this.chart.on('datazoom', (ctx: any) => {
      const paylaod = ctx.batch
        ? {
          start: ctx.batch[0].start,
          end: ctx.batch[0].end
        }
        : { start: ctx.start, end: ctx.end };

      this.$emit('zoom', paylaod);
    });
  }

  /**
   * destroyChart
   */
  public destroyChart () {
    if (!this.chart) { return; }
    this.chart.dispose();
    this.chart = null;
  }
}

</script>
