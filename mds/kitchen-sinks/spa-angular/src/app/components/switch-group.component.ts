import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-switch-group';
import '@maersk-global/mds-components-core-switch';

@Component({
  selector: 'mds-switch-group',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-switch-group legend="Please select options">
    <mc-switch name="fruit" value="Apple" label="Apple" checked></mc-switch>
    <mc-switch name="fruit" value="Orange" label="Orange"></mc-switch>
    <mc-switch name="fruit" value="Banana" label="Banana"></mc-switch>
    <mc-switch name="fruit" value="Lemon" label="Lemon"></mc-switch>
  </mc-switch-group>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwitchGroup {}
