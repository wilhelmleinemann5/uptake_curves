import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-multi-select';
import '@maersk-global/mds-components-core-option';

@Component({
  selector: 'mds-multi-select',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-multi-select
    ><mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option></mc-multi-select
  >`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultiSelect {}
