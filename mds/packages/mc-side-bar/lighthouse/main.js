import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
Mc-side-bar with links
<mc-side-bar>
  <nav role="navigation" aria-label="side navigation">
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
  </nav>
</mc-side-bar>
`;
