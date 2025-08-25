import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-pagination';

@Component({
  selector: 'mds-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-pagination totalpages="5"></mc-pagination>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Pagination {}
