// lit-elements
import { html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { FitToIconSize } from '@maersk-global/mds-components-core-text-and-icon/src/lib/types';
import { TagAppearance, IMcTag, Width } from './types';
// mds-components used with mc-tag
import { McTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon';
import '@maersk-global/mds-components-core-button';

export type { IMcTag, TagAppearance } from './types';

/**
 * @element `mc-tag`
 *
 * @event {CustomEvent<string>} dismiss - Emitted when the tag is dismissed. Works only if `withaction` is set to true.
 *
 * @slot `default` - The label HTML to use for the mc-tag.
 * @slot `icon` - The custom graphic, pictogram, etc. to use as the icon for mc-tag.
 * @slot `trailingicon` - The custom graphic, pictogram, etc. to use as the trailingicon for mc-tag.
 *
 * @csspart `tag` - for changing visuals of tag
 * @csspart `action-button` - for changing visuals of action-button
 */
export class McTag extends McTextAndIcon implements IMcTag {
  protected fitToIconSize: FitToIconSize = {
    large: '24',
    medium: '20',
    small: '16',
  };

  @property({ type: String, reflect: true })
  public appearance: TagAppearance = 'neutral-weak';

  @property({ type: String, reflect: true })
  public width: Width = 'auto';

  @property({ type: Boolean })
  public withaction = false;

  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  /* render */
  protected render(): TemplateResult {
    const classes = {
      'full-width': this.width === 'full-width',
      'with-action': this.withaction,
      'neutral-default': this.appearance === 'neutral-default',
      'neutral-weak':
        this.appearance === 'neutral-weak' || this.appearance === 'neutral-subtle' || this.appearance === 'neutral',
      'neutral-inverse': this.appearance === 'neutral-inverse',
      info: this.appearance === 'info',
      error: this.appearance === 'error',
      warning: this.appearance === 'warning',
      success: this.appearance === 'success',
      primary: this.appearance === 'primary',
      secondary: this.appearance === 'secondary',
      [`${this.fit}`]: true,
    };
    return html` <div class="mc-tag ${classMap(classes)}" part="tag">
      ${this.renderTextAndIcon()} ${this.renderActionButton()}
    </div>`;
  }

  private renderActionButton(): TemplateResult | null {
    return this.withaction
      ? html` <mc-button
          exportparts="button: action-button"
          fit="small"
          hiddenlabel
          appearance="neutral"
          padding="none"
          variant="plain"
          aria-label="Clear ${this.label}"
          icon="times"
          @click=${this.handleClick}
          disablediconslot
          disabledlabelslot
        ></mc-button>`
      : null;
  }

  /* events */
  private handleClick(): void {
    this.dispatchEvent(new CustomEvent<string>('dismiss', { detail: this.label, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-tag': McTag;
  }
}

customElements.get('mc-tag') || customElements.define('mc-tag', McTag);
