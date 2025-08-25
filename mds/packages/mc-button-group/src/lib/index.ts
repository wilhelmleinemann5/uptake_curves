import { CSSResultArray, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

// styles
import { styles } from './styles/index.styles';

// components
import '@maersk-global/mds-components-core-button-group-item';

// types
import { McList } from '@maersk-global/mds-components-core-list';
import { ListTypes } from '@maersk-global/mds-components-core-list/src/lib/types';
import { IMcListItem } from '@maersk-global/mds-components-core-list-item/src/lib/types';
import { IMcButtonGroup } from './types';

export type { IMcButtonGroup } from './types';

/**
 * @element` mc-button-group`
 * @summary Combines individual buttons that have a logical relationship into a cohesive group.
 *
 * @event {CustomEvent<IMcListChangeDetail>} listchange - Emitted when a button group item is interacted.
 * @event {CustomEvent<IMcListItemsLoadedDetail>} listitemsloaded - Emitted when the button group items are loaded.
 * @event {CustomEvent<IMcListFocusChangeDetail>} focuschange - Emitted when a button group item receives focus.
 *
 * @slot - The default slot where the button group items go.
 *
 * @csspart `list` - for changing visuals of the inner list container.
 */
export class McButtonGroup extends McList implements IMcButtonGroup {
  @property({ type: String, reflect: true })
  public selectiontype: ListTypes = 'none';

  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  public constructor() {
    super();
    this.width = 'auto';
    this.disablecircularkeynav = true;
    this.keynavigationtype = 'tab';
    this.disablehandlemousemove = true;
    this.noborder = true;
    this.scrollToSelectedValue = true;
    this.orientation = 'horizontal';
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.adjustSeparatorsOnSelectedItems();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('selectiontype')) {
      this.type = this.selectiontype;
    }
  }

  protected handleListChange(item: IMcListItem | null | undefined): void {
    super.handleListChange(item);

    if (item) {
      this.adjustSeparatorsOnSelectedItems(item);
    }
  }

  private adjustSeparatorsOnSelectedItems(currentItem?: IMcListItem): void {
    if (currentItem) {
      this.adjustSeparatorsByItem(currentItem);
      return;
    }

    this.allItems?.forEach((item) => {
      if (item.selected) {
        this.adjustSeparatorsByItem(item);
      }
    });
  }

  private adjustSeparatorsByItem(currentItem: IMcListItem): void {
    if (this.allItems) {
      const afterSelectedClassName = 'after-selected';
      const itemIndex = this.allItems.indexOf(currentItem);

      if (this.type === 'single') {
        const currentAfterSelectedItem = this.allItems.find((item) => item.classList.contains(afterSelectedClassName));

        if (currentAfterSelectedItem) {
          currentAfterSelectedItem.classList.remove(afterSelectedClassName);
        }
      }

      if (itemIndex != null && itemIndex < this.allItems.length - 1) {
        if (currentItem.selected) {
          this.allItems[itemIndex + 1].classList.add(afterSelectedClassName);
        } else {
          this.allItems[itemIndex + 1].classList.remove(afterSelectedClassName);
        }
      }
    }
  }
}
customElements.get('mc-button-group') || customElements.define('mc-button-group', McButtonGroup);
