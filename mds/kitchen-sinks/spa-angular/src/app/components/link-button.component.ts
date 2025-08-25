import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-link-button';

@Component({
  selector: 'mds-link-button',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-link-button href="http://maersk.com">Test</mc-link-button>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LinkButton {}
