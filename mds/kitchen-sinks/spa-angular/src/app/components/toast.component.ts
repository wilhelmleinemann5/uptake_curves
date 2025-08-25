import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-toast';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-notification';

@Component({
  selector: 'mds-toast',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-toast
    ><mc-button label="Toast" slot="trigger"></mc-button> <mc-notification body="Body text"></mc-notification
  ></mc-toast>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Toast {}
