import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-hint';

@Component({
  selector: 'mds-hint',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-hint hint="Test"></mc-hint>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Hint {}
