// lit-elements
import { CSSResultArray, LitElement, PropertyValues, html, TemplateResult } from 'lit';
import { classMap, ClassInfo } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
// utils
import { FormField, setHostCssClass, DisabledState, MaskController, uuid } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
export { styles as inputStyles };
// types
import {
  IMcInput,
  InputMode,
  InputType,
  Max,
  Min,
  Prefix,
  Size,
  Step,
  Suffix,
  Variant,
  Fit,
  AffixType,
  LabelPosition,
  Mask,
} from './types';
// mds-components used with mc-input
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-label';

export type { IMcInput } from './types';

const ALLOWED_DATA_IDS = ['input', 'trailingIconButton', 'clearButton'];
/**
 * @element` mc-input`
 *
 * @event {InputEvent} input - Fired when the character is entered.
 * @event {FocusEvent} focus - Fired when mc-input is focused.
 * @event {FocusEvent} blur - Fired when mc-input is going out of focus.
 * @event {MouseEvent} click - Fired on mc-input click.
 * @event {KeyboardEvent} keydown - Fired when a key on keydown is pressed.
 * @event {CustomEvent} clearbuttonclick - Fires when the clear button is pressed.
 * @event {CustomEvent} trailingiconclick - Fires when the icon or trailing icon is clicked.
 *
 * @slot `label` - The label HTML to use for the mc-input.
 * @slot `hint` - The hint HTML to use for the mc-input.
 * @slot `errormessage` - The errormessage HTML to use for the mc-input.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `input` - for changing visuals of input field
 * @csspart `icon` - for changing visuals of icons
 */
export class McInput extends DisabledState(FormField(LitElement)) implements IMcInput {
  private readonly uniqueId = uuid();
  private root?: HTMLElement | null;
  private _valueAsNumber = NaN;

  @state()
  protected clearButtonEnabled = false;

  @state()
  protected inputField?: HTMLDivElement | null;

  protected handleInputClick?: () => void;

  protected get inputLabel(): string | Node {
    if (this.hiddenlabel) return '';
    return this.labelElements && this.labelElements.length > 0 ? this.labelElements[0].cloneNode(true) : this.label;
  }

  public get inputElement(): HTMLInputElement | null | undefined {
    return this.slottedInput && this.slottedInput.length > 0 ? this.slottedInput[0] : this.defaultInputElement;
  }

  @queryAssignedElements({ slot: 'input', flatten: true })
  public slottedInput?: HTMLInputElement[] | null;

  @query('.input')
  public defaultInputElement?: HTMLInputElement | null;

  @queryAssignedElements({ slot: 'label', flatten: true })
  protected labelElements?: Element[] | null;

  protected controlType = 'input';

  @state()
  public focused = false;

  @state()
  protected isInputFocused = false;

  @state()
  protected isClearButtonFocused = false;

  @state()
  protected isTrailingIconFocused = false;

  protected inputContainer?: HTMLInputElement | null;

  @property({ type: String })
  public autocapitalize = '';

  @property({ type: String })
  public autocomplete = '';

  @property({ type: Boolean, reflect: true })
  public autofocus = false;

  @property({ type: Boolean, reflect: true })
  public clearbutton = false;

  @property({ type: String })
  public errormessage = '';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public hint = '';

  @property({ type: String })
  public icon = '';

  @property({ type: String, reflect: true })
  public id = '';

  protected get inputId(): string {
    return `mc-input-${this.id ? this.id : this.uniqueId}`;
  }

  @property({ type: String })
  public inputmode?: InputMode;

  @property({ type: Boolean, reflect: true })
  public invalid = false;

  @property({ type: Boolean })
  public keepclearbuttonvisible = false;

  @property({ type: String })
  public label = 'Label';

  @property({ type: String })
  public labelposition: LabelPosition = 'top';

  @property({ type: Boolean, reflect: true })
  public loading = false;

  @property({ type: String })
  public max?: Max;

  @property({ type: Number })
  public maxlength = -1;

  @property({ type: String })
  public min?: Min;

  @property({ type: Number })
  public minlength = -1;

  @property({ type: String, reflect: true })
  public name = '';

  @property({ type: String })
  public pattern = '';

  @property({ type: String })
  public placeholder = '';

  @property({ type: String })
  public prefix: Prefix = null;

  @property({ type: Boolean, reflect: true })
  public readonly = false;

  @property({ type: Boolean })
  public required?: boolean;

  @property({ type: Number })
  public size: Size = null;

  @property({ type: Number })
  public step?: Step;

  @property({ type: String })
  public suffix: Suffix = null;

  @property({ type: String })
  public type: InputType = 'text';

  @property({ type: String })
  public trailingicon = '';

  @property({ type: Boolean })
  public clickabletrailingicon = false;

  @property({ type: String })
  public trailingiconlabel: string | undefined = undefined;

