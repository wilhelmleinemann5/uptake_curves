import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-time-picker';

@Component({
  selector: 'mds-time-picker',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-time-picker data-cy="mc-time-picker"></mc-time-picker>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimePicker {}
