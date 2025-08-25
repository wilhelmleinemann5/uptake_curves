import { addons } from 'storybook/manager-api';
import maersk from './themes/maersk';
import version from './version.json';

addons.setConfig({
  theme: maersk,
  enableShortcuts: false,
});

window.addEventListener('load', function () {
  const versionContainer = document.createElement('div');
  versionContainer.className = 'version-container';
  versionContainer.innerHTML = `MDS UI ${version.version}`;
  document.querySelector('body')?.appendChild(versionContainer);
});
