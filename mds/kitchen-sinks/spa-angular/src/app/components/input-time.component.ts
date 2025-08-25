import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-input-time';

@Component({
  selector: 'mds-input-time',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-input-time label="Test"></mc-input-time>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputTime {}
