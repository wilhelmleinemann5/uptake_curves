// lit-elements
import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
// dayjs
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import objectSupport from 'dayjs/plugin/objectSupport.js';
// styles
import { styles } from './styles/index.styles';
// types
import { INPUT_DATE_DEFAULTS, IMcInputDate } from './types';
import { CellCustomizationPayload, Position } from '@maersk-global/mds-shared-types';
import { MaskController, Responsive } from '@maersk-global/mds-components-utils';
// mds-components used with mc-input-date
import '@maersk-global/mds-components-core-calendar';
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-drawer';
import { McPopover } from '@maersk-global/mds-components-core-popover';
import { McInput } from '@maersk-global/mds-components-core-input';
import { McCalendar } from '@maersk-global/mds-components-core-calendar';
import { McDrawer } from '@maersk-global/mds-components-core-drawer';

export { INPUT_DATE_DEFAULTS } from './types';
export type { IMcInputDate } from './types';

/**
 * @element` mc-input-date`
 * @extends McInput
 *
 * @event {InputEvent} input - Fired when the character is entered.
 * @event {CustomEvent<string>} inputdateselected - Fired only when date is selected in the calendar.
 * @event {FocusEvent} focus - Fired when mc-input-date is focused.
 * @event {FocusEvent} blur - Fired when mc-input-date is going out of focus.
 * @event {MouseEvent} click - Fired on mc-input-date click.
 * @event {KeyboardEvent} keydown - Fired when a key on keydown is pressed.
 * @event {CustomEvent} clearbuttonclick - Fires when the clear button is pressed.
 *
 * @slot `label` - The label HTML to use for the mc-input-date.
 * @slot `hint` - The hint HTML to use for the mc-input-date.
 * @slot `errormessage` - The errormessage HTML to use for the mc-input-date.
 * @slot `footer` - Calendar footer slot.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `input` - for changing visuals of input field
 * @csspart `icon` - for changing visuals of icons
 */

export class McInputDate extends Responsive(McInput) implements IMcInputDate {
  private readonly internals: ElementInternals = this.attachInternals();

  @state()
  private selectedDate: Dayjs | null = null;

  public static get formAssociated() {
    return true;
  }

  public get validity(): ValidityState {
    return this.internals.validity;
  }

  @property({ type: String })
  public activedate: string | null = null;

  @property({ type: Array, reflect: true })
  public customize?: CellCustomizationPayload[];

  @property({ type: String })
  public customstyles?: string;

  @property({ type: String })
  public format = INPUT_DATE_DEFAULTS.format;

  @property({ type: String })
  public locale = INPUT_DATE_DEFAULTS.locale;

  @property({ type: String })
  public nextlabel = INPUT_DATE_DEFAULTS.nextLabel;

  @property({ type: String })
  public dayperiod: 'long' | 'short' | 'narrow' = 'short';

  @property({ type: String })
  public override placeholder = '';

  @property({ type: String })
  public calendarposition: Position = INPUT_DATE_DEFAULTS.calendarPosition;

  @property({ type: Boolean })
  public open?: boolean;

  @property({ type: String })
  public previouslabel = INPUT_DATE_DEFAULTS.previouslabel;

  @property({ type: Number })
  public startofweek = INPUT_DATE_DEFAULTS.startOfWeek;

  @property({ type: Boolean, reflect: true })
  public showadjacentmonthdays = false;

  @property({ type: Boolean })
  public showweeknumbers = false;

  @property({ type: Boolean })
  public usemask = false;

  @property({ type: Number })
  public yearcap = INPUT_DATE_DEFAULTS.yearCap;

  @query('mc-calendar')
  private mcCalendar?: McCalendar;

  @query('mc-popover')
  private mcPopover?: McPopover;

  @query('mc-drawer')
  private mcDrawer?: McDrawer;

  public constructor() {
    super();
    dayjs.extend(objectSupport);
    dayjs.extend(customParseFormat);
  }

