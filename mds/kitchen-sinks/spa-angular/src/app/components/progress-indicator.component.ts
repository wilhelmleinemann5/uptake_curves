import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-progress-indicator';

@Component({
  selector: 'mds-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-progress-indicator label="progress indicator"></mc-progress-indicator>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgressIndicator {}
