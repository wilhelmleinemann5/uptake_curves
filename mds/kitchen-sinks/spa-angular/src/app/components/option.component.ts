import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-option';

@Component({
  selector: 'mds-option',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-option icon="star" label="Test"></mc-option>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Option {}
