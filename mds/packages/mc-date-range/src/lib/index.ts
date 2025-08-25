// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// dayjs
import dayjs from 'dayjs';
// utils
import { FormField, DisabledState } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import {
  CellCustomizationPayload,
  Fit,
  LabelPosition,
  Orientation,
  Position,
  Variant,
} from '@maersk-global/mds-shared-types';
import { IDateRangeValue, IMcDateRange, DATE_RANGE_DEFAULTS } from './types';
import { McInputDate, INPUT_DATE_DEFAULTS } from '@maersk-global/mds-components-core-input-date';
import { Max, Min, Size } from '@maersk-global/mds-components-core-input/src/lib/types';

// components
import '@maersk-global/mds-components-core-input-date';
import '@maersk-global/mds-components-core-label';

export type { IMcDateRange } from './types';
/**
 * @element` mc-date-range`
 * @extends McDateRange
 *
 * @event {InputEvent} input - Fired when the character is entered.
 * @event {CustomEvent<string>} inputdateselected - Fired only when date is selected in the calendar.
 * @event {FocusEvent} focus - Fired when an input in mc-date-range is focused.
 * @event {FocusEvent} blur - Fired when an input in mc-date-range is going out of focus.
 * @event {MouseEvent} click - Fired on mc-date-range click.
 * @event {KeyboardEvent} keydown - Fired when a key on keydown is pressed.
 *
 * @slot `from` - Only utilize the slot designated for the 'from' if customization on its corresponding mc-input-date is required.
 * @slot `to` - Only utilize the slot designated for the 'to' if customization on its corresponding mc-input-date is required.
 * @slot `legend` - The legend HTML to use for the mc-date-range.
 */
export class McDateRange extends DisabledState(FormField(LitElement)) implements IMcDateRange {
  private readonly internals: ElementInternals = this.attachInternals();
  private firstUpdate = true;
  private fromInput?: McInputDate;
  private toInput?: McInputDate;

  @queryAssignedElements({ slot: 'legend', flatten: true })
  private legendElements!: Array<HTMLElement>;

  @state()
  private hasSlotLegend = false;

  @state()
  private get legendVisible(): boolean {
    return !!(this.hasSlotLegend || this.legend);
  }

  @queryAssignedElements({ slot: 'from', flatten: true })
  private from?: McInputDate[];

  @queryAssignedElements({ slot: 'to', flatten: true })
  private to?: McInputDate[];

  protected controlType = 'input';

  public static get formAssociated() {
    return true;
  }

  public get validity(): ValidityState {
    return this.internals.validity;
  }

  @property({ type: Boolean })
  public autolayoutdisabled = false;

  @property({ type: String })
  public autocomplete = '';

  @property({ type: String })
  public calendarposition: Position = INPUT_DATE_DEFAULTS.calendarPosition;

  @property({ type: Boolean, reflect: true })
  public clearbutton = false;

  @property({ type: Boolean })
  public keepclearbuttonvisible = false;

  @property({ type: Array, reflect: true })
  public customize?: CellCustomizationPayload[];

  @property({ type: String })
  public customstyles?: string;

  @property({ type: String })
  public fit: Fit = INPUT_DATE_DEFAULTS.fit;

  @property({ type: String })
  public format = INPUT_DATE_DEFAULTS.format;

