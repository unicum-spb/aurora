import { Vue, Component } from 'vue-property-decorator';
import { Scalars } from '@/types';

@Component({ inheritAttrs: false })
export class OnRightClick extends Vue {
  /**
   * Call options button on right click at menu tile
   */
  callOnRightClickBy (rightClickSelector: Scalars['String'], event: MouseEvent): void {
    const childButton = this.$el.querySelector<HTMLElement>(rightClickSelector);

    event.preventDefault();
    event.stopPropagation();
    if (childButton) { childButton.click(); }
  }
}
