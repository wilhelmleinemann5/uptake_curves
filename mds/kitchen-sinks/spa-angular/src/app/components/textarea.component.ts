import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-textarea';

@Component({
  selector: 'mds-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-textarea label="Test"></mc-textarea>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Textarea {}
