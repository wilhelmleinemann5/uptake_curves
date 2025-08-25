import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-picker-item';

@Component({
  selector: 'mds-picker-item',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-picker-item data-cy="mc-picker-item" label="Test"></mc-picker-item>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PickerItem {}