  /* styles */
  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  public render(): TemplateResult {
    const classes = { ...this.calculateClasses(), open: !!this.open };
    const isSmallScreen = this.viewport === 'x-small';

    return html`
      ${isSmallScreen ? this.renderDrawer() : null}
      <div data-cy="mc-input-container" class="mc-input mc-select ${classMap(classes)}" @keydown=${this.handleKeyDown}>
        ${super.render()} ${!isSmallScreen ? this.renderPopover() : null}
      </div>
    `;
  }

  private renderDrawer(): TemplateResult {
    return html`
      <mc-drawer
        class="calendar-drawer"
        position="bottom"
        customsize="85svh"
        @opened=${this.onCalendarShown}
        @closed=${() => this.onCalendarHidden('drawer')}
      >
        <span slot="heading">${this.inputLabel}</span>
        ${this.renderCalendar()}
      </mc-drawer>
    `;
  }

  private renderPopover(): TemplateResult {
    return html`
      <mc-popover
        class="calendar-popover"
        .customtriggerelement="${this.inputField}"
        trigger="click"
        .fit="${this.fit}"
        .position="${this.calendarposition}"
        preventcloseonblur
        @show=${this.onCalendarShown}
        @hide=${() => this.onCalendarHidden('popover')}
      >
        ${this.renderCalendar()}
      </mc-popover>
    `;
  }

  protected renderCalendar(): TemplateResult | undefined {
    if (this.open) {
      const calendarClasses = {
        'mc-calendar--hidden': this.type === 'date' || this.readonly,
      };
      return html` <mc-calendar
        .activedate=${this.activedate}
        .customize="${this.customize}"
        .customstyles="${this.customstyles}"
        .nextlabel="${this.nextlabel}"
        .previouslabel="${this.previouslabel}"
        .startofweek="${this.startofweek}"
        .yearcap="${this.yearcap}"
        .value="${this.selectedDate ? this.selectedDate.toDate().toDateString() : ''}"
        .format="${this.format}"
        @dateselected="${this.onDateSelected}"
        @keydown=${this.handleCalendarKeyDown}
        class="${classMap(calendarClasses)}"
        .locale="${this.locale}"
        .dayperiod="${this.dayperiod}"
        max="${ifDefined(this.max === null ? undefined : this.max)}"
        min="${ifDefined(this.min === null ? undefined : this.min)}"
        noborder
        noshadow
        ?showweeknumbers="${this.showweeknumbers}"
        ?showadjacentmonthdays=${this.showadjacentmonthdays}
        ><slot name="footer" slot="footer"></slot
      ></mc-calendar>`;
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.trailingicon = 'calendar';
    this.autocomplete = 'off';
    if (this.placeholder === '') {
      this.placeholder = this.format;
    }
  }

  public override async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    await super.firstUpdated(changedProperties);

    // Add click event for the input field
    if (this.inputElement) {
      this.inputElement.addEventListener('click', () => {
        this.handleInputInteraction();
      });
    }
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('value')) {
      this.setSelectedDate(this.value);
    }

    if (changedProperties.has('format')) {
      if (!this.usemask) {
        this.maxlength = this.format.length;
      } else {
        this.mask = this.getMaskFromFormat(this.format);
      }
    }

    if (changedProperties.has('usemask')) {
      if (!this.usemask) {
        this.mask = null;
        this.maskController?.mask.destroy();
      } else {
        this.mask = this.getMaskFromFormat(this.format);
        this.initializeMaskController();
      }
    }

