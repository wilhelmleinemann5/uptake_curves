import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-radio-group';
import '@maersk-global/mds-components-core-radio';

@Component({
  selector: 'mds-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-radio-group legend="Please select options">
    <mc-radio name="fruit" value="Apple" label="Apple" checked></mc-radio>
    <mc-radio name="fruit" value="Orange" label="Orange"></mc-radio>
    <mc-radio name="fruit" value="Banana" label="Banana"></mc-radio>
    <mc-radio name="fruit" value="Lemon" label="Lemon"></mc-radio>
  </mc-radio-group>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioGroup {}
