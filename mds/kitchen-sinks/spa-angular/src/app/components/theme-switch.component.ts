import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-theme-switch';

@Component({
  selector: 'mds-theme-switch',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-theme-switch></mc-theme-switch>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThemeSwitch {}
