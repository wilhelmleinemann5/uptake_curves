import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-notification';

@Component({
  selector: 'mds-notification',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-notification heading="Heading" body="Body text"></mc-notification>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Notification {}
