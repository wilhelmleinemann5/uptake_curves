import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-button';

@Component({
  selector: 'mds-button',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-button icon="star" label="Test"></mc-button>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Button {}
