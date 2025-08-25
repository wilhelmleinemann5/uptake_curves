// lit-elements
import { CSSResultArray, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
// dayjs
import dayjs, { Dayjs } from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';
// styles
import { styles } from './styles/index.styles';
// types
import type {
  Weekday,
  IMcCalendar,
  CalendarCell,
  DateCustomizations,
  Week,
  IMcCalendarDateSelectedDetail,
} from './types';
import type {
  CellCustomizationPayload,
  DateRange,
  IndicatorAppearance,
  MonthYearPickerValue,
} from '@maersk-global/mds-shared-types';
import { McButton } from '@maersk-global/mds-components-core-button';
import type { McCalendarMonthYearPicker } from './components/mc-calendar-month-year-picker';
// mds-components used with mc-calendar
import './components/mc-calendar-month-year-picker';
import '@maersk-global/mds-components-core-button';

export type { IMcCalendar } from './types';

const DAYS_PER_WEEK = 7;
const INTERNAL_FORMAT = 'YYYY-MM-DD';

/**
 * @element `mc-calendar`
 *
 * @event {CustomEvent<IMcCalendarDateSelectedDetail>} dateselected - Fired when the date is selected.
 *
 * @slot `footer` - Footer slot.
 *
 * @csspart `calendar` - for changing visuals of the calendar.
 * @csspart `mc-button::part(button)` - used together with `customstyles` for changing visuals of button inside the calender
 */
export class McCalendar extends LitElement implements IMcCalendar {
  // public
  @property({ type: String })
  public set activedate(value: string | null) {
    const date = dayjs(value || this.value, this.format);
    this.activeDate = date.isValid() ? date : this.getEnabledFocusableDay();
  }

  public get activedate(): string | null {
    if (!this.activeDate) {
      return null;
    }

    const newDate = this.activeDate.hour(0).minute(0).second(0);
    return newDate.isValid() ? newDate.format(this.format || INTERNAL_FORMAT) : null;
  }

  @property({ type: String })
  public customstyles?: string;

  @property({ type: String })
  public format = INTERNAL_FORMAT;

  @property({ type: String })
  public locale = new Intl.NumberFormat().resolvedOptions().locale || 'en-GB';

  @property({ type: String })
  public nextlabel = 'Next month';

  @property({ type: String })
  public previouslabel = 'Previous month';

  @property({ type: String, reflect: true })
  public value = '';

  @property({ type: String })
  public dayperiod: 'long' | 'short' | 'narrow' = 'short';

  @property({ type: Boolean, reflect: true })
  public showadjacentmonthdays = false;

  @property({ type: Boolean, reflect: true })
  public showweeknumbers = false;

  @property({ type: Boolean })
  public noshadow = false;

  @property({ type: Boolean })
  public noborder = false;

  @property({ type: Number })
  public yearcap = 20;

  @property({ type: String })
  public get min(): Dayjs | string | null {
    return this._min;
  }
  public set min(date: Dayjs | string | null) {
    this.handleMinMaxSet(date, 'min');
  }

  @property({ type: String })
  public get max(): Dayjs | string | null {
    return this._max;
  }
  public set max(date: Dayjs | string | null) {
    this.handleMinMaxSet(date, 'max');
  }

  @property({ type: Array })
  public set customize(data: CellCustomizationPayload[] | undefined) {
    this._customize = Array.isArray(data) ? data : undefined;
    this.cachedWeeks.clear();
    this.computeCalendarViewValues();
  }

  public get customize(): CellCustomizationPayload[] | undefined {
    return this._customize;
  }

  @property({ type: Number })
  public set startofweek(day: number) {
    this.cachedWeekdays.clear();
    this.firstDayOfWeek = !isNaN(day) && day >= 0 && day < 7 ? day : 0;
  }

  // private
  private _customize?: CellCustomizationPayload[];
  private _max: Dayjs | string | null = null;
  private _min: Dayjs | string | null = null;

  @state()
  private hasFooterSlot = false;

  @state()
  private activeDate?: Dayjs =
    this.value && dayjs(this.value).isValid() ? dayjs(this.value) : this.getEnabledFocusableDay();

  private cachedWeekdays: Map<string, Weekday[]> = new Map();
  private cachedWeeks: Map<string, Week[]> = new Map();

  @state()
  private firstDayOfWeek = 1;
  private firstWeekOffset = 0;

  @state()
  private focusableDate?: Dayjs = this.getEnabledFocusableDay();

  @state()
  private periodButtonText = this.getPeriodTitle(this.activeDate);

  @state()
  private selectedDate: Dayjs | null = null;
  private todayValue: Dayjs = dayjs();

  @state()
  private weekdays: Weekday[] | undefined = [];

  @state()
  private showMonthYearPicker = false;

  @state()
  private weeks: Week[] | undefined = [];
  private eventReferences?: {
    onKeyUp?: (event: KeyboardEvent) => Promise<void>;
    onKeyDown?: (event: KeyboardEvent) => void;
  } = {};

  private get flattenedWeeks(): CalendarCell[] {
    if (!this.weeks?.length) {
      return [];
    }

    return this.weeks.reduce((flattenedWeeks, week) => [...flattenedWeeks, ...week.cells], [] as CalendarCell[]);
  }

  // protected
  @query('#previousButton')
  protected previousButtonElement?: McButton;

  @query('#nextButton')
  protected nextButtonElement?: McButton;

  @query('#month-year-picker')
  protected monthYearPicker?: McCalendarMonthYearPicker;

  @query('#current-period')
  protected currentPeriodElement?: McButton;

  public constructor() {
    super();
    dayjs.extend(objectSupport);
    dayjs.extend(isBetween);
    dayjs.extend(weekOfYear);
    dayjs.extend(isoWeek);
  }

  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render methods */
  public render(): TemplateResult {
    const classes = {
      'with-footer': this.hasFooterSlot,
      'with-week-numbers': this.showweeknumbers,
      'picker-open': this.showMonthYearPicker,
      'no-shadow': this.noshadow,
      'no-border': this.noborder,
      [`dayperiod-${this.dayperiod}`]: true,
    };
    return html`${this.renderTemplateStyles()}
      <div class="mc-calendar ${classMap(classes)}" part="calendar">${this.renderHeader()} ${this.renderBody()}</div> `;
  }

  public focus(): void {
    this.currentPeriodElement?.focus();
  }

  private renderTemplateStyles(): TemplateResult | undefined {
    if (this.customstyles) {
      return html`<style>
        ${this.customstyles}
      </style>`;
    }
  }

  /**
   * Renders calendar header
   * @returns {TemplateResult}
   */
  private renderHeader(): TemplateResult {
    return html` <div class="header">
      <mc-button
        .tabindex="${0}"
        appearance="neutral"
        variant="plain"
        class="current-period"
        id="current-period"
        data-cy="month-name"
        trailingicon="chevron-down"
        @click="${this.toggleMonthYearPicker}"
        disablediconslot
        disabledlabelslot
        label="${this.periodButtonText}"
        >${this.periodButtonText}
      </mc-button>
      <div class="navigation-buttons">
        <mc-button
          hiddenlabel
          id="previousButton"
          data-cy="previousButton"
          label="${this.previouslabel}"
          appearance="neutral"
          variant="plain"
          icon="chevron-left"
          @click="${this.previousClicked}"
          disablediconslot
          disabledlabelslot
        ></mc-button>
        <mc-button
          hiddenlabel
          id="nextButton"
          data-cy="nextButton"
          label="${this.nextlabel}"
          icon="chevron-right"
          appearance="neutral"
          variant="plain"
          disablediconslot
          disabledlabelslot
          @click="${this.nextClicked}"
        ></mc-button>
      </div>
    </div>`;
  }

  /**
   * Renders calendar body
   * @returns {TemplateResult}
   */
  private renderBody(): TemplateResult {
    return html` <div class="body">
      <div class="body-weekdays">
        ${this.renderWeekNumbersHeader()}
        ${this.weekdays?.map((day) => {
          const displayText = this.getWeekdayDisplayText(day);
          return html` <div data-cy="weekday" class="weekday" title="${day.long}">${displayText}</div>`;
        })}
      </div>
      <div class="body-days">${this.renderWeeks()}</div>
      <!-- render footer in body, so that it's easier to position the picker on top of it -->
      ${this.renderFooterSlot()}
      <div class="month-year-picker-container">${this.renderMonthYearPicker()}</div>
    </div>`;
  }

  private renderWeekNumbersHeader(): TemplateResult {
    return this.showweeknumbers ? html`<div data-cy="week-number-header" class="weekday"></div>` : html``;
  }

  private renderWeeks(): TemplateResult {
    if (this.showweeknumbers) {
      return html`
        ${this.weeks?.map(({ number, cells }, i) => {
          return html`
            ${this.renderWeekNumber(number, i)}
            ${cells.map((cell: CalendarCell) => {
              return html`${this.renderCell(cell)}`;
            })}
          `;
        })}
      `;
    } else {
      return html`
        ${this.weeks?.map(({ cells }) => {
          return html`
            ${cells.map((cell: CalendarCell) => {
              return html`${this.renderCell(cell)}`;
            })}
          `;
        })}
      `;
    }
  }

  private renderWeekNumber(number: number, index: number): TemplateResult {
    const classes = {
      'week-number': true,
      'week-number-first': index === 0,
      'week-number-last': (this.weeks && index === this.weeks?.length - 1) || false,
    };
    return html`<div data-cy="week-number" class="${classMap(classes)}">${number}</div>`;
  }

  /**
   * Renders calendar cell
   * @returns {TemplateResult}
   */
  protected renderCell(cell: CalendarCell): TemplateResult {
    const isSelected = this.isSelected(cell.compareValue);
    const isToday = this.isSameDate(this.todayValue, cell.compareValue);
    let classes = {
      today: isToday,
      'today-selected': !!(isToday && isSelected),
      'in-adjacent-month': cell.isInAdjacentMonth,
      'with-indicator': !!cell.indicatorStyle,
    };

    if (cell.customClasses?.length) {
      cell.customClasses.forEach((customClass) => (classes = { ...classes, [customClass]: true }));
    }

    let styles = {};
    if (cell.indicatorStyle) {
      styles = {
        '--indicator-color': isSelected ? 'transparent' : cell.indicatorStyle,
      };
    }
    const dataDate = dayjs(cell.compareValue).format(INTERNAL_FORMAT);
    return cell.isInAdjacentMonth && !this.showadjacentmonthdays
      ? html`<div></div>`
      : html`
          <mc-button
            class="${classMap(classes)}"
            label=${cell.displayValue}
            tabindex="${this.getTabIndex(cell)}"
            data-date="${dataDate}"
            fit="small"
            appearance="${isSelected ? 'primary' : 'neutral'}"
            variant="${isSelected ? 'filled' : 'plain'}"
            data-cy="${isSelected ? 'day-selected' : 'day'}"
            @click="${(): void => this.selectDate(cell.compareValue)}"
            ?disabled="${!cell.enabled}"
            style="${styleMap(styles)}"
            disablediconslot
            disabledlabelslot
          ></mc-button>
        `;
  }

  private renderFooterSlot(): TemplateResult {
    return html`<div class="footer"><slot @slotchange="${this.handleFooterSlotChange}" name="footer"></slot></div>`;
  }

  private renderMonthYearPicker(): TemplateResult | undefined {
    if (!this.showMonthYearPicker) {
      return;
    }

    return html`<mc-calendar-month-year-picker
      .locale="${this.locale}"
      .yearcap="${this.yearcap}"
      .max="${this.max}"
      .min="${this.min}"
      .value="${{ month: this.activeDate?.month(), year: this.activeDate?.year() } as MonthYearPickerValue}"
      @closed="${this.handleMonthYearClosed}"
      @focusout="${this.handleMonthYearPickerFocusout}"
      @monthyearselected="${this.handleMonthYearSelected}"
      id="month-year-picker"
    ></mc-calendar-month-year-picker>`;
  }

  /* lifecycle methods */
  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.get('activeDate') || changedProperties.get('firstDayOfWeek')) {
      this.computeCalendarViewValues();
    }
    if (changedProperties.get('locale') || changedProperties.get('dayperiod')) {
      this.cachedWeekdays.clear();
      this.computeCalendarViewValues();
    }

    if (changedProperties.has('value')) {
      if (!this.value) {
        this.selectedDate = null;
        return;
      }
      this.alignInternalDates(this.value);
      this.computeCalendarViewValues();
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.selectedDate = this.value ? dayjs(this.value) : null;
    this.activeDate = this.activeDate ?? dayjs();
    this.computeCalendarViewValues();
    if (this.eventReferences) {
      this.eventReferences.onKeyUp = this.onKeyUp.bind(this);
      this.eventReferences.onKeyDown = this.onKeyDown.bind(this);
    }

    this.addEventListeners();
  }

  public disconnectedCallback(): void {
    this.removeEventListeners();
    super.disconnectedCallback();
  }

  private addEventListeners(): void {
    if (this.eventReferences && this.eventReferences.onKeyUp && this.eventReferences.onKeyDown) {
      this.addEventListener('keyup', this.eventReferences.onKeyUp);
      this.addEventListener('keydown', this.eventReferences.onKeyDown);
    }
  }

  private removeEventListeners(): void {
    if (this.eventReferences && this.eventReferences.onKeyUp && this.eventReferences.onKeyDown) {
      this.removeEventListener('keyup', this.eventReferences?.onKeyUp);
      this.removeEventListener('keydown', this.eventReferences?.onKeyDown);
    }
  }

  /* handler methods */

  /**
   * Handles `keydown` event.
   * Makes sure the focus is trapped within the calendar when pressing `Tab`.
   * @param {KeyboardEvent} event
   */
  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (event.shiftKey) {
          if (this.shadowRoot?.activeElement === this.previousButtonElement) {
            this.focusNextEnabledButton(event, false);
            break;
          }
          if (this.shadowRoot?.activeElement === this.nextButtonElement && this.previousButtonElement?.disabled) {
            this.focusNextEnabledButton(event, false);
            break;
          }
          break;
        }

        if (this.shadowRoot?.activeElement?.getAttribute('data-date')) {
          this.focusNextEnabledButton(event);
          break;
        }
        break;
      }
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  /**
   * Focuses the next enabled button to trap focus.
   * @param {KeyboardEvent} event
   * @param {KeyboardEvent} first When true, will focus the first enabled button, last otherwise.
   */
  private focusNextEnabledButton(event: KeyboardEvent, first = true): void {
    event.preventDefault();
    const buttonNodes = this.shadowRoot?.querySelectorAll('mc-button') as NodeListOf<McButton>;
    const buttons = Array.from(buttonNodes) as McButton[];
    if (buttons) {
      const enabledButtons = Array.from(buttons).filter(
        (b: { disabled: boolean; getAttribute?: (name: string) => unknown }) =>
          !b.disabled && b.getAttribute && b.getAttribute('tabindex') != '-1',
      );
      const buttonToFocus = enabledButtons[first ? 0 : enabledButtons.length - 1];
      if (buttonToFocus === this.shadowRoot?.activeElement) {
        return;
      }
      buttonToFocus.focus();
    }
  }

  /**
   * Handles `keyup` event.
   * Moves the focus around the calendar days
   * @param {KeyboardEvent} event
   */
  private async onKeyUp(event: KeyboardEvent): Promise<void> {
    switch (event.key) {
      case 'ArrowLeft': {
        this.focusPreviousDay();
        break;
      }
      case 'ArrowRight': {
        this.focusNextDay();
        break;
      }
      case 'ArrowUp': {
        this.focusPreviousDay(7);
        break;
      }
      case 'ArrowDown': {
        this.focusNextDay(7);
        break;
      }
      case 'Home': {
        const currentMonthFirstEnabledDay = this.getCurrentMonthFirstEnabledDay();
        if (currentMonthFirstEnabledDay) {
          await this.focusDate(currentMonthFirstEnabledDay);
        }
        break;
      }
      case 'End': {
        const currentMonthLastEnabledDay = this.getCurrentMonthLastEnabledDay();
        if (currentMonthLastEnabledDay) {
          await this.focusDate(currentMonthLastEnabledDay);
        }
        break;
      }
      case 'PageUp': {
        this.activeDate = this.activeDate?.add(1, 'month');
        this.alignFocusableAndActiveDates();
        await this.updateComplete;
        if (this.focusableDate) {
          const targetDay = this.flattenedWeeks.find((day) => this.isSameDate(day.compareValue, this.focusableDate));
          if (targetDay && !targetDay.enabled && !targetDay.visible && targetDay && targetDay.compareValue) {
            const nextAvailableDay = this.getNextAvailableDay(targetDay.compareValue);
            if (nextAvailableDay) {
              await this.focusDate(nextAvailableDay);
            }
            return;
          }

          await this.focusDate(this.focusableDate);
        }
        break;
      }
      case 'PageDown': {
        this.activeDate = this.activeDate?.subtract(1, 'month');
        this.alignFocusableAndActiveDates();
        await this.updateComplete;
        const targetDay = this.flattenedWeeks.find((day) => this.isSameDate(day.compareValue, this.focusableDate));
        if (targetDay && !targetDay.enabled && !targetDay.visible) {
          const nextAvailableDay = this.getNextAvailableDay(targetDay.compareValue);
          if (nextAvailableDay) {
            await this.focusDate(nextAvailableDay);
          }
          return;
        }
        await this.focusDate(this.focusableDate);

        break;
      }
      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }
  }

  /**
   * Focuses the next enabled day depending on the delta.
   * If there is no date available it will try to focus the first day on the next month view.
   * @param {numeber} delta how many days to add to the current focusableDate.
   */
  private async focusNextDay(delta = 1): Promise<void> {
    const nextFocusableDay = this.getNextAvailableDay(this.focusableDate, delta);
    if (!nextFocusableDay) {
      this.activeDate = this.activeDate?.add(1, 'month');
      await this.updateComplete;
      const currentMonthFirstEnabledDay = this.getCurrentMonthFirstEnabledDay();
      if (currentMonthFirstEnabledDay) {
        await this.focusDate(currentMonthFirstEnabledDay);
      }
      return;
    }
    await this.focusDate(nextFocusableDay);
  }

  /**
   * Focuses the previous enabled day depending on the delta.
   * If there is no date available it will try to focus the last day on the previous month view.
   * @param {numeber} delta how many days to substract from the current focusableDate.
   */
  private async focusPreviousDay(delta = 1): Promise<void> {
    const previousFocusableDay = this.getPreviousEnabledDay(this.focusableDate, delta);
    if (!previousFocusableDay) {
      this.activeDate = this.activeDate?.subtract(1, 'month');
      await this.updateComplete;
      const currentMonthLastEnabledDay = this.getCurrentMonthLastEnabledDay();
      if (currentMonthLastEnabledDay) {
        await this.focusDate(currentMonthLastEnabledDay);
      }
      return;
    }
    await this.focusDate(previousFocusableDay);
  }

  /**
   * Gets the next date that is enabled.
   * @param {Dayjs} currentDay baseline dates, from which the search will start
   * @param {numeber} delta how many days to add to the current focusableDate.
   * @returns {Dayjs}
   */
  private getNextAvailableDay(currentDay: Dayjs | undefined, delta = 1): Dayjs | null {
    const currentDayIndex = this.flattenedWeeks.findIndex((day) => this.isSameDate(day.compareValue, currentDay));
    const desiredDay = currentDay?.add(delta - 1, 'day');
    const enabledDaysInFuture = this.flattenedWeeks
      .slice(currentDayIndex + 1, this.flattenedWeeks.length)
      .filter((day) => day.enabled && day.visible);

    for (const day of enabledDaysInFuture) {
      if (day.compareValue.isAfter(desiredDay)) {
        return day.compareValue;
      }
    }

    return null;
  }

  /**
   * Gets the next date that is enabled.
   * @param {Dayjs} currentDay baseline dates, from which the search will start
   * @param {numeber} delta how many days to add to the current focusableDate.
   * @returns {Dayjs}
   */
  private getPreviousEnabledDay(currentDay: Dayjs | undefined, delta = 1): Dayjs | null {
    const currentDayIndex = this.flattenedWeeks.findIndex((day) => this.isSameDate(day.compareValue, currentDay));
    const desiredDay = currentDay?.subtract(delta - 1, 'day');
    const enabledDaysInPast = this.flattenedWeeks
      .slice(0, currentDayIndex)
      .filter((day) => day.enabled && day.visible)
      .reverse();

    for (const day of enabledDaysInPast) {
      if (day.compareValue.isBefore(desiredDay)) {
        return day.compareValue;
      }
    }

    return null;
  }

  /**
   * Sets the current month to the previous one.
   */
  private previousClicked(): void {
    this.activeDate = this.activeDate?.subtract(1, 'month');
    this.focusableDate = this.focusableDate?.subtract(1, 'month');
    this.alignFocusableAndActiveDates();
  }

  /**
   * Sets the current month to the next one.
   */
  private nextClicked(): void {
    this.activeDate = this.activeDate?.add(1, 'month');
    this.focusableDate = this.focusableDate?.add(1, 'month');
    this.alignFocusableAndActiveDates();
  }

  /* main methods */

  /**
   * Creates weekdays array.
   * @returns {Weekday[]}
   */
  private createWeekdays(activeDate: Dayjs | undefined, firstDayOfWeek: number): Weekday[] | undefined {
    const cacheKey = this.getCacheKey(`${this.locale}-${this.dayperiod}`, firstDayOfWeek);
    if (this.cachedWeekdays.has(cacheKey)) {
      return this.cachedWeekdays.get(cacheKey);
    }
    const currentFormatWeekdays: string[] = [];
    const longWeekdays: string[] = [];

    // Get first Sunday in month
    const sunday = activeDate?.set('day', 0).day();

    const currentFormatter = this.getIntlFormatter({ weekday: this.dayperiod });
    const longFormatter = this.getIntlFormatter({ weekday: 'long' });

    Array.from(Array(DAYS_PER_WEEK).keys()).map((i) => {
      const date = activeDate?.set('day', (sunday || 0) + i);
      if (date) {
        const current = currentFormatter(date.toDate());
        const long = longFormatter(date.toDate());
        currentFormatWeekdays.push(current);
        longWeekdays.push(long);
      }
    });

    // Rotate the labels for days of the week based on the configured first day of the week.
    const weekdays = longWeekdays.map((long, i) => {
      return { long, narrow: currentFormatWeekdays[i] };
    });
    const finalWeekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    this.cachedWeekdays.set(cacheKey, finalWeekdays);
    return finalWeekdays;
  }

  /**
   * Creates week cells array.
   * @param {Dayjs} activeDate
   * @param {Number} firstWeekOffset
   * @param {CellCustomizationPayload[]} customize
   * @returns {Week[]}
   */
  private createWeekCells(
    activeDate: Dayjs | undefined,
    firstWeekOffset: number,
    customize: CellCustomizationPayload[] | undefined,
  ): Week[] | undefined {
    const cacheKey = this.getCacheKey(`${activeDate?.month()}-${activeDate?.year()}`, firstWeekOffset);
    if (this.cachedWeeks.has(cacheKey)) {
      return this.cachedWeeks.get(cacheKey);
    }

    const currentDate = activeDate || dayjs();
    const daysInMonth = currentDate.daysInMonth();
    const maxDays = Math.ceil((daysInMonth + firstWeekOffset) / DAYS_PER_WEEK) * DAYS_PER_WEEK - firstWeekOffset;
    const weeks: CalendarCell[][] = [[]];

    for (let i = -firstWeekOffset, cell = 0; i < maxDays; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        weeks.push([]);
        cell = 0;
      }

      const date =
        i < 0 || i >= daysInMonth
          ? dayjs({
              year: currentDate.year(),
              month: currentDate.month(),
              day: 1,
            }).add(i, 'day')
          : dayjs({
              year: currentDate.year(),
              month: currentDate.month(),
              day: i + 1,
            });

      const cellCustomizations = this.computeDateCustomizations(date, customize);
      const compareValue = date.hour(0).minute(0).second(0).millisecond(0);
      const isToday = this.isSameDate(dayjs(), compareValue);
      const isInAdjacentMonth = !(i >= 0 && i < daysInMonth);
      const hidden = isInAdjacentMonth;
      const newCell: CalendarCell = {
        displayValue: date.date().toString(),
        enabled: cellCustomizations.enabled,
        visible: !hidden,
        compareValue,
        isInAdjacentMonth,
        rawValue: date,
        customClasses: cellCustomizations.customClasses,
        indicatorStyle: this.getIndicatorAppearanceVariable(cellCustomizations.indicatorAppearance, isToday),
        isToday,
      };
      weeks[weeks.length - 1].push(newCell);
    }
    const weeksWithNumbers = weeks.map((week) => {
      return {
        number: week[0].rawValue.isoWeek(),
        cells: week,
      };
    });

    this.cachedWeeks.set(cacheKey, weeksWithNumbers);
    return weeksWithNumbers;
  }

  /* util methods */
  private getIndicatorAppearanceVariable(
    indicatorAppearance: IndicatorAppearance | undefined,
    isToday: boolean,
  ): string {
    if (isToday && !indicatorAppearance) {
      return 'var(--mds_core_calendar_indicator_appearance_today_background-color)';
    }

    if (!indicatorAppearance) {
      return '';
    }

    const isCustom = !['success', 'warning', 'info', 'error'].includes(indicatorAppearance);
    return isCustom
      ? indicatorAppearance
      : `var(--mds_core_calendar_indicator_appearance_${indicatorAppearance}_background-color)`;
  }

  private handleMinMaxSet(date: Dayjs | string | null, minMax: 'min' | 'max'): void {
    const newDate = dayjs(date).hour(0).minute(0).second(0).millisecond(0);
    const isNewDateValid = newDate.isValid();
    if (minMax === 'max') {
      this._max = isNewDateValid ? newDate : null;
    } else {
      this._min = isNewDateValid ? newDate : null;
    }
    this.cachedWeeks.clear();
    this.adjustActiveDateIfNeeded();
    if (isNewDateValid) {
      this.computeCalendarViewValues();
      this.focusableDate = this.getEnabledFocusableDay();
    }
  }

  public selectDate(date: Dayjs | string, emitEvent = true): void {
    const newDate = dayjs(date).hour(0).minute(0).second(0);
    if (!newDate.isValid()) return;
    this.value = newDate.format(this.format || INTERNAL_FORMAT);
    this.focusableDate = newDate;
    if (!emitEvent) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent<IMcCalendarDateSelectedDetail>('dateselected', {
        detail: { date: this.format ? newDate.format(this.format) : date },
        composed: true,
        bubbles: true,
      }),
    );
  }

  private adjustActiveDateIfNeeded(): void {
    const min = this.min ? dayjs(this.min) : null;
    const max = this.max ? dayjs(this.max) : null;
    const value = this.value ? dayjs(this.value).startOf('day') : dayjs().startOf('day');

    let newActiveDate = null;
    if (min && max && (value.isBefore(min) || value.isAfter(max))) {
      newActiveDate = min;
    } else if (min && min.isAfter(value)) {
      newActiveDate = min;
    } else if (max && max.isBefore(value)) {
      newActiveDate = max;
    }

    if (newActiveDate) {
      const month = newActiveDate.month();
      const year = newActiveDate.year();
      const adjustedActiveDate = dayjs(new Date(year, month, 1))
        .hour(0)
        .minute(0)
        .second(0);
      this.activedate = adjustedActiveDate.format(this.format || INTERNAL_FORMAT);
    }
  }

  /**
   * Aligns focusable, selected and active dates
   * @param {Dayjs | Date | string} date new date to set
   */
  private alignInternalDates(date: Dayjs | Date | string): void {
    const newDate = dayjs(date).hour(0).minute(0).second(0);
    if (!newDate.isValid()) return;
    this.activeDate = newDate;
    this.focusableDate = newDate;
    this.selectedDate = newDate;
  }

  /**
   * Get a cache key
   * @param {Dayjs} activeDate
   * @param {number | string} extension
   * @returns {string}
   */
  private getCacheKey(base: string, extension: number | string): string {
    return extension ? `${base}-${extension}` : `${base}`;
  }

  /**
   * Focuses an element corresponding to the supplied date.
   * @param {Dayjs} date
   */
  private async focusDate(date: Dayjs | undefined): Promise<void> {
    const elementToFocus: McButton | null | undefined = this.shadowRoot?.querySelector(
      `[data-date='${date?.format(INTERNAL_FORMAT)}']`,
    );
    if (!elementToFocus || elementToFocus.disabled) {
      return;
    }
    this.focusableDate = date;
    await this.updateComplete;
    elementToFocus.focus();
  }

  /**
   * Checks if the provided date is the same as the currently selected one.
   * @param {Dayjs} date
   * @returns {boolean}
   */
  private isSelected(date: Dayjs): boolean {
    if (!date || !this.selectedDate) return false;
    return this.isSameDate(this.selectedDate, date);
  }

  /**
   * Checks if two dates are the same excluding the hour/date/minute
   * @param {Dayjs} date1
   * @param {Dayjs} date2
   * @returns {boolean}
   */
  private isSameDate(date1: Dayjs | undefined, date2: Dayjs | undefined): boolean {
    return date1?.hour(0).minute(0).second(0).toString() === date2?.hour(0).minute(0).second(0).toString();
  }

  /**
   * Determines the `tabindex` attribute of a cell. If the cell is supposed to be focusable by `Tab`, returns 0.
   * @param {CalendarCell} cell
   * @returns {number}
   */
  private getTabIndex(cell: CalendarCell): number {
    if (!this.focusableDate) return 0;
    return this.showMonthYearPicker ? -1 : this.isSameDate(this.focusableDate, cell.compareValue) ? 0 : -1;
  }

  /**
   * Computes date customizations(enabled & customClasses)
   * @param {Dayjs} date
   * @param {CellCustomizationPayload[]} customize
   * @returns {DateCustomizations}
   */
  private computeDateCustomizations(date: Dayjs, customize: CellCustomizationPayload[] = []): DateCustomizations {
    let disabled = false;
    let indicator: IndicatorAppearance | undefined = undefined;
    let customClasses: Array<string> = [];

    const baseCase = !!date && (!this.min || date >= this.min) && (!this.max || date <= this.max);

    for (const cell of customize || []) {
      const cellDate = cell.date;

      if (typeof cellDate === 'function') {
        const functionOutput = cellDate(date.toDate());
        if (cell.disabled) {
          disabled = functionOutput;
        }
        if (cell.customClasses?.length && functionOutput) {
          customClasses = [...customClasses, ...this.extractCustomClasses(cell.customClasses)];
        }
        if (cell.indicatorAppearance && functionOutput) {
          indicator = cell.indicatorAppearance;
        }
      }

      const isSame =
        (typeof cellDate === 'string' || (cellDate as Date).getDate) &&
        this.isSameDate(dayjs(date), dayjs(cellDate as Date));
      const isBetween =
        (cellDate as DateRange).from &&
        date.isBetween(
          dayjs((cellDate as DateRange).to as Dayjs),
          dayjs((cellDate as DateRange).from as Dayjs),
          'day',
          '[]',
        );

      if (isSame || isBetween) {
        if (cell.disabled) {
          disabled = true;
        }
        if (cell.customClasses?.length) {
          customClasses = [...customClasses, ...this.extractCustomClasses(cell.customClasses)];
        }
        if (cell.indicatorAppearance) {
          indicator = cell.indicatorAppearance;
        }
      }
    }
    return { enabled: !disabled && baseCase, customClasses, indicatorAppearance: indicator };
  }
  private extractCustomClasses(cellClasses: string | string[]): string[] {
    if (Array.isArray(cellClasses)) {
      return [...cellClasses];
    } else {
      const classes = cellClasses.trim().split(' ');
      return [...classes];
    }
  }

  /**
   * Computes values needed to correctly display calendar view
   */
  private computeCalendarViewValues(): void {
    this.periodButtonText = this.getPeriodTitle(this.activeDate);
    this.firstWeekOffset = this.getFirstWeekOffSet(this.activeDate, this.firstDayOfWeek, DAYS_PER_WEEK);
    this.weekdays = this.createWeekdays(this.activeDate, this.firstDayOfWeek);
    this.weeks = this.createWeekCells(this.activeDate, this.firstWeekOffset, this.customize);
  }

  /**
   * Gets the first date of the currently displayed month
   * @returns {Dayjs}
   */
  private getCurrentMonthFirstEnabledDay(): Dayjs | undefined {
    const enabledDays = this.getEnabledDays();
    if (!enabledDays.length) {
      return undefined;
    }
    return enabledDays[0].compareValue;
  }

  /**
   * Gets last date of the currently displayed month
   * @returns {Dayjs}
   */
  private getCurrentMonthLastEnabledDay(): Dayjs | undefined {
    const enabledDays = this.getEnabledDays();
    return enabledDays.length > 0 ? enabledDays[enabledDays.length - 1].compareValue : undefined;
  }

  /**
   * Gets the Intl formatter used to format dates in locales
   * @param {Intl.DayjsFormatOptions} options
   * @returns {(date: Date) => string}
   */
  private getIntlFormatter(options: Intl.DateTimeFormatOptions): (date: Date | undefined) => string {
    return new Intl.DateTimeFormat(this.locale, options).format;
  }

  /**
   * Gets the days that are in the allowed range.
   * @returns {CalendarCell[]}
   */
  private getEnabledDays(): CalendarCell[] {
    const enabledDays: CalendarCell[] = [];

    for (const week of this.weeks || []) {
      for (const cell of week.cells) {
        if (cell.enabled && cell.visible) {
          enabledDays.push(cell);
        }
      }
    }

    return enabledDays;
  }

  /**
   * Gets the day to focus when initially Tabbing into the calendar. Today by default.
   * @returns {Dayjs}
   */
  private getEnabledFocusableDay(): Dayjs | undefined {
    const currentFocusableDay = this.flattenedWeeks?.find((day) => {
      if (this.focusableDate) {
        return this.isSameDate(this.focusableDate, day.compareValue);
      }

      return false;
    });
    if (currentFocusableDay?.enabled && currentFocusableDay?.visible) {
      return currentFocusableDay.compareValue;
    }
    const today = dayjs();
    if (!this.computeDateCustomizations(today, this.customize)?.enabled) {
      return this.getCurrentMonthFirstEnabledDay();
    }
    return today;
  }

  /**
   * Gets the locale month and year to display in the calendar header.
   * @returns {string}
   */
  private getPeriodTitle(activeDate: Dayjs | null | undefined): string {
    const formatter = this.getIntlFormatter({ month: 'long' });
    return `${formatter(activeDate?.toDate())} ${activeDate?.year()}`;
  }

  /**
   * Gets the appropriate weekday display text based on dayperiod setting.
   * @param {Weekday} day The weekday object containing long and current format
   * @returns {string}
   */
  private getWeekdayDisplayText(day: Weekday): string {
    // The narrow property now contains the format requested by dayperiod
    return day.narrow;
  }

  /**
   * Gets the number of days to offset depending on the start of the week.
   * @returns {number}
   */
  private getFirstWeekOffSet(activeDate: Dayjs | undefined, firstDayOfWeek: number, daysPerWeek: number): number {
    // set the date to first of month and get the weekday that is the 1st
    return (daysPerWeek + (activeDate ? activeDate.startOf('month').day() : 0) - firstDayOfWeek) % daysPerWeek;
  }

  /**
   * Aligns focusable and active dates to have matching months.
   * Used in PageUp/PageDown handlers.
   */
  private alignFocusableAndActiveDates(): void {
    if (this.focusableDate?.month() !== this.activeDate?.month()) {
      this.focusableDate = dayjs({
        day: this.focusableDate?.date(),
        month: this.activeDate?.month(),
        year: this.activeDate?.year(),
      });
    }
  }

  private async toggleMonthYearPicker(): Promise<void> {
    if (this.showMonthYearPicker) {
      this.closeMonthYearPicker();
    } else {
      this.openMonthYearPicker();
    }
  }

  private async openMonthYearPicker(): Promise<void> {
    this.showMonthYearPicker = true;
    this.removeEventListeners();
  }

  private closeMonthYearPicker(): void {
    this.alignFocusableAndActiveDates();
    this.addEventListeners();
    this.showMonthYearPicker = false;
    this.currentPeriodElement?.focus();
  }

  private handleMonthYearClosed(e: CustomEvent): void {
    const newDate = this.getNewDateFromMonthYearEvent(e);
    if (!newDate) {
      return;
    }

    this.updateComplete.then(() => {
      this.activeDate = newDate;
      this.showMonthYearPicker = false;
    });
  }

  private handleMonthYearSelected(e: CustomEvent): void {
    if (!this.showMonthYearPicker) {
      return;
    }
    const newDate = this.getNewDateFromMonthYearEvent(e);
    if (!newDate) {
      return;
    }
    this.periodButtonText = this.getPeriodTitle(newDate);
  }

  private getNewDateFromMonthYearEvent(e: CustomEvent): Dayjs | undefined {
    const {
      value: { month, year },
    } = e.detail;

    if (month === null || month === undefined || !year) {
      return undefined;
    }

    const day = this.selectedDate?.day() || this.todayValue.day();
    return dayjs().set('day', day).set('month', month).set('year', year);
  }

  private handleMonthYearPickerFocusout(): void {
    this.currentPeriodElement?.focus();
  }

  private handleFooterSlotChange(): void {
    const footerSlot: HTMLSlotElement | null | undefined = this.shadowRoot?.querySelector('slot[name="footer"]');
    const footerAssignedElements = footerSlot?.assignedElements({ flatten: true });
    this.hasFooterSlot = footerAssignedElements ? footerAssignedElements.length > 0 : false;
  }
}

customElements.get('mc-calendar') || customElements.define('mc-calendar', McCalendar);

declare global {
  interface HTMLElementTagNameMap {
    'mc-calendar': McCalendar;
  }
}
