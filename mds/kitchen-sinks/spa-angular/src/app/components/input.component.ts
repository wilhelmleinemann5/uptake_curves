import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-input';

@Component({
  selector: 'mds-input',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-input label="Test"></mc-input>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Input {}
