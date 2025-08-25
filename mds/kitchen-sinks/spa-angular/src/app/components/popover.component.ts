import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-button';

@Component({
  selector: 'mds-popover',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-popover>
    <mc-button slot="trigger">Popover</mc-button>
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 0.5em;">
      <h1 style="margin: 0">Available capacity</h1>
      <span>This vessel has 50% capacity left.</span>
      <mc-button label="Book"></mc-button>
    </div>
  </mc-popover>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Popover {}
