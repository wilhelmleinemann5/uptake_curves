import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-date-range';

@Component({
  selector: 'mds-date-range',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-date-range></mc-date-range>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DateRange {}
