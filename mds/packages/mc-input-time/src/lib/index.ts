// lit-elements
import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

// styles
import { styles } from './styles/index.styles';

// types
import { IMcInputTime } from './types';
import { Position } from '@maersk-global/mds-shared-types';
import { McPopover } from '@maersk-global/mds-components-core-popover';
import { McInput } from '@maersk-global/mds-components-core-input';
import { McTimePicker } from '@maersk-global/mds-components-core-time-picker';
import { debounce, CallBackType, timeFormatter, Responsive, setCurrentTime } from '@maersk-global/mds-components-utils';

// mds-components used with mc-input-time
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-time-picker';

export type { IMcInputTime } from './types';

/**
 * @element` mc-input-time`
 * @extends McInput
 *
 * @event {InputEvent} input - Fired when the character is entered.
 * @event {FocusEvent} focus - Fired when mc-input-time is focused.
 * @event {FocusEvent} blur - Fired when mc-input-time is going out of focus.
 * @event {MouseEvent} click - Fired on mc-input-time click.
 * @event {KeyboardEvent} keydown - Fired when a key on keydown is pressed.
 *
 * @slot `label` - The label HTML to use for the mc-input-time.
 * @slot `hint` - The hint HTML to use for the mc-input-time.
 * @slot `errormessage` - The errormessage HTML to use for the mc-input-time.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `input` - for changing visuals of input field
 * @csspart `icon` - for changing visuals of icons
 */

export class McInputTime extends Responsive(McInput) implements IMcInputTime {
  private debouncedSetSelectedTime?: CallBackType;

  @query('mc-time-picker')
  private timePicker?: McTimePicker;

  @state()
  private time?: string | null;

  @property({ type: Number })
  public hourstep = 1;

  @property({ type: Number })
  public minutestep = 1;

  /**
   * only for the purpose of VR tests
   */
  @property({ type: Boolean })
  public open?: boolean;

  @property({ type: String })
  public override placeholder = '--:--';

  @property({ type: Boolean })
  public preselectcurrenttime = false;

  @property({ type: String })
  public timepickerposition: Position = 'bottom-left';

  @query('mc-popover')
  private mcPopover?: McPopover;

  /* styles */
  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  /* render methods */
  public render(): TemplateResult {
    const classes = { ...this.calculateClasses(), open: !!this.open };
    const timePickerClasses = {
      'mc-time-picker--hidden': this.type === 'time' || this.readonly,
    };

    return html`
      <div data-cy="mc-input-time" class="mc-input mc-select ${classMap(classes)}" @keydown="${this.handleKeyDown}">
        ${super.render()}
        <mc-popover
          .customtriggerelement="${this.inputField}"
          trigger="click"
          .fit="${this.fit}"
          .position="${this.timepickerposition}"
          modalmode="x-small-screen"
          ?open=${this.open}
          @show="${this.onTimePickerShown}"
          @hide=${this.onTimePickerHidden}
        >
          <h2 slot="heading">${this.inputLabel}</h2>
          <mc-time-picker
            class="${classMap(timePickerClasses)}"
            .fit="${this.viewport === 'x-small' ? 'large' : this.fit}"
            .hourstep=${this.hourstep}
            .minutestep=${this.minutestep}
            preselectcurrenttime
            .value=${this.time}
            @timeselected="${this.onTimeSelected}"
            preventinitialeventdispatch
            trapfocus
          ></mc-time-picker>
          <mc-button slot="footer" @click=${this.hidePopOver} label="Ok" disablediconslot disabledlabelslot></mc-button>
        </mc-popover>
      </div>
    `;
  }

  /* lifecycle methods */
  public async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    await super.firstUpdated(changedProperties);

    if (this.value) {
      this.time = this.value as string;
    } else {
      this.value = '';
    }

    this.debouncedSetSelectedTime = debounce(this, this.setSelectedTime, 200);
  }

  public updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('preselectcurrenttime') && this.preselectcurrenttime) {
      this.value = setCurrentTime(this.minutestep);
    }

    if (changedProperties.has('value') && this.value) {
      const valueWithoutColon = (this.value as string).replace(':', '');
      if (this.debouncedSetSelectedTime && valueWithoutColon.length >= 4) {
        this.debouncedSetSelectedTime(this.value);
      }
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.minlength = 5;
    this.maxlength = 5;
    this.trailingicon = 'clock';
    this.autocomplete = 'off';
    this.inputmode = 'numeric';
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /* event handlers */
  private handleKeyDown(event: KeyboardEvent): void {
    const digitsRegex = new RegExp('^[0-9|:]+$');

    // Don't prevent Tab key - it should trigger blur
    if (event.key === 'Tab') {
      return; // Let Tab work normally
    }

    // Prevent non-digit and non-colon characters (except special keys)
    if (
      !digitsRegex.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
    ) {
      event.preventDefault();
    }

    // Always prevent space key
    if (event.key === ' ') {
      event.preventDefault();
      // Open time picker on space (moved from keyup)
      this.timePicker?.focus();
      return;
    }

    // Handle Enter key (moved from keyup)
    if (event.key === 'Enter') {
      this.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, keyCode: event.keyCode }));
      this.setSelectedTime(this.value as string);
      this.mcPopover?.hide();
      this.inputElement?.focus();
      return;
    }

    // Handle Escape key (moved from keyup)
    if (event.key === 'Escape') {
      this.inputElement?.focus();
      return;
    }
  }

  protected override onInputBlur(): void {
    super.onInputBlur();
    if (this.value.length !== 0) {
      const [formattedTime] = timeFormatter(this.value);
      this.value = formattedTime;
    }
  }

  /**
   * Handles `timeselected` event.
   * Sets the value to the selected time and closes the timepicker.
   * @param {CustomEvent} event
   */
  private onTimeSelected(event: CustomEvent): void {
    const time = event.detail.time;
    this.value = time;
    this.setSelectedTime(time);
    this.dispatchEvent(new InputEvent('input'));
  }

  private onTimePickerShown(): void {
    if (this.viewport === 'x-small') {
      this.timePicker?.focus();
    }

    this.timePicker?.show();
  }

  private onTimePickerHidden(): void {
    this.timePicker?.hide();
    this.open = false;
  }

  private hidePopOver(): void {
    this.mcPopover?.hide();
    this.onTimePickerHidden();
  }

  private setSelectedTime(time: string | null | undefined): void {
    if (time) {
      //format time
      const [formattedTime] = timeFormatter(time);

      if (formattedTime !== this.value) {
        this.value = formattedTime;
        this.dispatchEvent(new InputEvent('input'));
      } else {
        this.time = formattedTime;
      }
    }
  }
}

customElements.get('mc-input-time') || customElements.define('mc-input-time', McInputTime);

declare global {
  interface HTMLElementTagNameMap {
    'mc-input-time': McInputTime;
  }
}
