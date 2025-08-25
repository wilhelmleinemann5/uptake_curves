import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
type Constructor<T> = new (...args: any[]) => T;

export declare class CheckableInterface {
  checked: boolean;
  value?: string;
  updateValue: () => void;
}
/*
 * Constructor is set to any type, because with the upgrade to the latest lit version, we started getting an error during usage:
 * Argument of type 'typeof LitElement' is not assignable to parameter of type 'Constructor<LitElement>'.
 * This is probably a bug on Lit side and the Lit team has been informed.
 */
export const Checkable = <T extends Constructor<any>>(superClass: T): Constructor<CheckableInterface> & T => {
  class CheckableElement extends superClass {
    public cachedValue?: string | boolean;
    private _value?: string | boolean;

    @property({ type: Boolean, reflect: true })
    public checked = false;

    @property({ type: String, reflect: true })
    public get value(): string | boolean | undefined {
      return this._value;
    }

    public set value(value: string | boolean | undefined) {
      this.cachedValue = value === undefined || value === '' || value === false ? true : value;
      this._value = value;
    }

    public async firstUpdated(changedProperties: PropertyValues): Promise<void> {
      super.firstUpdated(changedProperties);
      this.updateValue();
    }

    public updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);

      if (changedProperties.has('checked')) {
        this.updateValue();
      }
    }

    private updateValue(): void {
      this._value = this.checked ? this.cachedValue : false;
    }
  }
  return CheckableElement as Constructor<CheckableInterface> & T;
};
