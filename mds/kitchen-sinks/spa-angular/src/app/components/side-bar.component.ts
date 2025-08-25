import { Component, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@maersk-global/mds-components-core-side-bar';

@Component({
  selector: 'mds-side-bar',
  standalone: true,
  imports: [CommonModule],
  template: `<mc-side-bar
    ><nav role="navigation" aria-label="side navigation">
      <ol>
        <li>
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com">Apple</a>
        </li>
        <li>
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com">Orange</a>
        </li>
        <li>
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com">Lemon</a>
        </li>
      </ol>
    </nav></mc-side-bar
  >`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SideBar {}
