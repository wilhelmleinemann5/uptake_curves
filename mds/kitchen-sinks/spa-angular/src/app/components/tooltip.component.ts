import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-tooltip';
import '@maersk-global/mds-components-core-button';

@Component({
  selector: 'mds-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-tooltip
    ><mc-button slot="trigger">Trigger</mc-button> <span>The HTML content of the tooltip</span></mc-tooltip
  >`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tooltip {}