  @property({ type: String })
  public fromlabel?: string | null = DATE_RANGE_DEFAULTS.fromLabel;

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: Boolean })
  public hiddenlegend = false;

  @property({ type: String })
  public icon = '';

  @property({ type: String })
  public labelposition: LabelPosition = INPUT_DATE_DEFAULTS.labelPosition;

  @property({ type: String })
  public legend?: string | null = null;

  @property({ type: Boolean, reflect: true })
  public loading = false;

  @property({ type: String })
  public locale = INPUT_DATE_DEFAULTS.locale;

  @property({ type: String })
  public max?: Max;

  @property({ type: String })
  public min?: Min;

  @property({ type: String, reflect: true })
  public name = '';

  @property({ type: String })
  public nextlabel = INPUT_DATE_DEFAULTS.nextLabel;

  @property({ type: String })
  public orientation: Orientation = 'horizontal';

  @property({ type: String })
  public placeholder = this.format;

  @property({ type: String })
  public previouslabel = INPUT_DATE_DEFAULTS.previouslabel;

  @property({ type: Boolean })
  public readonly = false;

  @property({ type: Boolean })
  public required = false;

  @property({ type: Boolean, reflect: true })
  public showadjacentmonthdays = false;

  @property({ type: Boolean })
  public showweeknumbers = false;

  @property({ type: Number })
  public size: Size = null;

  @property({ type: Number })
  public startofweek = INPUT_DATE_DEFAULTS.startOfWeek;

  @property({ type: String })
  public tolabel?: string | null = DATE_RANGE_DEFAULTS.toLabel;

  @property({ type: Object, reflect: true })
  public value?: IDateRangeValue | null;

  @property({ type: String })
  public variant: Variant = INPUT_DATE_DEFAULTS.variant;

  @property({ type: String })
  public width = INPUT_DATE_DEFAULTS.width;

  @property({ type: Number })
  public yearcap = INPUT_DATE_DEFAULTS.yearCap;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (this.from && this.from.length !== 0) {
      this.fromInput = this.from[0];
      this.fromInput.setAttribute('data-cy', 'from-input');
      this.fromInput.addEventListener('inputdateselected', this.onFromDateSelected);
      this.fromInput.addEventListener('blur', this.onFromDateBlurred);
    }

    if (this.to && this.to.length !== 0) {
      this.toInput = this.to[0];
      this.toInput.setAttribute('data-cy', 'to-input');
      this.toInput.addEventListener('inputdateselected', this.onToDateSelected);
      this.toInput.addEventListener('blur', this.onToDateBlurred);
    }
  }

  public updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.fromInput && this.toInput) {
      if (changedProperties.has('disabled')) {
        this.fromInput.disabled = this.disabled;
        this.toInput.disabled = this.disabled;
      }

      if (changedProperties.has('clearbutton')) {
        this.fromInput.clearbutton = this.clearbutton;
        this.toInput.clearbutton = this.clearbutton;
      }

      if (changedProperties.has('keepclearbuttonvisible')) {
        this.fromInput.keepclearbuttonvisible = this.keepclearbuttonvisible;
        this.toInput.keepclearbuttonvisible = this.keepclearbuttonvisible;
      }

      if (changedProperties.has('autocomplete')) {
        this.fromInput.autocomplete = this.autocomplete || this.fromInput.autocomplete;
        this.toInput.autocomplete = this.autocomplete || this.toInput.autocomplete;
      }

      if (changedProperties.has('calendarposition')) {
        this.fromInput.calendarposition =
          this.calendarposition === INPUT_DATE_DEFAULTS.calendarPosition && this.firstUpdate
            ? this.fromInput.calendarposition
            : this.calendarposition;
        this.calendarposition =
          INPUT_DATE_DEFAULTS.calendarPosition && this.firstUpdate
            ? this.toInput.calendarposition
            : this.calendarposition;
      }

      if (changedProperties.has('customize')) {
        this.fromInput.customize = this.customize || this.fromInput.customize;
        this.toInput.customize = this.customize || this.toInput.customize;
      }

      if (changedProperties.has('customstyles')) {
        this.fromInput.customstyles = this.customstyles || this.fromInput.customstyles;
        this.toInput.customstyles = this.customstyles || this.toInput.customstyles;
      }

      if (changedProperties.has('fit')) {
        this.fromInput.fit = INPUT_DATE_DEFAULTS.fit === this.fit && this.firstUpdate ? this.fromInput.fit : this.fit;
        this.toInput.fit = INPUT_DATE_DEFAULTS.fit === this.fit && this.firstUpdate ? this.toInput.fit : this.fit;
      }

      if (changedProperties.has('format')) {
        this.fromInput.format =
          INPUT_DATE_DEFAULTS.format === this.format && this.firstUpdate ? this.fromInput.format : this.format;
        this.fromInput.placeholder = this.fromInput.format;

        this.toInput.format =
          INPUT_DATE_DEFAULTS.format === this.format && this.firstUpdate ? this.toInput.format : this.format;
        this.toInput.placeholder = this.toInput.format;
      }

      if (changedProperties.has('fromlabel')) {
        const newFromLabel =
          DATE_RANGE_DEFAULTS.fromLabel === this.fromlabel && this.firstUpdate ? this.fromInput.label : this.fromlabel;
        this.fromInput.label = newFromLabel || '';
      }

      if (changedProperties.has('placeholder')) {
        this.fromInput.placeholder =
          INPUT_DATE_DEFAULTS.format === this.placeholder && this.firstUpdate
            ? this.fromInput.placeholder
            : this.placeholder;
        this.toInput.placeholder =
          INPUT_DATE_DEFAULTS.format === this.placeholder && this.firstUpdate
            ? this.toInput.placeholder
            : this.placeholder;
      }

      if (changedProperties.has('icon')) {
        this.fromInput.icon = this.icon || this.fromInput.icon;
        this.toInput.icon = this.icon || this.toInput.icon;
      }

      if (changedProperties.has('loading')) {
        this.fromInput.loading = !this.loading && this.firstUpdate ? this.fromInput.loading : this.loading;
        this.toInput.loading = !this.loading && this.firstUpdate ? this.toInput.loading : this.loading;
      }

      if (changedProperties.has('variant')) {
        this.fromInput.variant =
          INPUT_DATE_DEFAULTS.variant === this.variant && this.firstUpdate ? this.fromInput.variant : this.variant;
        this.toInput.variant =
          INPUT_DATE_DEFAULTS.variant === this.variant && this.firstUpdate ? this.toInput.variant : this.variant;
      }

      if (changedProperties.has('required')) {
        this.fromInput.required = !this.required && this.firstUpdate ? this.fromInput.required : this.required;
        this.toInput.required = !this.required && this.firstUpdate ? this.toInput.required : this.required;
      }

      if (changedProperties.has('labelposition')) {
        this.fromInput.labelposition =
          INPUT_DATE_DEFAULTS.labelPosition === this.labelposition && this.firstUpdate
            ? this.fromInput.labelposition
            : this.labelposition;
        this.toInput.labelposition =
          INPUT_DATE_DEFAULTS.labelPosition === this.labelposition && this.firstUpdate
            ? this.toInput.labelposition
            : this.labelposition;
      }

      if (changedProperties.has('locale')) {
        this.fromInput.locale =
          INPUT_DATE_DEFAULTS.locale === this.locale && this.firstUpdate ? this.fromInput.locale : this.locale;
        this.toInput.locale =
          INPUT_DATE_DEFAULTS.locale === this.locale && this.firstUpdate ? this.toInput.locale : this.locale;
      }

      if (changedProperties.has('max')) {
        this.fromInput.max = this.max || this.fromInput.max;
        this.toInput.max = this.max || this.toInput.max;
      }

      if (changedProperties.has('min')) {
        this.fromInput.min = this.min || this.fromInput.min;
        this.toInput.min = this.min || this.toInput.min;
      }

      if (changedProperties.has('nextlabel')) {
        this.fromInput.nextlabel = this.fromInput.nextlabel =
          INPUT_DATE_DEFAULTS.nextLabel === this.nextlabel && this.firstUpdate
            ? this.fromInput.nextlabel
            : this.nextlabel;
        this.toInput.nextlabel =
          INPUT_DATE_DEFAULTS.nextLabel === this.nextlabel && this.firstUpdate
            ? this.toInput.nextlabel
            : this.nextlabel;
      }

      if (changedProperties.has('previouslabel')) {
        this.fromInput.previouslabel =
          INPUT_DATE_DEFAULTS.previouslabel === this.previouslabel && this.firstUpdate
            ? this.fromInput.previouslabel
            : this.previouslabel;
        this.toInput.previouslabel =
          INPUT_DATE_DEFAULTS.previouslabel === this.previouslabel && this.firstUpdate
            ? this.toInput.previouslabel
            : this.previouslabel;
      }

      if (changedProperties.has('readonly')) {
        this.fromInput.readonly = !this.readonly && this.firstUpdate ? this.fromInput.readonly : this.readonly;
        this.toInput.readonly = !this.readonly && this.firstUpdate ? this.toInput.readonly : this.readonly;
      }

      if (changedProperties.has('showadjacentmonthdays')) {
        this.fromInput.showadjacentmonthdays =
          !this.showadjacentmonthdays && this.firstUpdate
            ? this.fromInput.showadjacentmonthdays
            : this.showadjacentmonthdays;
        this.toInput.showadjacentmonthdays =
          !this.showadjacentmonthdays && this.firstUpdate
            ? this.toInput.showadjacentmonthdays
            : this.showadjacentmonthdays;
      }

      if (changedProperties.has('showweeknumbers')) {
        this.fromInput.showweeknumbers =
          !this.showweeknumbers && this.firstUpdate ? this.fromInput.showweeknumbers : this.showweeknumbers;
        this.toInput.showweeknumbers =
          !this.showweeknumbers && this.firstUpdate ? this.toInput.showweeknumbers : this.showweeknumbers;
      }

      if (changedProperties.has('size')) {
        this.fromInput.size = this.size || this.fromInput.size;
        this.toInput.size = this.size || this.toInput.size;
      }

      if (changedProperties.has('startofweek')) {
        this.fromInput.startofweek =
          INPUT_DATE_DEFAULTS.startOfWeek === this.startofweek && this.firstUpdate
            ? this.fromInput.startofweek
            : this.startofweek;
        this.toInput.startofweek =
          INPUT_DATE_DEFAULTS.startOfWeek === this.startofweek && this.firstUpdate
            ? this.toInput.startofweek
            : this.startofweek;
      }

      if (changedProperties.has('tolabel')) {
        const newToLabel =
          DATE_RANGE_DEFAULTS.toLabel === this.tolabel && this.firstUpdate ? this.toInput.label : this.tolabel;
        this.toInput.label = newToLabel || '';
      }

      if (changedProperties.has('hiddenlabel')) {
        this.fromInput.hiddenlabel =
          !this.hiddenlabel && this.firstUpdate ? this.fromInput.hiddenlabel : this.hiddenlabel;
        this.toInput.hiddenlabel = !this.hiddenlabel && this.firstUpdate ? this.toInput.hiddenlabel : this.hiddenlabel;
      }

      if (changedProperties.has('width')) {
        this.fromInput.width =
          INPUT_DATE_DEFAULTS.width === this.width && this.firstUpdate ? this.fromInput.width : this.width;
        this.toInput.width =
          INPUT_DATE_DEFAULTS.width === this.width && this.firstUpdate ? this.toInput.width : this.width;
      }

      if (changedProperties.has('yearcap')) {
        this.fromInput.yearcap =
          INPUT_DATE_DEFAULTS.yearCap === this.yearcap && this.firstUpdate ? this.fromInput.yearcap : this.yearcap;
        this.toInput.yearcap =
          INPUT_DATE_DEFAULTS.yearCap === this.yearcap && this.firstUpdate ? this.toInput.yearcap : this.yearcap;
      }

      if (changedProperties.has('value') && this.value) {
        if (this.value) {
          this.fromInput.value = this.value.from || null;
          this.toInput.value = this.value.to || null;
        } else {
          this.fromInput.value = null;
          this.toInput.value = null;
        }
      }
    }

    this.firstUpdate = false;
  }

  public disconnectedCallback(): void {
    this.fromInput?.removeEventListener('inputdateselected', this.onFromDateSelected);
    this.fromInput?.removeEventListener('blur', this.onFromDateBlurred);
    this.toInput?.removeEventListener('inputdateselected', this.onToDateSelected);
    this.toInput?.removeEventListener('blur', this.onToDateBlurred);
    super.disconnectedCallback();
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      'hidden-legend': !this.legendVisible,
      'no-feedback': !this.legendVisible,
    };

    const inputsClasses = {
      [`autolayout`]: !this.autolayoutdisabled,
      [`${this.orientation}`]: true,
    };

    return html`<div class="mc-date-range ${classMap(classes)}" @input=${this.onInput}>
      <legend aria-label="${ifDefined(this.hiddenlegend && this.legend ? this.legend : undefined)}">
        <mc-label
          id="label"
          label="${ifDefined(this.legend ? this.legend : undefined)}"
          .fit=${this.fit}
          ?hiddenlabel=${this.hiddenlegend}
          ><slot name="legend" @slotchange=${this.onLegendSlotChange}>${this.legend}</slot></mc-label
        >
      </legend>
      <div class="inputs ${classMap(inputsClasses)}">
        <slot name="from"><mc-input-date name="from" label="From"></mc-input-date></slot>
        <slot name="to"><mc-input-date name="to" label="To"></mc-input-date></slot>
      </div>
    </div>`;
  }

  private onInput(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    this.updateValue();
  }

  private updateValue(): void {
    this.value = { from: this.fromInput?.value, to: this.toInput?.value };

    this.dispatchEvent(new InputEvent('input'));
  }

  private onFromDateBlurred = (): void => {
    this.validateAndSetValue(this.fromInput?.value, this.toInput?.value, 'from');
  };

  private onToDateBlurred = (): void => {
    this.validateAndSetValue(this.fromInput?.value, this.toInput?.value, 'to');
  };

  private onFromDateSelected = (event: Event | CustomEvent<string>): void => {
    if ('detail' in event) {
      this.validateAndSetValue(event.detail, this.toInput?.value, 'from');
    }
  };

  private onToDateSelected = (event: Event | CustomEvent<string>): void => {
    if ('detail' in event) {
      this.validateAndSetValue(this.fromInput?.value, event.detail, 'to');
    }
  };

  private validateAndSetValue(
    fromDate: string | undefined | null,
    toDate: string | undefined | null,
    origin: 'from' | 'to',
  ): void {
    if (this.fromInput && this.toInput) {
      if (fromDate && toDate) {
        const fromDateObject = dayjs(fromDate, this.format);
        const toDateObject = dayjs(toDate, this.format);

        if (fromDateObject.isAfter(toDateObject)) {
          if (origin === 'from') {
            this.toInput.value = null;
            this.toInput.activedate = fromDate;
          } else {
            this.fromInput.value = null;
            this.fromInput.activedate = toDate;
          }
        }
      } else if (!fromDate && toDate) {
        this.fromInput.activedate = toDate;
      } else if (fromDate && !toDate) {
        this.toInput.activedate = fromDate;
      }
    }

    this.updateValue();
  }

  private onLegendSlotChange(): void {
    this.hasSlotLegend = this.legendElements.length > 0;
  }
}
customElements.get('mc-date-range') || customElements.define('mc-date-range', McDateRange);
