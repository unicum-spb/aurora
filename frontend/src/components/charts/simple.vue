<template>
  <div
    :id="id"
    :class="className"
    :style="{height, width}"
  />
</template>

<script lang="ts">

import ECharts, { EChartOption } from 'echarts';
import { Component, Prop, Mixins } from 'vue-property-decorator';

import { ResizeMixin } from './mixins';

@Component({ inheritAttrs: false })
export default class LineChart extends Mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) public id!: string
  @Prop({ default: 'chart' }) public className!: string
  @Prop({ default: '200px' }) public width!: string
  @Prop({ default: '200px' }) public height!: string

  async mounted () {
    await this.$nextTick();
    this.initChart();
  }

  beforeDestroy () {
    if (!this.chart) { return; }
    this.chart.dispose();
    this.chart = null;
  }

  public initChart () {
    this.chart = ECharts.init(document.getElementById(this.id) as HTMLDivElement);
    this.chart.setOption({
      backgroundColor: '#394056',

      title: {
        top: 20,
        text: 'Requests',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          color: '#F1F1F3'
        },
        left: '1%'
      },

      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 50
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: 50,
          end: 100
        }
      ],

      tooltip: {
        trigger: 'axis'
      },

      legend: {
        top: 20,
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: [ 'CMCC', 'CTCC', 'CUCC' ],
        right: '4%',
        textStyle: {
          fontSize: 12,
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
          data: [ '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55' ]
        }
      ],

      yAxis: [
        {
          type: 'value',
          name: 'Значение',
          axisTick: {
            show: false
          },

          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },

          axisLabel: {
            margin: 10,
            fontSize: 14
          },

          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }
      ],

      series: [
        {
          name: 'max',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,

          lineStyle: {
            width: 1
          },

          itemStyle: {
            color: 'blue',
            borderWidth: 12,
            opacity: 0.1
          },

          data: [ 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300 ]
        },

        {
          name: 'CUCC',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,

          lineStyle: {
            width: 4
          },

          itemStyle: {
            color: 'rgb(219,50,51)',
            borderColor: 'rgba(219,50,51,0.2)',
            borderWidth: 12
          },

          data: [ 220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122 ]
        },

        {
          name: 'min',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,

          lineStyle: {
            width: 1
          },

          areaStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
            opacity: 0.1
          },

          itemStyle: {
            color: 'blue',
            borderWidth: 12,
            opacity: 0.1
          },

          data: [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100 ]
        },
      ]
    } as EChartOption<EChartOption.SeriesLine>);
  }
}

</script>
