import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { Fit } from '@maersk-global/mds-shared-types';
import { setPropsForSlottedComponents } from '@maersk-global/mds-components-utils';

import { IMcInputGroup } from './types';

/**
 * @element `mc-input-group`
 *
 * @slot - One or more input components to display in the group (mc-button, mc-input, mc-input-date, mc-input-time, mc-link-button, mc-multi-select, mc-select, mc-menu, mc-select-native, mc-typeahead).
 * @slot `legend` - The legend HTML to use for the mc-input-group.
 *
 */

export class McInputGroup extends LitElement implements IMcInputGroup {
  private elements?: HTMLElement[];

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public legend = 'Legend';

  @property({ type: Boolean }) public hiddenlegend = false;

  @property({ type: Boolean }) public disableinnerborder = false;

  @queryAssignedElements({ slot: '', flatten: true })
  private defaultSlotElements!: Array<HTMLElement>;

  public static get styles(): CSSResultArray {
    return styles;
  }

  protected renderLegend(): TemplateResult {
    return html`<legend
      class="legend-above ${this.hiddenlegend ? 'hidden' : ''}"
    >
      <mc-label
        id="legend"
        .label="${this.legend}"
        .fit=${this.fit}
        ?hiddenlabel="${this.hiddenlegend}"
        @click="${(e: PointerEvent): void => e.stopPropagation()}"
      >
        <slot name="legend">${this.hiddenlegend ? '' : this.legend}</slot>
      </mc-label>
    </legend>`;
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      'no-borders': this.disableinnerborder,
    };
    return html`
      ${this.renderLegend()}
      <div data-cy="mc-input-group-container" class="mc-input-group ${classMap(classes)}">
        <slot class="defaultSlot" @slotchange="${this.onDefaultSlotChange}"></slot>
      </div>
    `;
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.elements) {
      setPropsForSlottedComponents(this.elements, 'fit', this.fit);
    }

    if (changedProperties.has('disableinnerborder')) {
      this.applyStylesToAllElements();
    }
  }

  private setBorderStyle(
    element: HTMLElement,
    property: 'border-left-color' | 'border-right-color',
    value: string | null,
  ): void {
    if (value) {
      element.style.setProperty(property, value);
    } else {
      element.style.removeProperty(property);
    }
  }

  private applyBorderLogic(element: HTMLElement, isFirst: boolean, isLast: boolean, transparent: boolean): void {
    if (!this.disableinnerborder) return;

    const leftColor = transparent ? 'transparent' : null;
    const rightColor = transparent ? 'transparent' : null;

    if (!isFirst && !isLast) {
      this.setBorderStyle(element, 'border-left-color', leftColor);
      this.setBorderStyle(element, 'border-right-color', rightColor);
    } else if (isFirst) {
      this.setBorderStyle(element, 'border-right-color', rightColor);
      this.setBorderStyle(element, 'border-left-color', null);
    } else if (isLast) {
      this.setBorderStyle(element, 'border-left-color', leftColor);
      this.setBorderStyle(element, 'border-right-color', null);
    }
  }

  private applyStylesToElement(element: HTMLElement, isFirst: boolean, isLast: boolean): void {
    element.style.setProperty('border-radius', '0');
    element.style.setProperty('box-sizing', 'border-box');

    if (this.disableinnerborder) {
      this.applyBorderLogic(element, isFirst, isLast, true);
    } else {
      element.style.setProperty('margin-left', isFirst ? '' : '-1px');
      element.style.removeProperty('border-left-color');
      element.style.removeProperty('border-right-color');
    }

    const radiusValue = 'var(--mds_brand_border_medium_radius)';
    if (isFirst) {
      element.style.setProperty('border-top-left-radius', radiusValue);
      element.style.setProperty('border-bottom-left-radius', radiusValue);
    } else if (isLast) {
      element.style.setProperty('border-top-right-radius', radiusValue);
      element.style.setProperty('border-bottom-right-radius', radiusValue);
    }
  }

  private createFocusHandlers(
    targetElement: HTMLElement,
    parentElement: HTMLElement,
    isFirst: boolean,
    isLast: boolean,
  ) {
    const toggleBorders = (transparent: boolean) => {
      targetElement.style.zIndex = transparent ? '' : '2';
      this.applyBorderLogic(targetElement, isFirst, isLast, transparent);
    };

    return {
      setHighZIndex: () => toggleBorders(false),
      removeZIndex: () => toggleBorders(true),
    };
  }

  private addEventListeners(element: HTMLElement, setHighZIndex: () => void, removeZIndex: () => void): void {
    const events = [
      ['focusin', 'focusout'],
      ['mouseenter', 'mouseleave'],
      ['mousedown', null],
    ] as const;

    events.forEach(([activeEvent, inactiveEvent]) => {
      element.removeEventListener(activeEvent, setHighZIndex);
      element.addEventListener(activeEvent, setHighZIndex);

      if (inactiveEvent) {
        element.removeEventListener(inactiveEvent, removeZIndex);
        element.addEventListener(inactiveEvent, removeZIndex);
      }
    });
  }

  private findButtonElement(element: HTMLElement): HTMLElement | null {
    const shadowButton = element.shadowRoot?.querySelector(
      '.mc-button button, .mc-button a, .mc-button .link-button, button[part="button"]',
    ) as HTMLElement;

    if (shadowButton) {
      return shadowButton;
    }

    // Special handling for mc-menu - look for slotted button in trigger slot
    if (element.tagName.toLowerCase() === 'mc-menu') {
      const slottedButton = element.querySelector('[slot="trigger"]') as HTMLElement;
      if (slottedButton?.tagName.toLowerCase() === 'mc-button') {
        return slottedButton.shadowRoot?.querySelector('button, a, .link-button') as HTMLElement;
      }
      return slottedButton;
    }

    return null;
  }

  private processElement(element: HTMLElement, isFirst: boolean, isLast: boolean): void {
    this.applyStylesToElement(element, isFirst, isLast);
    const { setHighZIndex, removeZIndex } = this.createFocusHandlers(element, element, isFirst, isLast);
    this.addEventListeners(element, setHighZIndex, removeZIndex);
  }

  private applyStylesToAllElements(): void {
    if (!this.elements?.length) return;

    const firstElement = this.elements[0];
    const lastElement = this.elements[this.elements.length - 1];

    this.elements.forEach((element) => {
      const isFirst = element === firstElement;
      const isLast = element === lastElement;

      const divElement = element.shadowRoot?.querySelector('div.field') as HTMLElement;
      if (divElement) {
        this.processElement(divElement, isFirst, isLast);
      }

      const buttonElement = this.findButtonElement(element);
      if (buttonElement) {
        this.processElement(buttonElement, isFirst, isLast);
      }
    });
  }

  private onDefaultSlotChange(): void {
    const tagNames = [
      'mc-button',
      'mc-input',
      'mc-input-date',
      'mc-input-time',
      'mc-link-button',
      'mc-multi-select',
      'mc-select',
      'mc-menu',
      'mc-select-native',
      'mc-typeahead',
    ];

    if (this.defaultSlotElements.length > 0) {
      this.elements = this.defaultSlotElements.filter((element) => tagNames.includes(element.tagName.toLowerCase()));

      if (this.elements.length > 0) {
        this.elements.forEach((element) => {
          (element as unknown as { fit: Fit }).fit = this.fit;
        });

        this.applyStylesToAllElements();
      }
    }
  }
}

if (!customElements.get('mc-input-group')) {
  customElements.define('mc-input-group', McInputGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-input-group': McInputGroup;
  }
}
