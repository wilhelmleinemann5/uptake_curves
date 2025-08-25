// lit-elements
import { CSSResultArray, LitElement, PropertyValues, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
// utils
import { DisabledState, FormField, setPropsForSlottedComponents } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, IMCMultiChoiceFieldset, McMultiChoiceFieldsetChangeDetail, Orientation, Value } from './types';
// mds-components used with mc-multi-choice-fieldset
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-label';
import { McHint } from '@maersk-global/mds-components-core-hint';
import { McError } from '@maersk-global/mds-components-core-error';

export type { IMCMultiChoiceFieldset } from './types';

/**
 * @element `mc-multi-choice-fieldset`
 *
 * @event {CustomEvent<McMultiChoiceFieldsetChangeDetail>} change - Fired when any item in the group is checked/unckecked.
 *
 * @slot - One or more HTMLelements to display in the group.
 * @slot `legend` - The legend HTML to use for the fieldset.
 * @slot `hint` - The hint HTML to use for the fieldset.
 * @slot `errormessage` - The errormessage HTML to use for the fieldset.
 *
 * @part `fieldset-container` - The container of the fieldset.
 */
export class McMultiChoiceFieldset extends DisabledState(FormField(LitElement)) implements IMCMultiChoiceFieldset {
  private groupFirstUpdated = false;
  private inputsSlot?: HTMLSlotElement | null;

  protected inputs?: HTMLInputElement[];

  @property({ type: Boolean })
  public autolayoutdisabled = false;

  @query('.mc-multi-choice-fieldset')
  private fieldset?: HTMLFieldSetElement | null;

  @query('mc-hint')
  private hintElement?: McHint;

  @query('mc-error')
  private errorElement?: McError;

  @property({ type: String })
  public errormessage?: string;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlegend = false;

  @property({ type: String })
  public hint?: string;

  @property({ type: Boolean, reflect: true })
  public invalid = false;

  @property({ type: String })
  public legend = 'Legend';

  @property({ type: String, reflect: true })
  public name = '';

  @property({ type: String })
  public orientation: Orientation = 'vertical';

  @property({ type: String, reflect: true })
  public value?: Value | undefined;

  public static get styles(): CSSResultArray {
    return styles;
  }

  protected render(): TemplateResult {
    const classes = {
      'no-feedback': this.hiddenlegend && !this.invalid && !this.hintElement?.visible,
      [`autolayout`]: !this.autolayoutdisabled,
      [`${this.orientation}`]: true,
      [`${this.fit}`]: true,
    };

    return html`<div role="group" aria-labelledby="label" class="mc-multi-choice-fieldset ${classMap(classes)}">
      <legend
        class="${this.hiddenlegend ? 'hiddenlegend' : ''}"
        aria-label="${ifDefined(this.hiddenlegend ? this.legend : undefined)}"
      >
        <mc-label id="label" .label=${this.legend} .fit=${this.fit} ?hiddenlabel=${this.hiddenlegend}
          ><slot name="legend">${this.legend}</slot></mc-label
        >
      </legend>
      <mc-error id="invalid" .errormessage=${this.errormessage} .fit=${this.fit} ?invalid=${this.invalid}
        ><slot name="errormessage">${this.errormessage}</slot></mc-error
      >
      <mc-hint id="hint" .hint=${this.hint} .fit=${this.fit}><slot name="hint">${this.hint}</slot></mc-hint>
      <div class="slot" part="fieldset-container">
        <slot></slot>
      </div>
    </div>`;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  public disconnectedCallback(): void {
    this.inputsSlot?.removeEventListener('slotchange', this.inputsSlotIsReady);
    super.disconnectedCallback();
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.initializeElements();
    this.fieldset?.addEventListener('change', (event: Event): void => this.onChange(event as InputEvent));
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.inputs) {
      setPropsForSlottedComponents(this.inputs, 'fit', this.fit);

      if (changedProperties.has('value')) {
        this.setCheckedStatusBySuppliedValue();
      }

      if (this.disabled) {
        setPropsForSlottedComponents(this.inputs, 'disabled', this.disabled);
      }

      if (changedProperties.has('disabled')) {
        setPropsForSlottedComponents(this.inputs, 'disabled', this.disabled);
      }
    }
  }

  private onChange(event: InputEvent): void {
    event.stopPropagation();
    this.value = this.getSelectedValues();

    this.dispatchEvent(
      new CustomEvent<McMultiChoiceFieldsetChangeDetail>('change', {
        detail: this.value,
      }),
    );
  }

  private setCheckedStatusBySuppliedValue(): void {
    if (!this.inputs || (!this.value && this.value !== '')) {
      return;
    }
    const values: unknown[] = this.getValues();
    this.inputs?.forEach((input) => {
      if (
        values.find((value) => {
          const stringifiedValue = this.getStringifiedValue(value);
          const stringifiedInputValue = this.getStringifiedValue(
            input.localName === 'mc-radio'
              ? input.value
              : (input as HTMLInputElement & { cachedValue?: unknown }).cachedValue,
          );

          return stringifiedValue === stringifiedInputValue;
        }) !== undefined
      ) {
        input.checked = true;
        return true;
      }

      input.checked = false;
      return false;
    });
  }

  private getStringifiedValue(value: unknown): string {
    return value && (Array.isArray(value) || typeof value === 'object') ? JSON.stringify(value) : `${value}`;
  }

  private getValues(): unknown[] {
    if (typeof this.value === 'string') {
      return this.value.split(',');
    }

    if (Array.isArray(this.value)) {
      return this.value;
    }

    return [this.value];
  }

  private getSelectedValues(): string | string[] | undefined {
    if (this.inputs) {
      return (this.inputs[0] as Element).localName === 'mc-radio'
        ? this.inputs.find((input) => input.checked)?.value
        : this.inputs.reduce((values: string[], input) => (input.checked ? [input.value, ...values] : values), []);
    } else {
      return undefined;
    }
  }

  private inputsSlotIsReady = (): void => {
    const slottedNodes = this.pruneTextNodesFromSlottedElements();
    this.inputs = slottedNodes?.filter(
      (node) => node.nodeName !== '#text' && node.nodeName.toLowerCase() !== 'input',
    ) as HTMLInputElement[];

    if (!this.groupFirstUpdated && this.inputs && this.inputs.length > 0) {
      this.groupFirstUpdated = true;

      if (this.value) {
        this.setCheckedStatusBySuppliedValue();
      } else {
        this.value = this.getSelectedValues();
      }

      this.setTheNamePropertyFromSlottedComponents();
      this.addMirroredHiddenInput();
    }
  };

  private initializeElements(): void {
    this.inputsSlot = this.shadowRoot?.querySelector('slot:not([name])');
    this.inputsSlot?.addEventListener('slotchange', this.inputsSlotIsReady);
  }

  private setTheNamePropertyFromSlottedComponents(): void {
    if (this.inputs && this.inputs.length !== 0) {
      const firstSlottedInput = this.inputs[0];
      this.setAttribute('name', firstSlottedInput.getAttribute('name') || '');
    }
  }

  /**
   * Prunes the slotted nodes from the text nodes for the sake of SSR (VuePress),
   * as otherwise exceptions are being thrown in the console.
   */
  private pruneTextNodesFromSlottedElements(): Node[] | undefined {
    const slottedNodes = this.inputsSlot?.assignedElements();
    slottedNodes
      ?.filter((node: Element) => {
        return node.nodeName === '#text';
      })
      .forEach((node: Element) => node.remove());

    return slottedNodes;
  }
}
