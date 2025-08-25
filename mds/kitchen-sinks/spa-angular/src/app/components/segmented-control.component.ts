import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-segmented-control';
import '@maersk-global/mds-components-core-segmented-control-item';

@Component({
  selector: 'mds-segmented-control',
  standalone: true,
  imports: [CommonModule],
  template: ` <mc-segmented-control>
    <mc-segmented-control-item value="Apple" label="Apple"></mc-segmented-control-item>
    <mc-segmented-control-item value="Apricot" label="Apricot"></mc-segmented-control-item>
    <mc-segmented-control-item value="Artichoke" label="Artichoke"></mc-segmented-control-item>
  </mc-segmented-control>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SegmentedControl {}
