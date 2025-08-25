// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';

// utils
import { renderSvg } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { Appearance, State } from './types';
import { Fit, Orientation } from '@maersk-global/mds-shared-types';
// mds-components used with mc-step-indicator-item
import '@maersk-global/mds-components-core-icon';

export type { IMcStepIndicatorItem } from './types';

const APPEARANCE_ICONS = {
  warning: {
    small: {
      path: ' <path d="M10 5V11M10 13V15" />',
      width: 20,
      height: 20,
    },
    medium: {
      path: '<path d="M12 18V16M12 14V6" />',
      width: 24,
      height: 24,
    },
    large: {
      path: '<path d="M14 21V19M14 17V7" />',
      width: 28,
      height: 28,
    },
    'x-large': {
      path: '<path d="M16 25V23M16 20V8" />',
      width: 32,
      height: 32,
    },
  },

  error: {
    small: {
      path: '<path d="M6.5 13.5L10 9.99998M10 9.99998L13.5 6.49997M10 9.99998L6.5 6.49997M10 9.99998L13.5 13.5" stroke="white" stroke-width="2"/>',
      width: 20,
      height: 20,
    },
    medium: {
      path: '<path d="M8 16L12 12M12 12L16 7.99997M12 12L8 7.99997M12 12L16 16" stroke="white" stroke-width="2"/>',
      width: 24,
      height: 24,
    },
    large: {
      path: '<path d="M9.5 18.5L14 14M14 14L18.5 9.5M14 14L9.5 9.5M14 14L18.5 18.5" stroke="white" stroke-width="2"/>',
      width: 28,
      height: 28,
    },
    'x-large': {
      path: '<path d="M11 21L16 16M16 16L21 11M16 16L11 11M16 16L21 21" stroke="white" stroke-width="2"/>',
      width: 32,
      height: 32,
    },
  },
};

const STATE_ICONS = {
  small: {
    path: '<path d="M12.2372 4.67567L6.8078 10.5987C6.38462 11.0603 5.66196 11.076 5.21912 10.6332L1.79297 7.20705L3.20718 5.79284L5.96866 8.55432L10.7629 3.32422L12.2372 4.67567Z" />',
    width: 14,
    height: 14,
  },
  medium: {
    path: '<path d="M13.7349 5.17834L7.80547 11.6019C7.38171 12.0609 6.66114 12.0753 6.21937 11.6336L2.29297 7.70716L3.70718 6.29295L6.97123 9.55699L12.2653 3.82178L13.7349 5.17834Z" />',
    width: 16,
    height: 16,
  },
  large: {
    path: '<path d="M15.2329 6.18048L8.80348 13.1044C8.37924 13.5613 7.66046 13.5746 7.21959 13.1338L2.79297 8.70714L4.20718 7.29292L7.9734 11.0591L13.7673 4.81958L15.2329 6.18048Z" />',
    width: 18,
    height: 18,
  },
  'x-large': {
    path: '<path d="M16.7311 6.68232L9.80176 14.1067C9.3771 14.5616 8.65986 14.574 8.21978 14.1339L3.29297 9.20711L4.70718 7.7929L8.97527 12.061L15.269 5.31769L16.7311 6.68232Z" />',
    width: 20,
    height: 20,
  },
};

/**
 * @element `mc-step-indicator-item`
 * @summary Item is supposed to be used inside an `mc-step-indicator`.
 *
 * @slot - The default slot for the `step-indicator-item`. Used to display custom text/icon.
 * @slot icon - The `icon` slot where an `mc-icon` or any other forms of graphics go.
 *
 * @csspart `step` - for changing visuals of step item
 * @csspart `marker` - for changing visuals of marker inside the step
 * @csspart `icon` - for changing visuals of icon
 */

export class McStepIndicatorItem extends LitElement {
  @state()
  private hasSlotIcon = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  public autolayoutdisabled = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  public alignitemsdisabled = false;

  @property({ type: String, attribute: true, reflect: true })
  public fit: Fit | 'x-large' = 'medium';

  @property({ type: String })
  public icon = '';

  @property({ type: String })
  public label = '';

  @property({ type: String, attribute: true, reflect: true })
  public orientation: Orientation = 'horizontal';

  @property({ type: String, attribute: true, reflect: true })
  public state: State = 'pending';

  @property({ type: String, attribute: true, reflect: true })
  public appearance: Appearance = 'default';

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private iconSlotElements!: Array<HTMLElement>;

  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render */
  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      [`${this.orientation}`]: true,
      [`${this.state}`]: true,
      [`${this.appearance}`]: true,
      // alignitemsdisabled: this.alignitemsdisabled,
    };

    return html`<li role="listitem" part="step" class="item ${classMap(classes)}">
      <span class="marker" part="marker"> ${this.renderIconOrCheckmark()} </span>
      <span class="label" aria-current="${this.state === 'current'}"> ${this.label}<slot></slot> </span>
    </li>`;
  }

  private renderIconOrCheckmark(): TemplateResult {
    return html`<slot name="icon" @slotchange=${this.onIconSlotChange}></slot> ${this.icon
        ? html`<mc-icon exportparts="icon" icon=${this.icon} size="${this.fit === 'small' ? '16' : '20'}"></mc-icon>`
        : null}
      ${!this.hasIcon() ? this.renderCheckmark() : null}`;
  }

  private renderCheckmark(): TemplateResult | null {
    if (this.appearance !== 'default') {
      return renderSvg(
        APPEARANCE_ICONS[this.appearance][this.fit].path,
        APPEARANCE_ICONS[this.appearance][this.fit].width,
        APPEARANCE_ICONS[this.appearance][this.fit].height,
      );
    }
    if (this.state === 'completed') {
      return renderSvg(STATE_ICONS[this.fit].path, STATE_ICONS[this.fit].width, STATE_ICONS[this.fit].height);
    }
    return null;
  }

  // checks for icon
  protected hasIcon(): boolean {
    return (this.icon && this.icon.length > 0) || this.hasSlotIcon;
  }

  private onIconSlotChange(): void {
    this.hasSlotIcon = this.iconSlotElements.length > 0;
  }
}

customElements.get('mc-step-indicator-item') || customElements.define('mc-step-indicator-item', McStepIndicatorItem);
