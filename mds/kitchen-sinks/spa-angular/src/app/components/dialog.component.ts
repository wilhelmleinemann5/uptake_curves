import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-dialog';

@Component({
  selector: 'mds-dialog',
  standalone: true,
  imports: [CommonModule],
  template: ` <mc-button id="open-dialog" appearance="primary" (click)="handleDialogOpen()">Dialog</mc-button>
    <mc-dialog heading="Heading" [open]="isOpen">
      <span class="mds-text--medium-normal" id="dialog-content">
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
        venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        <p>
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
          ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        </p>
      </span>
      <mc-button slot="primaryAction" appearance="primary" dialogaction="ok" (click)="handleDialogOpen()">OK</mc-button>
      <mc-button
        id="cancel-dialog"
        (click)="handleDialogOpen()"
        slot="secondaryAction"
        appearance="neutral"
        variant="outlined"
        dialogaction="cancel"
        >Cancel</mc-button
      >
    </mc-dialog>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dialog implements OnInit {
  isOpen = false;
  ngOnInit() {}
  handleDialogOpen() {
    this.isOpen = !this.isOpen;
  }
}
