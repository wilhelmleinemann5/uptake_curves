import { property } from 'lit/decorators.js';
type Constructor<T> = new (...args: any[]) => T;

export declare class IDisabledState {
  disabled: boolean;
}

export const DisabledState = <T extends Constructor<any>>(superClass: T): T & Constructor<IDisabledState> => {
  class DisabledStateMixinClass extends superClass {
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    connectedCallback(): void {
      super.connectedCallback();

      (this as unknown as HTMLElement).addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    private onMouseDown(e: MouseEvent): void {
      if (this.disabled) {
        if (e.detail > 1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
        (this as unknown as HTMLElement).addEventListener('click', this.captureClick, true);
      }
    }

    private captureClick(e: MouseEvent): void {
      e.stopPropagation();
      (this as unknown as HTMLElement).removeEventListener('click', this.captureClick, true);
    }
  }
  return DisabledStateMixinClass as T & Constructor<IDisabledState>;
};
