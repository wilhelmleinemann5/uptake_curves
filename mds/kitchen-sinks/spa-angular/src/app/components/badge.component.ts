import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-badge';
import '@maersk-global/mds-components-core-button';

@Component({
  selector: 'mds-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-button label="Test">
    <mc-badge slot="badge" label="Test"></mc-badge>
  </mc-button>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Badge {}
