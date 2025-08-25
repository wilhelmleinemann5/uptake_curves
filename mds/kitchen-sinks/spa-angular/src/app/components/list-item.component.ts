import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-list-item';

@Component({
  selector: 'mds-list-item',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-list-item icon="star" label="Test"></mc-list-item>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListItem {}
