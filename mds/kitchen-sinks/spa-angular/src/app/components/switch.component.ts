import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-switch';

@Component({
  selector: 'mds-switch',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-switch label="Test"></mc-switch>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Switch {}
