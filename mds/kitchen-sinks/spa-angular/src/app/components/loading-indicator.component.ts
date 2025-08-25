import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-loading-indicator';

@Component({
  selector: 'mds-loading-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-loading-indicator></mc-loading-indicator>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadingIndicator {}
