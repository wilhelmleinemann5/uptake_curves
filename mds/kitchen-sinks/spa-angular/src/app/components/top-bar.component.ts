import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-top-bar';

@Component({
  selector: 'mds-top-bar',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-top-bar product="Test"></mc-top-bar>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopBar {}
