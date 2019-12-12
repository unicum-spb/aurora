import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class OnRightClick extends Vue {
  /**
   * Call options button on right click at menu tile
   */
  callOnRightClickBy (rightClickSelector: string, event: MouseEvent): void {
    const childButton = this.$el.querySelector<HTMLElement>(rightClickSelector);

    event.preventDefault();
    event.stopPropagation();
    if (childButton) childButton.click();
  }
}
