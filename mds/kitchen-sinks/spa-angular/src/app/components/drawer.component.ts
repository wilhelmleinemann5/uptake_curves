import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-drawer';

@Component({
  selector: 'mds-drawer',
  standalone: true,
  imports: [CommonModule],
  template: ` <mc-button id="open-drawer" appearance="primary" (click)="handleDrawerOpen()">drawer</mc-button>
    <mc-drawer heading="Heading" [open]="isOpen">
      <span class="mds-text--medium-normal">
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
        venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        <p>
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
          ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        </p>
      </span>
      <mc-button slot="footer" appearance="primary" dialogaction="ok">OK</mc-button>
      <mc-button id="cancel-drawer" slot="footer" appearance="neutral" variant="outlined" dialogaction="cancel"
        >Cancel</mc-button
      >
    </mc-drawer>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Drawer implements OnInit {
  isOpen = false;
  ngOnInit() {}
  handleDrawerOpen() {
    this.isOpen = true;
  }
}
