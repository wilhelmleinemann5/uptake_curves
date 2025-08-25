import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-button-group';

@Component({
  selector: 'mds-button-group',
  standalone: true,
  imports: [CommonModule],
  template: ` <mc-button-group selectiontype="single">
    <mc-button-group-item value="Apple" label="Apple"></mc-button-group-item>
    <mc-button-group-item value="Apricot" label="Apricot"></mc-button-group-item>
    <mc-button-group-item value="Artichoke" label="Artichoke"></mc-button-group-item>
  </mc-button-group>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonGroup {}
