import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-table';

@Component({
  selector: 'mds-table',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-table [data]="data"></mc-table>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Table implements OnInit {
  data: any[] = [];
  ngOnInit() {
    this.data = [
      {
        id: 1,
        name: 'Madrid Maersk',
        built: 2017,
      },
      {
        id: 2,
        name: 'Mary Maersk',
        built: 2013,
      },
    ];
  }
}