    if (changedProperties.has('viewport')) {
      if (this.open) {
        const previousViewport = changedProperties.get('viewport');

        if (previousViewport === 'x-small' && this.viewport !== 'x-small') {
          if (this.mcDrawer?.open) {
            this.mcDrawer.open = false;
            this.open = true;

            this.updateComplete.then(() => {
              if (this.mcPopover) {
                this.mcPopover.show();
              }
            });
          }
        } else if (previousViewport !== 'x-small' && this.viewport === 'x-small') {
          if (this.mcPopover) {
            this.mcPopover.hide();
            this.open = true;

            this.updateComplete.then(() => {
              if (this.mcDrawer) {
                this.mcDrawer.open = true;
              }
            });
          }
        }
      }
    }
  }

  protected override initializeMaskController(): void {
    this.maskController = new MaskController(this, this.mask, this.inputElement);
    this.maskController.onAccept(() => {
      this.value = this.maskController?.maskedValue;
    });
  }

  private onCalendarShown(): void {
    this.open = true;
    if (this.viewport === 'x-small') {
      this.focusCalendar();
    }
  }

  private onCalendarHidden(source?: string): void {
    if (source === 'popover' && this.viewport === 'x-small') {
      return;
    }

    // When drawer is closed on small screens, ensure keyboard doesn't show
    if (source === 'drawer' && this.viewport === 'x-small') {
      // Blur the input to prevent keyboard focus
      requestAnimationFrame(() => {
        this.inputElement?.blur();
      });
    }

    this.open = false;
  }

  private handleInputInteraction(): void {
    const isSmallScreen = this.viewport === 'x-small';
    this.open = true;

    if (isSmallScreen) {
      if (this.mcDrawer) {
        this.mcDrawer.open = true;
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      this.focusCalendar();
    }

    if (event.key === 'Enter') {
      this.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, keyCode: event.keyCode }));
    }
  }

  private focusCalendar(): void {
    setTimeout(() => {
      this.mcCalendar?.focus();
    }, 0);
  }

  private handleCalendarKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.inputElement?.focus();
    }
  }

  /**
   * Handles `dateselected` event.
   * Sets the value to the selected date and closes the calendar.
   * @param {CustomEvent} event
   */
  private onDateSelected(event: CustomEvent): void {
    const date = dayjs(event.detail.date, this.format);
    const dateString = date.isValid() ? date.format(this.format) : '';
    this.value = dateString;
    this.selectedDate = date;
    this.validate();
    this.closeCalendar();

    if (this.viewport !== 'x-small') {
      this.inputElement?.focus();
    }

    this.dispatchEvent(new InputEvent('input'));
    this.dispatchEvent(new CustomEvent<string>('inputdateselected', { detail: dateString }));
  }

  /** Extends the McInput handleInputChange to assing selected date when user types it in  */
  protected override handleInputChange(): void {
    super.handleInputChange();
    this.setSelectedDate(this.value);
    this.validate();
  }

  private setSelectedDate(date: Dayjs | string | undefined | null): void {
    const newDate = dayjs(date, this.format);
    if (newDate.isValid()) {
      this.selectedDate = newDate;
    } else {
      this.selectedDate = null;
    }
  }

  private getMaskFromFormat(format: string): string {
    const exceptionTokens = ['MMM', 'MMMM', 'dd', 'ddd', 'dddd'];
    let result = '';
    let i = 0;

    while (i < format.length) {
      let replaced = false;

      // Check for exception tokens
      for (const token of exceptionTokens) {
        if (format.slice(i, i + token.length) === token) {
          result += 'a'.repeat(token.length);
          i += token.length;
          replaced = true;
          break;
        }
      }

      // If no exception token matched, replace letters with '0'
      if (!replaced) {
        const char = format[i];
        result += /[A-Za-z]/.test(char) ? '0' : char;
        i++;
      }
    }

    return result;
  }

  private closeCalendar(): void {
    const isSmallScreen = this.viewport === 'x-small';
    if (isSmallScreen) {
      if (this.mcDrawer) {
        this.mcDrawer.open = false;
      }
    } else {
      if (this.mcPopover) {
        this.mcPopover.hide();
      }
    }
  }

  private validate(): void {
    if (this.min || this.max) {
      const validityState = { ...this.validity };
      const date = dayjs(this.value, this.format);

      if (this.min) {
        const minDate = dayjs(this.min, this.format);
        validityState.rangeUnderflow = date.isBefore(minDate);
      }

      if (this.max) {
        const maxDate = dayjs(this.max, this.format);
        validityState.rangeOverflow = date.isAfter(maxDate);
      }

      this.internals.setValidity(validityState, 'invalid date', this.inputElement);
      this.invalid = !this.internals.checkValidity();
      this.selectedDate = this.internals.validity.valid ? date : null;
    }
  }
}

customElements.get('mc-input-date') || customElements.define('mc-input-date', McInputDate);

declare global {
  interface HTMLElementTagNameMap {
    'mc-input-date': McInputDate;
  }
}
