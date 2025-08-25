import { html, TemplateResult, CSSResultArray } from 'lit';
import { styles } from './styles/index.styles';
import { IMcDialog } from './types';
import { McDialogBase } from './base';

export * from './base';

/**
 * @element `mc-dialog`
 *
 * @event {CustomEvent<McDialogAction>} closed -  The closed event gets dispatched once the dialog is closed.
 * @event {CustomEvent<McDialogAction>} closing - The closing event gets dispatched once the dialog is closing.
 * @event {CustomEvent} opened -  The opened event gets dispatched once the dialog is opened.
 * @event {CustomEvent} opening - The opening event gets dispatched once the dialog is opening.
 * @event {MouseEvent} click - The click event gets dispatched when clicked on the primaryAction/secondaryAction button within a dialog.
 *
 * @slot `default` - The body HTML to use for the dialog.
 * @slot `primaryAction` - The primaryAction HTML to use for the dialog.
 * Could be used for i.e. custom confirm/cancel buttons.
 * @slot `secondaryAction` - The secondaryAction HTML to use for the dialog.
 * Could be used for i.e. custom confirm/cancel buttons.
 * @csspart `dialog` - for changing the whole dialog element
 * @csspart `header` - for changing the header element
 * @csspart `body-wrapper` - for changing the body wrapper
 * @csspart `footer` - for changing the footer element
 */
export class McDialog extends McDialogBase implements IMcDialog {
  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  public constructor() {
    super();
  }

  protected renderFooter(): TemplateResult {
    return html`
      <footer class="footer" part="footer">
        <slot name="secondaryAction" @slotchange=${this.handleSlotChange}></slot>
        <slot name="primaryAction" @slotchange=${this.handleSlotChange}></slot>
      </footer>
    `;
  }
}
customElements.get('mc-dialog') || customElements.define('mc-dialog', McDialog);

declare global {
  interface HTMLElementTagNameMap {
    'mc-dialog': McDialog;
  }
}
