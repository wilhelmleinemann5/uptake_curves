import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-modal';

@Component({
  selector: 'mds-modal',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-button id="open-modal" appearance="primary" (click)="handleOpenModal()">Modal</mc-button>
    <mc-modal heading="Heading" [open]="isOpen">
      <span class="mds-text--medium-normal">
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
        venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        <p>
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
          ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        </p>
      </span>
      <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">OK</mc-button>
      <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
    </mc-modal>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Modal implements OnInit {
  isOpen = false;
  ngOnInit() {}
  handleOpenModal() {
    this.isOpen = true;
  }
}
