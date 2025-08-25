// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import dayjs from 'dayjs';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcCalendarMonthYearPicker, MonthYearPickerValue } from './types';
import type { McButton } from '@maersk-global/mds-components-core-button';
import type { McMonthYearPicker } from '@maersk-global/mds-components-core-month-year-picker';
import type { Dayjs } from 'dayjs';
//components
import '@maersk-global/mds-components-core-month-year-picker';

export class McCalendarMonthYearPicker extends LitElement implements IMcCalendarMonthYearPicker {
  @state()
  private internalValue: MonthYearPickerValue = { month: null, year: null };

  @property({ type: Object })
  public value: MonthYearPickerValue = { month: null, year: null };

  @property({ type: String })
  public min?: Dayjs | string | null;

  @property({ type: String })
  public max?: Dayjs | string | null;

  @property({ type: String })
  public locale = 'en-GB';

  @property({ type: Number })
  public yearcap = 20;

  //used only for testing
  @property({ type: Boolean })
  public open = false;

  @query('.mc-calendar-month-year-picker')
  protected rootContainer?: HTMLElement;

  @query('mc-month-year-picker')
  protected monthYearPicker?: McMonthYearPicker;

  @query('#confirm-button')
  protected confirmButton?: McButton;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    return html`<div data-cy="month-year-picker" class="mc-calendar-month-year-picker" @keydown="${this.handleKeyDown}">
      <mc-month-year-picker
        fullwidth
        nopadding
        .min="${{ month: this.min ? dayjs(this.min)?.month() : null, year: this.min ? dayjs(this.min)?.year() : null }}"
        .max="${{ month: this.max ? dayjs(this.max)?.month() : null, year: this.max ? dayjs(this.max)?.year() : null }}"
        .value="${this.internalValue}"
        .locale="${this.locale}"
        .yearcap="${this.yearcap}"
        @monthyearselected="${this.handleMonthYearSelected}"
        preventinitialeventdispatch
      ></mc-month-year-picker>
    </div>`;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.internalValue = this.value;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    if (this.open) {
      super.updateComplete.then(() => {
        this.monthYearPicker?.show();
      });
    }

    setTimeout(() => {
      this.rootContainer?.classList.add('fade-in');
      this.monthYearPicker?.focus();
    }, 0);
  }

  public disconnectedCallback(): void {
    this.monthYearPicker?.hide();
    this.rootContainer?.classList.remove('fade-in');
    this.rootContainer?.classList.add('fade-out');
    this.dispatchEvent(new CustomEvent('closed', { detail: { value: this.internalValue } }));
    super.disconnectedCallback();
  }

  private handleMonthYearSelected(e: CustomEvent): void {
    this.internalValue = e.detail.value;
    this.dispatchEvent(new CustomEvent('monthyearselected', { detail: { value: e.detail.value } }));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      if (this.shadowRoot && this.shadowRoot.activeElement === this.monthYearPicker) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('focusout'));
      }
    }
  }
}
customElements.get('mc-calendar-month-year-picker') ||
  customElements.define('mc-calendar-month-year-picker', McCalendarMonthYearPicker);
