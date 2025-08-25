import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-select-native';
const options = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
@Component({
  selector: 'mds-select-native',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-select-native [options]="options" selectedindex="[0]"></mc-select-native>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectNative {
  options = options;
}