  @property({ type: String, reflect: true })
  // TDOD: Fix any type, i.e. use generic type like the mc-select's base
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public value: any = '';

  @property({ type: Number })
  public get valueAsNumber(): number {
    return this._valueAsNumber;
  }

  @property({ type: String })
  public variant: Variant = 'default';

  @property({ type: String })
  public width = 'auto';

  @property({ type: String })
  public mask: Mask | string | undefined = undefined;

  protected maskController: MaskController | undefined = undefined;

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  public constructor() {
    super();
  }

  protected calculateClasses(): ClassInfo {
    return {
      date: this.type === 'date',
      disabled: this.disabled,
      prefix: !!(this.icon || this.prefix),
      suffix: this.trailingicon || this.suffix || this.loading || this.clearbutton,
      vanity: this.variant === 'vanity',
      [`${this.fit}`]: true,
      [`${this.labelposition}`]: true,
    };
  }

  /* render methods */
  public render(): TemplateResult {
    const classes = this.calculateClasses();
    return html` <div data-cy="mc-input-container" class="mc-input ${classMap(classes)}">
      ${this.renderLabel()}
      <div class="container">
        <div class="inner">${this.renderPrefixElement()} ${this.renderField()} ${this.renderSuffixElement()}</div>
        ${this.renderError()} ${this.renderHint()}
      </div>
    </div>`;
  }

  protected renderField(): TemplateResult {
    const classes = {
      focused: this.isInputFocused,
      disabled: this.disabled,
      [`${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}`]: true,
    };
    return html`<div
      data-id="field"
      id="field"
      part="field"
      class="field ${classMap(classes)}"
      style="${this.width === 'auto' ? '' : `width:${this.width}%`}"
      tabindex="-1"
      @focusin="${this.onFieldFocus}"
      @focusout="${this.onFieldBlur}"
    >
      ${this.renderPrefix()} ${this.renderInput()} ${this.renderClearButton()} ${this.renderSuffix()}
    </div>`;
  }

  protected renderSuffixElement(): TemplateResult | null {
    return null;
  }

  protected renderPrefixElement(): TemplateResult | null {
    return null;
  }

  protected renderLabel(): TemplateResult {
    return html`<label class="${this.hiddenlabel ? 'hiddenlabel' : ''}" part="label-container" for=${this.inputId}
      ><mc-label
        exportparts="label"
        id="label"
        .label=${this.label}
        .fit=${this.fit}
        ?hiddenlabel=${this.hiddenlabel}
        .labelposition=${this.labelposition}
        @click=${(e: PointerEvent): void => e.stopPropagation()}
        ><slot name="label">${this.label}</slot></mc-label
      ></label
    >`;
  }

  protected renderError(): TemplateResult {
    return html`<mc-error id="invalid" .errormessage=${this.errormessage} .fit=${this.fit} ?invalid=${this.invalid}
      ><slot name="errormessage">${this.errormessage}</slot></mc-error
    >`;
  }

  protected renderHint(): TemplateResult {
    return html`<mc-hint id="hint" .hint=${this.hint} .fit=${this.fit}><slot name="hint">${this.hint}</slot></mc-hint>`;
  }

