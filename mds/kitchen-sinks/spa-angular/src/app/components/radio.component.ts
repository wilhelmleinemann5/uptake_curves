import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-radio';

@Component({
  selector: 'mds-radio',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-radio label="Test"></mc-radio>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Radio {}
