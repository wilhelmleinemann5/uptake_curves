import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-file-upload';

@Component({
  selector: 'mds-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-file-upload></mc-file-upload>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FileUpload {}
