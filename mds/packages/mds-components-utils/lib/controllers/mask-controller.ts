import { ReactiveController, ReactiveControllerHost } from 'lit';
import IMask from 'imask';
import type { Mask } from '@maersk-global/mds-shared-types';
import type { InputMask, FactoryArg } from 'imask';

export class MaskController implements ReactiveController {
  host: ReactiveControllerHost | null = null;
  mask: InputMask<FactoryArg> | null = null;
  maskOptions: Mask | string | undefined = undefined;
  inputElement: HTMLInputElement | null = null;
  constructor(host: ReactiveControllerHost, maskOptions: Mask | string, inputElement: HTMLInputElement) {
    this.host = host;
    this.inputElement = inputElement;
    this.maskOptions = maskOptions;
    this.host.addController(this);
  }

  hostConnected(): void {
    if (this.inputElement && this.maskOptions) {
      if (typeof this.maskOptions === 'string' || this.maskOptions instanceof RegExp) {
        this.mask = IMask(this.inputElement, { mask: this.maskOptions } as FactoryArg);
      } else {
        this.mask = IMask(this.inputElement, { ...this.maskOptions } as FactoryArg);
      }
    }
  }

  hostDisconnected(): void {
    this.host = null;
    this.inputElement = null;
    this.destroyMask();
  }

  public get unmaskedValue(): string {
    return this.mask?.unmaskedValue || '';
  }

  public get maskedValue(): string {
    return this.mask?.value || '';
  }

  updateOptions(options: Mask | string | RegExp): void {
    if (typeof options === 'string' || options instanceof RegExp) {
      this.mask?.updateOptions({ mask: options });
    } else {
      this.mask?.updateOptions(options);
    }
  }

  destroyMask(): void {
    this.mask?.destroy();
  }

  onAccept(handler: () => void): InputMask<FactoryArg> | undefined {
    return this.mask?.on('accept', handler);
  }

  onComplete(handler: () => void): InputMask<FactoryArg> | undefined {
    return this.mask?.on('complete', handler);
  }
}
