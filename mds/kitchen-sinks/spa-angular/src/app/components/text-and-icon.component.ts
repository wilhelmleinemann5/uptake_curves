import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-text-and-icon';

@Component({
  selector: 'mds-text-and-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-text-and-icon icon="star">Test</mc-text-and-icon>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TextAndIcon {}
