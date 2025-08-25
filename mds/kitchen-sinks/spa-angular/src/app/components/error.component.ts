import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-error';

@Component({
  selector: 'mds-error',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-error invalid errormessage="Test"></mc-error>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Error {}
