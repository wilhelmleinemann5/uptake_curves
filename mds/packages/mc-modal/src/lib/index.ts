// lit-elements
import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcModal, Padding } from './types';

// mds-components used with mc-modal
import '@maersk-global/mds-components-core-button';
import { McDialogBase } from '@maersk-global/mds-components-core-dialog';

export type { IMcModal } from './types';

/**
 * @element `mc-modal`
 *
 * @event {CustomEvent<McModalAction>} closed -  The closed event gets dispatched once the modal is closed.
 * @event {CustomEvent<McModalAction>} closing - The closing event gets dispatched once the modal is closing.
 * @event {CustomEvent} opened -  The opened event gets dispatched once the modal is opened.
 * @event {CustomEvent} opening - The opening event gets dispatched once the modal is opening.
 * @event {MouseEvent} click - The click event gets dispatched when clicked on the primaryAction/secondaryAction button within a modal.
 *
 * @slot `default` - The body HTML to use for the modal.
 * @slot `primaryAction` - The primaryAction HTML to use for the modal.
 * Could be used for i.e. custom confirm/cancel buttons.
 * @slot `secondaryAction` - The secondaryAction HTML to use for the modal.
 * Could be used for i.e. custom confirm/cancel buttons.
 * @slot `footer` - A slot for additional content to be placed in the footer.
 * Could be used for i.e. instructions or disclaimer
 */

export class McModal extends McDialogBase implements IMcModal {
  @property({ type: Boolean })
  public backdropcloseactiondisabled = false;

  @property({ type: Boolean })
  public entercloseactiondisabled = false;

  @property({ type: Boolean })
  public hiddenclose = false;

  @property({ type: String })
  public padding: Padding = 'default';

  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  protected getClasses(): Record<string, boolean> {
    return {
      ...super.getClasses(),
      closable: this.showclosebutton,
    };
  }

  protected renderFooter(): TemplateResult {
    return html`
      <footer class="footer" part="footer">
        <div>
          <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div class="actions">
          <slot name="secondaryAction" @slotchange=${this.handleSlotChange}></slot>
          <slot name="primaryAction" @slotchange=${this.handleSlotChange}></slot>
        </div>
      </footer>
    `;
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    super.handleKeyDown(event);
    if (event.key === 'Enter' && this.entercloseactiondisabled) {
      event.preventDefault();
    }
  }
  /* lifecycle methods */

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('hiddenclose')) {
      this.showclosebutton = !this.hiddenclose;
    }

    if (changedProperties.has('padding')) {
      if (this.padding === 'none') {
        this.nopadding = true;
      } else {
        this.nopadding = false;
      }
    }

    if (changedProperties.has('backdropcloseactiondisabled')) {
      this.closeonclickoutside = !this.backdropcloseactiondisabled;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-modal': McModal;
  }
}

customElements.get('mc-modal') || customElements.define('mc-modal', McModal);
