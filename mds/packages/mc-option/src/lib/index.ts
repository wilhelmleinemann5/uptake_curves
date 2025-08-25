import { McListItem } from '@maersk-global/mds-components-core-list-item';

export class McOption extends McListItem {}

customElements.get('mc-option') || customElements.define('mc-option', McOption);

declare global {
  interface HTMLElementTagNameMap {
    'mc-option': McOption;
  }
}
