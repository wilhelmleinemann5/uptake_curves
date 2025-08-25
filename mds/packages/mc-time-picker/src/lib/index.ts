// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';

// utils
import { timeFormatter, padStart, setCurrentTime } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { Fit } from '@maersk-global/mds-shared-types';
import { IMcTimePicker, IMcTimePickerTimeSelectedDetail } from './types';
import { McPicker } from '@maersk-global/mds-components-core-picker';

// mds-components used with mc-time-picker
import '@maersk-global/mds-components-core-picker';
import '@maersk-global/mds-components-core-picker-item';

export type { IMcTimePicker } from './types';

/**
 * @element `mc-time-picker`
 * @summary The picker shows two lists that roll, one on hours and one on minutes, and always places the selected minute and hour in the middle of each list.
 * @since 2.0.0-beta.3
 *
 * @event {CustomEvent<IMcTimePickerTimeSelectedDetail>} timeselected - Emitted upon every minute/hour selection.
 *
 * @csspart `hours-container` - for changing visuals of the selection area of the hours.
 * @csspart `minutes-container` - for changing visuals of the selection area of the minutes.
 */
export class McTimePicker extends LitElement implements IMcTimePicker {
  private firstUpdate = true;
  @state()
  private hours: string[] = [];

  @state()
  private minutes: string[] = [];

  @query('.hour')
  private hourPicker?: McPicker;

  @query('.minute')
  private minutePicker?: McPicker;

  @state()
  private hour = '00';

  @state()
  private minute = '00';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Number })
  public hourstep = 1;

  @property({ type: Number })
  public minutestep = 1;

  @property({ type: Boolean })
  public preselectcurrenttime = false;

  @property({ type: Boolean })
  public preventinitialeventdispatch = false;

  @property({ type: Boolean })
  public trapfocus = false;

  @property({ type: String })
  public value?: string | null = '';

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
    };
    return html`<div class="mc-time-picker ${classMap(classes)}" @keydown="${this.handleKeyDown}">
      <mc-picker
        exportparts="container: hours-container"
        data-cy="hour"
        class="hour"
        aria-label="Choose an hour"
        .fit="${this.fit}"
        .value="${this.hour}"
        @pickerselected="${this.handleHourChange}"
        ?preventinitialeventdispatch="${this.preventinitialeventdispatch}"
      >
        ${repeat(
          this.hours,
          (hour) => hour,
          (hour) => html` <mc-picker-item width="fixed" .value="${hour}" .label="${hour}"></mc-picker-item> `,
        )}
      </mc-picker>
      <mc-picker
        exportparts="container: minutes-container"
        data-cy="minute"
        class="minute"
        aria-label="Choose a minute"
        .fit="${this.fit}"
        .value="${this.minute}"
        @pickerselected="${this.handleMinuteChange}"
        ?preventinitialeventdispatch="${this.preventinitialeventdispatch}"
      >
        ${repeat(
          this.minutes,
          (minute) => minute,
          (minute) => html` <mc-picker-item width="fixed" .value="${minute}" .label="${minute}"></mc-picker-item> `,
        )}
      </mc-picker>
    </div>`;
  }

  public focus(): void {
    this.hourPicker?.focusWith(true);
  }

  public show(): void {
    this.hourPicker?.show();
    this.minutePicker?.show();
  }

  public hide(): void {
    this.hourPicker?.hide();
    this.minutePicker?.hide();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.setHours();
    this.setMinutes();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('preselectcurrenttime') && this.preselectcurrenttime) {
      this.value = setCurrentTime(this.minutestep);
    }

    if (changedProperties.has('hourstep') && !this.firstUpdate) {
      this.setHours();
    }

    if (changedProperties.has('minutestep') && !this.firstUpdate) {
      this.setMinutes();
      this.value = setCurrentTime(this.minutestep);
    }

    if (changedProperties.has('value')) {
      this.setTime();
    }

    this.firstUpdate = false;
  }

  private setMinutes(): void {
    this.minutes = this.getTimeArray(0, 60, this.minutestep);
  }

  private setHours(): void {
    this.hours = this.getTimeArray(0, 24, this.hourstep);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab' && this.trapfocus) {
      event.preventDefault();
      if (this.hourPicker?.focused) {
        this.minutePicker?.focusWith();
      } else {
        this.hourPicker?.focusWith();
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleTimeChange(true);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hourPicker?.focusWith();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.minutePicker?.focusWith();
    }
  }

  private handleHourChange(event: CustomEvent): void {
    this.hour = event.detail.item.value;
    this.handleTimeChange(event.detail.force);
  }

  private handleMinuteChange(event: CustomEvent): void {
    this.minute = event.detail.item.value;
    this.handleTimeChange(event.detail.force);
  }

  private handleTimeChange(force = false): void {
    const time = `${padStart(this.hour)}:${padStart(this.minute)}`;
    if (time !== this.value || force) {
      this.value = time;
      this.dispatchEvent(
        new CustomEvent<IMcTimePickerTimeSelectedDetail>('timeselected', { detail: { time: this.value } }),
      );
    }
  }

  private setTime(): void {
    if (this.value) {
      const [, hour, minute] = timeFormatter(this.value, this.minutestep);

      if (minute !== this.minute) {
        this.minute = minute;
        this.minutePicker?.show();
      }

      if (hour !== this.hour) {
        this.hour = hour;
        this.hourPicker?.show();
      }
    }
  }

  private getTimeArray(start: number, end: number, step: number): string[] {
    return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), (x) => start + x * step).map((key) =>
      padStart(key),
    );
  }
}
customElements.get('mc-time-picker') || customElements.define('mc-time-picker', McTimePicker);
