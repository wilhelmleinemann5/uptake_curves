import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-list';

@Component({
  selector: 'mds-list',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-list>
    <mc-list-item label="One"></mc-list-item>
    <mc-list-item label="Two"></mc-list-item>
    <mc-list-item label="Three"></mc-list-item>
    <mc-list-item label="Four"></mc-list-item>
    <mc-list-item label="Five"></mc-list-item>
  </mc-list>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class List {}
