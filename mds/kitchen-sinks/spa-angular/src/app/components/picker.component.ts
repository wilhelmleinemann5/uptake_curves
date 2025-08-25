import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-picker';

@Component({
  selector: 'mds-picker',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-picker data-cy="mc-picker">
    <mc-picker-item value="1" label="Apple"></mc-picker-item>
    <mc-picker-item value="2" label="Orange"></mc-picker-item>
    <mc-picker-item value="3" label="Banana"></mc-picker-item>
    <mc-picker-item value="4" label="Apricot"></mc-picker-item>
    <mc-picker-item value="5" label="Kiwi"></mc-picker-item>
    <mc-picker-item value="6" label="Passion fruit"></mc-picker-item>
    <mc-picker-item value="7" label="Dragon fruit"></mc-picker-item>
    <mc-picker-item value="8" label="Plum"></mc-picker-item>
    <mc-picker-item value="9" label="Avocado"></mc-picker-item>
  </mc-picker>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Picker {}
