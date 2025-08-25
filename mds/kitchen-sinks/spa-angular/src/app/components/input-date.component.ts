import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-input-date';

@Component({
  selector: 'mds-input-date',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-input-date></mc-input-date>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputDate {}
