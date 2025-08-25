import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-step-indicator';

@Component({
  selector: 'mds-step-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-step-indicator style="display: block; width: 80%; margin: 0 auto;"
    ><mc-step-indicator-item state="completed" label="ETD"></mc-step-indicator-item>
    <mc-step-indicator-item state="completed" label="Release Sent"></mc-step-indicator-item>
    <mc-step-indicator-item state="current" label="Carrier Released"></mc-step-indicator-item>
    <mc-step-indicator-item label="ETA" state="pending"></mc-step-indicator-item
  ></mc-step-indicator>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepIndicator {}
