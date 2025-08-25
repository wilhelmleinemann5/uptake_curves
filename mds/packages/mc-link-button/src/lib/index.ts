import { McButton } from '@maersk-global/mds-components-core-button';
import { IMcButton } from '@maersk-global/mds-components-core-button/types';

/**
 * @element `mc-link-button`
 *
 * @event {MouseEvent} `click` - Emitted when the button is clicked.
 * @event {FocusEvent} `focus` - Emitted when the button is focused.
 * @event {FocusEvent} `blur` - Emitted when the button is blurred.
 *
 * @slot - The default slot for the `button`. Used to display custom text/icon in the middle of the button.
 * @slot `icon` - The icon HTML to use for the `button`.
 * @slot `trailingicon` - The trailing icon HTML to use for the `button`.
 *
 * @csspart `button` - for changing visuals of button
 * @csspart `icon` - for changing visuals of icon
 * @csspart `text-and-icon` - for changing visuals of text and icons container
 * @csspart `text-and-icon-labels` - for changing visuals of text
 * @csspart `text-and-icon-label` - for changing visuals of label text
 * @csspart `text-and-icon-sublabel` - for changing visuals of sublabel text
 */
export class McLinkButton extends McButton implements IMcButton {}
customElements.get('mc-link-button') || customElements.define('mc-link-button', McLinkButton);

declare global {
  interface HTMLElementTagNameMap {
    'mc-link-button': McLinkButton;
  }
}
