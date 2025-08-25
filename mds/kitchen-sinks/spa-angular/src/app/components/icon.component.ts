import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-icon';

@Component({
  selector: 'mds-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-icon icon="star"></mc-icon>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Icon {}
