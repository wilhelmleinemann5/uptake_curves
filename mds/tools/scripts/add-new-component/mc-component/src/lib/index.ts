import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { Fit } from '@maersk-global/mds-shared-types';
import { IMcComponent, IMcComponentMyEventDetail } from './types';

/**
 * @element `mc-component`
 *
 * @event {CustomEvent<IMcComponentMyEventDetail>} myevent - Fired when the trigger occurs.
 *
 * @slot `hypothetical-slot-name` - The hypothetical slot.
 *
 * @csspart `hypothetical-csspart-name` - The hypothetical csspart.
 */
export class McComponent extends LitElement implements IMcComponent {
  @state() private index = 0;

  @property({ type: String }) public fit: Fit = 'medium';
  @property({ type: String }) public myprop = 'Label';

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
    };
    return html`<div
      part="hypothetical-csspart-name"
      class="mc-component ${classMap(classes)}"
      @click="${this.handleMyEvent}"
    >
      <div class="myprop">${this.myprop}</div>
      ${this.index}
      <slot name="hypothetical-slot-name"></slot>
    </div>`;
  }

  public handleMyEvent(): void {
    this.index = 1;
    this.dispatchEvent(
      new CustomEvent<IMcComponentMyEventDetail>('myevent', { detail: { id: 22, name: 'hypothetical-name' } })
    );
  }
}
customElements.get('mc-component') || customElements.define('mc-component', McComponent);

declare global {
  interface HTMLElementTagNameMap {
    'mc-component': McComponent;
  }
}