  protected renderInput(): TemplateResult {
    const minOrUndef = this.minlength === -1 ? undefined : this.minlength;
    const maxOrUndef = this.maxlength === -1 ? undefined : this.maxlength;
    const autocompleteOrUndef = this.autocomplete ? (this.autocomplete as 'off' | 'on') : undefined;
    const autocapitalizeOrUndef = this.autocapitalize
      ? (this.autocapitalize as 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters')
      : undefined;

    return html`<div class="input-container">
      ${this.renderSelectedOptionLabel()}
      <slot name="input" @click="${this.handleInputClick ?? this.handleInputClick}" @input="${this.handleInputChange}">
        <input
          part="input"
          aria-labelledby="label"
          aria-describedby="hint"
          class="input ${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}"
          type="${!this.type ? 'text' : this.type}"
          .value="${this.mask ? this.maskController?.maskedValue || '' : (live(this.value) as unknown as string)}"
          data-cy="input"
          ?autofocus="${this.autofocus}"
          ?disabled="${this.disabled}"
          data-id="input"
          id="${this.inputId}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readonly}"
          ?invalid="${this.invalid}"
          aria-invalid="${ifDefined(this.invalid ? this.invalid : undefined)}"
          minlength="${ifDefined(minOrUndef)}"
          maxlength="${ifDefined(maxOrUndef)}"
          pattern="${ifDefined(this.pattern ? this.pattern : undefined)}"
          min="${ifDefined(this.min === '' ? undefined : (this.min as number))}"
          max="${ifDefined(this.max === '' ? undefined : (this.max as number))}"
          step="${ifDefined(this.step ? +this.step : undefined)}"
          size="${ifDefined(this.size === null ? undefined : this.size)}"
          name="${ifDefined(this.name === '' ? undefined : this.name)}"
          inputmode="${ifDefined(this.inputmode)}"
          autocomplete="${ifDefined(autocompleteOrUndef)}"
          autocapitalize="${ifDefined(autocapitalizeOrUndef)}"
        />
      </slot>
    </div>`;
  }

  protected renderAffix(content: string, affixType: AffixType): TemplateResult | string {
    return content !== '' ? html`<span class="affix type-${affixType}" @click=${this.focus}> ${content}</span>` : '';
  }

  protected renderPrefix(): TemplateResult | string {
    /* rule render order: render prefix, render icon left */
    if (this.prefix) {
      return this.renderAffix(this.prefix, 'prefix');
    }
    if (this.icon) {
      return this.renderIcon('prefix', this.icon);
    }
    return '';
  }

  protected renderSuffix(): TemplateResult | string | null {
    /* rule render order: loading, clear button, suffix, icon right */
    if (this.loading) {
      return this.renderLoadingIndicator();
    }

    if (this.suffix) {
      return this.renderAffix(this.suffix, 'suffix');
    }
    if (this.trailingicon) {
      return this.renderIcon('suffix', this.trailingicon);
    }
    return '';
  }

  protected renderLoadingIndicator(): TemplateResult | null {
    return this.loading
      ? html`<mc-loading-indicator
          class="affix type-suffix"
          .fit="${this.fit}"
          .label="${this.label} in progress"
          hiddenlabel
        ></mc-loading-indicator>`
      : null;
  }

  protected renderClearButton(): TemplateResult | null {
    const shouldRender = this.clearbutton && this.clearButtonEnabled && this.value?.length > 0;
    return shouldRender
      ? html`<mc-button
          id="clearButton"
          data-id="clearButton"
          data-cy="clearButton"
          class="affix type-suffix clear"
          label="Clear"
          fit="${this.fit}"
          appearance="neutral"
          variant="plain"
          padding="compact"
          border="none"
          icon="times"
          hiddenlabel
          tabindex="0"
          @click="${this.onClearButtonClick}"
          @mousedown="${this.onClearButtonMouseDown}"
          @keydown="${this.onClearButtonKeyDown}"
          @focus="${this.onClearButtonFocus}"
          @blur="${this.onClearButtonBlur}"
        ></mc-button>`
      : null;
  }

  protected renderIcon(affixType: AffixType, icon: string): TemplateResult | string {
    if (icon !== '') {
      if (this.clickabletrailingicon && affixType === 'suffix') {
        return html`<mc-button
          id="iconButton"
          data-id="trailingIconButton"
          data-cy="trailingIconButton"
          class="affix type-suffix iconbutton"
          .label="${this.trailingiconlabel}"
          .title="${this.trailingiconlabel}"
          fit="${this.fit}"
          appearance="neutral"
          variant="plain"
          padding="compact"
          border="none"
          icon=${icon}
          hiddenlabel
          @click=${this.onTrailingIconClick}
          @focus=${this.onTrailingIconFocus}
          @blur=${this.onTrailingIconBlur}
        ></mc-button>`;
      }
      return html`<mc-icon
        exportparts="icon"
        class="affix type-${affixType}"
        icon=${icon}
        size=${this.fit === 'large' ? '24' : '20'}
        tabindex="-1"
        @blur=${this.preventBlurOnIconPress}
      ></mc-icon>`;
    }
    return '';
  }

  public renderSelectedOptionLabel(): TemplateResult<1> {
    return html``;
  }

  private preventBlurOnIconPress(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // field container
  private onFieldFocus(event): void {
    const target = event.target as Element;
    const targetDataId = target?.getAttribute('data-id');
    const relatedTarget = event.relatedTarget as Element;
    const relatedTargetDataId = relatedTarget?.getAttribute('data-id');
    if (
      target &&
      targetDataId === 'input' &&
      (relatedTarget === null || (relatedTarget && !ALLOWED_DATA_IDS.includes(relatedTargetDataId)))
    ) {
      this.isInputFocused = true;
      this.clearButtonEnabled = this.clearbutton;
      this.focus();
    }
  }

  private onFieldBlur(event): void {
    const target = event.target as Element;
    const targetDataId = target?.getAttribute('data-id');
    const relatedTarget = event.relatedTarget as Element;
    const relatedTargetDataId = relatedTarget?.getAttribute('data-id');

    if (relatedTarget && relatedTargetDataId === 'field' && target && ALLOWED_DATA_IDS.includes(targetDataId)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    } else if ((relatedTarget && !ALLOWED_DATA_IDS.includes(relatedTargetDataId)) || relatedTarget === null) {
      this.clearButtonEnabled = this.keepclearbuttonvisible ? true : false;
      return;
    }
  }

  // clear button events
  protected toggleClearButton(show?: boolean): void {
    if (!this.loading && this.clearbutton) {
      // show clear button always when keepclearbuttonvisible and value is not empty, unless it's loading
      if (this.keepclearbuttonvisible && this.value) {
        this.clearButtonEnabled = true;
      } else {
        // show only when value in not empty
        if (show) {
          if (!this.value) {
            this.clearButtonEnabled = false;
          } else {
            this.clearButtonEnabled = true;
          }
        } else {
          this.clearButtonEnabled = false;
        }
      }
    } else {
      this.clearButtonEnabled = false;
    }
  }

  protected onClearButtonClick(event: MouseEvent | KeyboardEvent): void {
    event.stopPropagation();

    if (this.inputElement) {
      this.inputElement.value = '';
      // needed as there's a latency while the clear button fades out
      setTimeout(() => this.focus(), 0);
      this.isInputFocused = true;
    }
    this.handleInputChange();
    this.dispatchEvent(new InputEvent('input'));
    this.dispatchEvent(new CustomEvent('clearbuttonclick'));
  }

  protected onClearButtonMouseDown(event: MouseEvent): void {
    event.stopPropagation();
  }

  protected onClearButtonKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.onClearButtonClick(event);
    }
  }

