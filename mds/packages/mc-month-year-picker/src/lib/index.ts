// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcMonthYearPicker, Fit, MonthYearPickerValue, Month, Year, IMcMonthYearSelectedDetail } from './types';
import type { McPicker } from '@maersk-global/mds-components-core-picker';
// mds-components used with mc-month-year-picker
import '@maersk-global/mds-components-core-picker';
import '@maersk-global/mds-components-core-picker-item';

export type { IMcMonthYearSelectedDetail } from './types';

/**
 * @element `mc-month-year-picker`
 *
 * @event {CustomEvent<IMcMonthYearSelectedDetail>} monthyearselected - Emitted when the year and month are selected.
 */

export class McMonthYearPicker extends LitElement implements IMcMonthYearPicker {
  @state()
  private months: Map<number, Month> = new Map();

  @state()
  private years: Year[] = [];

  @state()
  private month?: string;

  @state()
  private year?: number;

  @property({ type: Object })
  public value?: MonthYearPickerValue = { month: null, year: null };

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public preventinitialeventdispatch = false;

  @property({ type: Object })
  public min?: MonthYearPickerValue = { month: null, year: null };

  @property({ type: Object })
  public max?: MonthYearPickerValue = { month: null, year: null };

  @property({ type: String })
  public locale = 'en-GB';

  @property({ type: Number })
  public yearcap = 10;

  @query('.month')
  private monthPicker?: McPicker;

