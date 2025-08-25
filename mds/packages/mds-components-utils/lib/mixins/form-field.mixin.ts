import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
type Constructor<T> = new (...args: any[]) => T;

export declare class FormFieldInterface {
  name: string;
  type: string | null | undefined;
  required?: boolean;
  addMirroredHiddenInput(): void;
}
/*
 * Constructor is set to any type, because with the upgrade to the latest lit version, we started getting an error during usage:
 * Argument of type 'typeof LitElement' is not assignable to parameter of type 'Constructor<LitElement>'.
 * This is probably a bug on Lit side and the Lit team has been informed.
 */
export const FormField = <T extends Constructor<any>>(superClass: T): Constructor<FormFieldInterface> & T => {
  class FormFieldElement extends superClass {
    @property({ type: String, reflect: true })
    public name?: string;

    @property({ type: String, reflect: true })
    public value?: string | Array<string | unknown> | null;

    @property({ type: Boolean, reflect: true })
    public checked?: boolean;

    @property({ type: Object })
    public files?: FileList;

    @property({ type: String })
    public type?: string;

    @property({ type: Boolean })
    public required?: boolean;

    private hiddenInput?: HTMLInputElement;
    protected controlType?: string;

    private get isCheckable(): boolean {
      return this.controlType === 'radio' || this.controlType === 'checkbox' || this.controlType === 'switch';
    }

    private get inputType(): string {
      return this.type ? this.type : 'text';
    }

    public firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated?.(changedProperties);
      this.addMirroredHiddenInput();
    }

    public updated(changedProperties: PropertyValues): void {
      super.updated?.(changedProperties);
      this.handleValueChanged(changedProperties);
    }

    private handleValueChanged(changedProperties: PropertyValues): void {
      if (this.name && changedProperties) {
        if (changedProperties.has('value') || changedProperties.has('checked') || changedProperties.has('files')) {
          this.setValue();
        }
      }
    }

    public addMirroredHiddenInput(): void {
      if (this.name) {
        this.hiddenInput = document.createElement('input');
        this.hiddenInput.setAttribute('type', this.inputType);
        this.hiddenInput.setAttribute('name', this.name);
        this.hiddenInput.setAttribute('style', 'display:none');
        this.hiddenInput.setAttribute('aria-hidden', 'true');
        this.hiddenInput.setAttribute('tabIndex', '-1');
        if (this.required) {
          this.hiddenInput.setAttribute('required', '');
        }
        this.setValue();
        (this as unknown as HTMLElement).prepend(this.hiddenInput);
      }
    }

    private setValue(): void {
      this.hiddenInput?.setAttribute('value', typeof this.value === 'string' ? this.value : JSON.stringify(this.value));

      if (this.isCheckable && this.hiddenInput) {
        if (this.checked && this.name) {
          this.hiddenInput.setAttribute('name', this.name);
        } else {
          this.hiddenInput.removeAttribute('name');
          this.hiddenInput.removeAttribute('value');
        }
      }
      if (this.files) {
        (this.hiddenInput as { files: FileList }).files = this.files;
      }

      if (this.controlType !== 'input' && this.controlType !== 'textarea' && this.controlType !== 'file') {
        (this as unknown as HTMLElement).dispatchEvent(
          new CustomEvent('input', { detail: this.isCheckable ? this.checked : this.value }),
        );
      }
    }
  }
  return FormFieldElement as Constructor<FormFieldInterface> & T;
};
