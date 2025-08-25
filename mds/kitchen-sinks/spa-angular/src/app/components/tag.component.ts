import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-tag';

@Component({
  selector: 'mds-tag',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-tag>Test</mc-tag>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tag {}