  private onClearButtonFocus(): void {
    this.isClearButtonFocused = true;
    this.clearButtonEnabled = this.clearbutton;
  }

  private onClearButtonBlur(): void {
    this.isClearButtonFocused = false;
    this.clearButtonEnabled = this.clearbutton;
  }

  // icon events
  private onTrailingIconClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('trailingiconclick'));
  }

  private onTrailingIconFocus(): void {
    this.isTrailingIconFocused = true;
    this.clearButtonEnabled = this.clearbutton;
  }

  private onTrailingIconBlur(): void {
    this.isTrailingIconFocused = false;
    this.clearButtonEnabled = this.clearbutton;
  }
  /* lifecycle methods */
  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    this.inputField = null;
    this.root = null;
    this.inputContainer = null;
    super.disconnectedCallback();
  }

  public async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(changedProperties);
    await this.updateComplete;

    this.initializeElements();

    if (this.mask) {
      this.initializeMaskController();
    }
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (
      changedProperties.has('keepclearbuttonvisible') ||
      changedProperties.has('clearbutton') ||
      changedProperties.has('loading') ||
      changedProperties.has('value')
    ) {
      this.toggleClearButton(true);
    }

    if (changedProperties.has('value')) {
      if (this.mask && this.maskController && this.maskController.mask) {
        this.maskController.mask.typedValue = this.value;
      }
    }

    if (changedProperties.has('mask')) {
      if (this.mask) {
        if (!this.maskController) {
          this.initializeMaskController();
        }
        this.maskController?.updateOptions(this.mask);
      }
      if (this.maskController && !this.mask) {
        this.maskController.destroyMask();
      }
    }
  }

  protected initializeMaskController(): void {
    if (this.mask && this.inputElement) {
      this.maskController = new MaskController(this, this.mask, this.inputElement);
      this.maskController.onAccept(() => {
        this.value = this.maskController?.unmaskedValue;
      });
    }
  }

  /* event handlers */
  /**
   * Sets focus to the mc-input.
   */
  public focus(): void {
    if (this.inputElement === this.defaultInputElement) {
      this.inputElement?.focus();
      this.isInputFocused = true;
    }
  }

  protected onInputFocus(): void {
    this.focused = true;
    this.isInputFocused = true;
  }
  /**
   * Sets focus out of the mc-input.
   */
  public blur(): void {
    if (this.inputElement === this.defaultInputElement) {
      this.isInputFocused = false;
      this.inputElement?.blur();
    }
  }

  protected onInputBlur(): void {
    this.isInputFocused = false;
    this.focused = false;
  }

  protected select(): void {
    this.inputElement?.select();
  }

  /**
   * Clicks the mc-input.
   */
  public click(): void {
    if (this.root) {
      this.root.focus();
      this.root.click();
      return;
    }
    super.click();
  }

  protected handleInputChange(): void {
    if (!this.mask) {
      this.value = this.inputElement?.value;
    }
    this._valueAsNumber = this.inputElement?.valueAsNumber ?? NaN;
  }

  /* selector methods */
  protected initializeElements(): void {
    this.inputElement.addEventListener('focus', this.onInputFocus.bind(this));
    this.inputElement.addEventListener('blur', this.onInputBlur.bind(this));
    this.inputField = this.shadowRoot?.querySelector('.field');
    this.root = this.shadowRoot?.querySelector('.container');
    this.inputContainer = this.shadowRoot?.querySelector('.mc-input');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-input': McInput;
  }
}

customElements.get('mc-input') || customElements.define('mc-input', McInput);
