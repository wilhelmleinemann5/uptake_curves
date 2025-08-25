import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-card';

@Component({
  selector: 'mds-card',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-card heading="Test"></mc-card>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Card {}
