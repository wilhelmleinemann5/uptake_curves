import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-calendar';

@Component({
  selector: 'mds-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-calendar></mc-calendar>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Calendar {}