  @query('.year')
  private yearPicker?: McPicker;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
    };
    return html`<div class="mc-month-year-picker ${classMap(classes)}" @keydown="${this.handleKeyDown}">
      <mc-picker
        data-cy="month"
        class="month"
        aria-label="Choose a month"
        .fit="${this.fit}"
        .value="${this.month}"
        @pickerselected="${this.handleMonthChange}"
        ?preventinitialeventdispatch="${this.preventinitialeventdispatch}"
      >
        ${repeat(
          Array.from(this.months.values()),
          (month) => month.number,
          (month) => html`<mc-picker-item
            .disabled="${month.disabled}"
            .value="${month.name}"
            .label="${month.name}"
          ></mc-picker-item>`
        )}
      </mc-picker>

      <mc-picker
        data-cy="year"
        class="year"
        aria-label="Choose a year"
        .fit="${this.fit}"
        .value="${this.year}"
        @pickerselected="${this.handleYearChange}"
        ?preventinitialeventdispatch="${this.preventinitialeventdispatch}"
      >
        ${repeat(
          this.years,
          (year) => year.number,
          (year) =>
            html`
              <mc-picker-item
                .disabled="${year.disabled}"
                .value="${year.number}"
                .label="${year.number.toString()}"
              ></mc-picker-item>
            `
        )}
      </mc-picker>
    </div>`;
  }

  public constructor() {
    super();
    this.locale = this.locale ? this.locale : new Intl.DateTimeFormat().resolvedOptions().locale || 'en-GB';
    this.months = this.getMonths();
    this.years = this.getYears(+this.yearcap);
    const today = new Date();
    this.month = this.getInitialMonth(today);
    this.year = today.getFullYear();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('yearcap')) {
      this.years = this.getYears(+this.yearcap);
    }

    if (changedProperties.has('min') || changedProperties.has('max')) {
      this.months = this.getMonths();
      this.years = this.getYears(+this.yearcap);
    }

    if (changedProperties.has('value')) {
      if (this.value?.month === null || !this.value?.year) {
        return;
      }

      const { month, year } = this.value;
      setTimeout(() => {
        this.setMonthYear({ month, year });
      }, 0);
    }
  }

  public focus(): void {
    this.monthPicker?.focusWith(false);
  }

  public show(): void {
    if (this.monthPicker && this.yearPicker) {
      this.monthPicker.value = this.month;
      this.yearPicker.value = this.year;
      this.monthPicker.show();
      this.yearPicker.show();
    }
  }

  public hide(): void {
    this.monthPicker?.hide();
    this.yearPicker?.hide();
  }

  private handleMonthChange(event: CustomEvent): void {
    const month = event.detail.item.value;
    this.handleMonthYearChange(month, this.year);
  }

  private handleYearChange(event: CustomEvent): void {
    const year = event.detail.item.value;
    this.handleMonthYearChange(this.month, year);
  }

  private handleMonthYearChange(month: string | undefined, year: number | undefined): void {
    const newValue: MonthYearPickerValue | undefined = { month, year };
    if (this.value?.month === newValue.month && this.value?.year === newValue.year) {
      return;
    }

    this.value = newValue;

    let valueToDispatch: MonthYearPickerValue = newValue;
    if (typeof valueToDispatch.month === 'string') {
      this.months.forEach((month) => {
        if (month.name === valueToDispatch.month) {
          valueToDispatch = {
            ...valueToDispatch,
            month: month.number,
          };
        }
      });
    }

    this.dispatchEvent(
      new CustomEvent<IMcMonthYearSelectedDetail>('monthyearselected', { detail: { value: valueToDispatch } })
    );
  }

  private setMonthYear({
    month,
    year,
  }: {
    month: string | number | undefined;
    year: string | number | undefined;
  }): void {
    if ((!month && month !== 0) || !year) {
      return;
    }
    this.months = this.getMonths();

    let newMonth: string | undefined = '';
    if (typeof month === 'number') {
      newMonth = this.getMonthFromNumber(month);
    } else {
      newMonth = month;
    }
    const currentMonth = Array.from(this.months.values()).find((m) => m.name === newMonth);
    if (currentMonth?.disabled) {
      newMonth = Array.from(this.months.values()).find((m) => !m.disabled)?.name;
    }
    this.month = newMonth;
    this.year = +year;
    this.show();
  }

  private getMonths(): Map<number, Month> {
    const formatter = new Intl.DateTimeFormat(this.locale, { month: 'long' });
    const currentYear = new Date().getFullYear();

    const months = new Map<number, Month>();
    Array.from({ length: 12 }, (_, i) => {
      const month = {
        name: formatter.format(new Date(currentYear, i, 1)),
        number: i,
        disabled: this.isMonthDisabled(i),
      };
      months.set(i, month);
    });

    return months;
  }

  private getYears(cap = +this.yearcap): Year[] {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - cap;
    const endYear = currentYear + cap;
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      return {
        number: startYear + i,
        disabled: this.isYearDisabled(startYear + i),
      };
    });
  }

  private getInitialMonth(today: Date): string | undefined {
    return this.months.get(today.getMonth())?.name;
  }

  private getMonthFromNumber(month: number): string | undefined {
    if (month > 11 || month < 0) {
      //if month is out of range, default to current month
      const currentMonth = this.months.get(new Date().getMonth());
      return currentMonth?.name;
    } else {
      const currentMonth = this.months.get(month);
      return currentMonth?.name;
    }
  }

  private isMonthDisabled(month: number): boolean {
    if (!this.min?.month && !this.max?.month) {
      return false;
    }

    let minMonth;
    if (this.min?.month && this.min?.year && this.value?.year) {
      minMonth = this.value.year > this.min?.year ? -1 : this.getMinMaxMonthNumber(this.min.month);
    } else if (this.min?.month && !this.min?.year) {
      minMonth = this.getMinMaxMonthNumber(this.min.month);
    } else {
      minMonth = -1;
    }

    let maxMonth;
    if (this.max?.month && this.max?.year && this.value?.year) {
      maxMonth = this.value.year < this.max.year ? 9999 : this.getMinMaxMonthNumber(this.max.month);
    } else if (this.max?.month && !this.max?.year) {
      maxMonth = this.getMinMaxMonthNumber(this.max.month);
    } else {
      maxMonth = 9999;
    }
    return month < minMonth || month > maxMonth;
  }

  private getMinMaxMonthNumber(month: string | number): number {
    if (typeof month === 'string') {
      const currentMonth = Array.from(this.months.values()).find((m) => m.name === month);
      return currentMonth ? currentMonth.number : 0;
    }

    return month;
  }

  private isYearDisabled(year: number): boolean {
    if (!this.min?.year && !this.max?.year) {
      return false;
    }

    const minYear = this.min?.year || -1;
    const maxYear = this.max?.year || 9999;

    return year < minYear || year > maxYear;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    event.preventDefault();

    if (event.key === 'ArrowLeft') {
      this.monthPicker?.focusWith();
    }

    if (event.key === 'ArrowRight') {
      this.yearPicker?.focusWith();
    }
  }
}
customElements.get('mc-month-year-picker') || customElements.define('mc-month-year-picker', McMonthYearPicker);
