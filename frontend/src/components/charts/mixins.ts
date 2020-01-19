import { ECharts } from 'echarts';
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'ResizeMixin' })
export class ResizeMixin extends Vue {
  protected chart!: ECharts | null
  private sidebarElm?: Element

  mounted () {
    this.initResizeEvent();
    this.initSidebarResizeEvent();
  }

  beforeDestroy () {
    this.destroyResizeEvent();
    this.destroySidebarResizeEvent();
  }

  activated () {
    this.initResizeEvent();
    this.initSidebarResizeEvent();
  }

  deactivated () {
    this.destroyResizeEvent();
    this.destroySidebarResizeEvent();
  }

  private chartResizeHandler () {
    if (this.chart) {
      this.chart.resize();
    }
  }

  private sidebarResizeHandler (e: TransitionEvent) {
    if (e.propertyName === 'width') {
      this.chartResizeHandler();
    }
  }

  private initResizeEvent () {
    if (this.chartResizeHandler) {
      window.addEventListener('resize', this.chartResizeHandler);
    }
  }

  private destroyResizeEvent () {
    if (this.chartResizeHandler) {
      window.removeEventListener('resize', this.chartResizeHandler);
    }
  }

  private initSidebarResizeEvent () {
    // eslint-disable-next-line prefer-destructuring
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    if (this.sidebarElm) {
      this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler as EventListener);
    }
  }

  private destroySidebarResizeEvent () {
    if (this.sidebarElm) {
      this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler as EventListener);
    }
  }
}
