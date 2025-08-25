import { CSSResultArray } from 'lit';

// styles
import { styles } from './styles/index.styles';

// components
import '@maersk-global/mds-components-core-segmented-control-item';

// types
import { McList } from '@maersk-global/mds-components-core-list';
import { IMcList } from '@maersk-global/mds-components-core-list/src/lib/types';

/**
 * @element` mc-segmented-control`
 * @summary Groups multiple selectable options for displaying different views of the same content.
 * @since 2.29.0
 *
 * @event {CustomEvent<IMcListChangeDetail>} listchange - Emitted when a segmented control item is interacted.
 * @event {CustomEvent<IMcListItemsLoadedDetail>} listitemsloaded - Emitted when the segmented control items are loaded.
 * @event {CustomEvent<IMcListFocusChangeDetail>} focuschange - Emitted when a segmented control item receives focus.
 *
 * @slot - The default slot where the segmented control items go.
 *
 * @csspart `list` - for changing visuals of the inner list container.
 */
export class McSegmentedControl extends McList implements Omit<IMcList, 'type' | 'orientation'> {
  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  public constructor() {
    super();
    this.type = 'single';
    this.width = 'auto';
    this.disablecircularkeynav = true;
    this.keynavigationtype = 'tab';
    this.disablehandlemousemove = true;
    this.scrollToSelectedValue = true;
    this.orientation = 'horizontal';
  }
}
customElements.get('mc-segmented-control') || customElements.define('mc-segmented-control', McSegmentedControl);
