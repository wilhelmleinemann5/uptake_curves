import { McMultiChoiceFieldset } from '@maersk-global/mds-components-core-multi-choice-fieldset';
/**
 * @element `mc-radio-group`
 * @extends McMultiChoiceFieldset
 *
 * @event change - Fired when any radio in the group is checked.
 *
 * @slot - One or more `<mc-radio>` elements to display in the group.
 * @slot `legend` - The legend HTML to use for the mc-radio-group.
 * @slot `hint` - The hint HTML to use for the mc-radio-group.
 * @slot `errormessage` - The errormessage HTML to use for the mc-radio-group.
 *
 * @part `fieldset-container` - The container of the fieldset that holds the radio buttons.
 */

export class McRadioGroup extends McMultiChoiceFieldset {
  private boundHandleClick: (event: MouseEvent) => void;
  private boundHandleKeyDown: (event: KeyboardEvent) => void;

  public constructor() {
    super();
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
  }
  public connectedCallback(): void {
    super.connectedCallback();
    if (this.shadowRoot) {
      this.setupEventListeners();
    }
  }

  private setupEventListeners(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.addEventListener('click', this.boundHandleClick, true);
    this.shadowRoot.addEventListener('keydown', this.boundHandleKeyDown, true);
    this.shadowRoot.addEventListener('change', (e) => e.stopPropagation(), true);
  }
  private updateRadioStates(selectedInput: HTMLInputElement): void {
    if (!selectedInput) return;
    this.inputs?.forEach((input) => {
      const shouldBeChecked = input === selectedInput;
      input.checked = shouldBeChecked;
      if (input instanceof HTMLElement) {
        if (shouldBeChecked) {
          input.setAttribute('checked', '');
        } else {
          input.removeAttribute('checked');
        }
      }
    });
    this.value = selectedInput.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
  }
  private handleKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (target.localName === 'mc-radio') {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const radios = Array.from(this.inputs || []);
      const currentIndex = radios.indexOf(target);
      let nextIndex;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = currentIndex + 1;
          if (nextIndex >= radios.length) nextIndex = 0;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) nextIndex = radios.length - 1;
          break;
      }
      const selectedRadio = radios[nextIndex];
      (selectedRadio as HTMLElement).focus();
      this.updateRadioStates(selectedRadio as HTMLInputElement);
    }
  }
  public handleClick(event: MouseEvent): void {
    const target = event.target as HTMLInputElement;
    if (target.localName === 'mc-radio' && !target.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.updateRadioStates(target);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-radio-group': McRadioGroup;
  }
}

customElements.get('mc-radio-group') || customElements.define('mc-radio-group', McRadioGroup);
