import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-menu';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';

@Component({
  selector: 'mds-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-menu>
    <mc-button slot="trigger" icon="bars-horizontal" variant="outlined" appearance="neutral">Menu </mc-button>
    <mc-list>
      <mc-list-item label="One"></mc-list-item>
      <mc-list-item label="Two"></mc-list-item>
      <mc-list-item label="Three"></mc-list-item>
      <mc-list-item label="Four"></mc-list-item>
      <mc-list-item label="Five"></mc-list-item>
    </mc-list>
  </mc-menu>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Menu {}
