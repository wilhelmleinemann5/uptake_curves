import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-avatar';

@Component({
  selector: 'mds-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-avatar info="info" appearance="color-1"></mc-avatar>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Avatar {}
