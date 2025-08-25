import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-number-stepper';

@Component({
  selector: 'mds-number-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-number-stepper label="Test"></mc-number-stepper>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NumberStepper {}
