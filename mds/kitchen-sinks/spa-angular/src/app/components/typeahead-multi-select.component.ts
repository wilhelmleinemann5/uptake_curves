import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-typeahead-multi-select';

@Component({
  selector: 'mds-typeahead-multi-select',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-typeahead-multi-select
    ><mc-option value="One">One</mc-option>
    <mc-option value="Two">Two</mc-option>
    <mc-option value="Three" disabled>Three</mc-option>
    <mc-option value="Four">Four</mc-option>
    <mc-option value="Five">Five</mc-option></mc-typeahead-multi-select
  >`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypeaheadMultiSelect {}
