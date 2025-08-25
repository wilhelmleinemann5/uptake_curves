import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-checkbox-group';
import '@maersk-global/mds-components-core-checkbox';

@Component({
  selector: 'mds-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-checkbox-group legend="Please select options">
    <mc-checkbox name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
    <mc-checkbox name="fruit" value="Orange" label="Orange"></mc-checkbox>
    <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
    <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
  </mc-checkbox-group>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxGroup {}
