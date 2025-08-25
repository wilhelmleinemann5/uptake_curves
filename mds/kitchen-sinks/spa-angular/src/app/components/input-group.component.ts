import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-input-group';

@Component({
  selector: 'mds-input-group',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-input-group>
    <mc-select hiddenlabel label="country code" placeholder="+40">
      <mc-option value="+40">+40</mc-option>
      <mc-option value="+44">+44</mc-option>
      <mc-option value="+45">+45</mc-option>
    </mc-select>
    <mc-input hiddenlabel label="phone" placeholder="999 999 999"></mc-input>
  </mc-input-group>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputGroup {}
