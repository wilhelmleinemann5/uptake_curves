import { getStoredShowCode } from './generate-code';

const defaultBrand = 'maersk';
const defaultTheme = 'light';

export const getStoredBrand = (): string => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const retval = localStorage.getItem('mds-sb-selected-brand') || defaultBrand;
    return ['maersk', 'apmterminals', 'alianca', 'apmterminalsexperimental'].includes(retval) ? retval : defaultBrand;
  }
  return defaultBrand;
};

export const getStoredTheme = (): string => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const retval = localStorage.getItem('mds-sb-selected-theme') || defaultTheme;
    return ['light', 'dark'].includes(retval) ? retval : defaultTheme;
  }
  return defaultTheme;
};

let currentBrand = getStoredBrand();
let currentTheme = getStoredTheme();
const showCode = getStoredShowCode();

const changeBrand = (e: CustomEvent) => {
  const newBrand = e.detail.value;
  currentBrand = newBrand;

  localStorage.setItem('mds-sb-selected-brand', newBrand);

  const oldStylesheet = document.querySelector('#theme-stylesheet');
  const oldThemeUrl = oldStylesheet ? oldStylesheet.getAttribute('href') : '';
  if (oldStylesheet) {
    oldStylesheet.remove();
  }

  // Add new stylesheet - replace only the brand part in the URL
  const newLink = document.createElement('link');
  const newThemeUrl = oldThemeUrl?.replace(/(maersk|apmterminals|alianca|apmterminalsexperimental)/, newBrand);

  // Check if newThemeUrl is valid before appending
  if (newThemeUrl) {
    newLink.rel = 'stylesheet';
    newLink.href = newThemeUrl;
    newLink.id = 'theme-stylesheet';
    document.head.appendChild(newLink);
  }

  window.dispatchEvent(new CustomEvent('mds-brand-changed'));
};

const changeToggleCode = (e: CustomEvent) => {
  localStorage.setItem('mds-sb-show-code', showCode === 'true' ? 'false' : 'true');
  window.dispatchEvent(new CustomEvent('mds-toggle-code-changed'));
};

const changeToggleCodeMDSDocs = (e: CustomEvent) => {
  const showCodeValueToStore = showCode === 'true' ? 'false' : 'true';
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get('mdsdocsuuid') || '';
  localStorage.setItem('mds-sb-show-code', showCodeValueToStore);
  window.parent.postMessage({ key: 'reload', showCode: showCodeValueToStore, uuid: uuid }, { targetOrigin: '*' });
};

const changeTheme = (e: MouseEvent) => {
  // Toggle theme
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';

  localStorage.setItem('mds-sb-selected-theme', currentTheme);

  const oldStylesheet = document.querySelector('#theme-stylesheet');
  const oldThemeUrl = oldStylesheet ? oldStylesheet.getAttribute('href') : '';
  if (oldStylesheet) {
    oldStylesheet.remove();
  }

  // Add new stylesheet - replace only the theme part in the URL
  const newLink = document.createElement('link');
  const newThemeUrl = oldThemeUrl?.replace(/(light|dark)/, currentTheme);

  // Check if newThemeUrl is valid before appending
  if (newThemeUrl) {
    newLink.rel = 'stylesheet';
    newLink.href = newThemeUrl;
    newLink.id = 'theme-stylesheet';
    document.head.appendChild(newLink);
  }
  window.dispatchEvent(new CustomEvent('mds-theme-changed'));

  // Update the button icon and label to reflect current theme
  const themeButton = document.querySelector('#theme-selector') as HTMLElement;
  if (themeButton) {
    themeButton.setAttribute('icon', currentTheme === 'light' ? 'moon' : 'sun');
    themeButton.setAttribute('label', currentTheme);
  }
};

if (typeof window !== 'undefined') {
  (window as any).changeBrand = changeBrand;
  (window as any).changeTheme = changeTheme;
  (window as any).changeToggleCode = changeToggleCode;
  (window as any).changeToggleCodeMDSDocs = changeToggleCodeMDSDocs;
}

export const generateThemeSelector = (renderThemeSelector = true): string => {
  if (typeof window !== 'undefined' && typeof URLSearchParams !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('mdsdocs')) {
      return `
    <div style="width: 100%; display: flex; justify-content: flex-end;"><mc-button id="toggle-code" appearance="neutral" variant="plain" trailingicon="${showCode === 'true' ? 'eye-slash' : 'eye'}" label="${showCode === 'true' ? 'Hide code' : 'Show code'}" fit="small"></mc-button></div>
    <script>
      setTimeout(() => {
        const toggleCode = document.querySelector('#toggle-code');
        if (toggleCode) {
          toggleCode.addEventListener('click', window.changeToggleCodeMDSDocs);
        }
      }, 100);
    </script>
      `;
    }
  }

  return `
    <div aria-hidden="true" style="display: flex; width:100%; padding: 8px; justify-content: flex-end; border-width: 1px; border-style: solid; border-radius: var(--mds_brand_border_medium_radius); margin-bottom: 32px;" class="mds-neutral--weakest__background-color mds-neutral--weak__border-color">
      <div style="display: flex; gap: 8px; align-items: center;">
        ${
          renderThemeSelector
            ? `
         <mc-select id="brand-selector" hiddenlabel label="Select brand" value="${currentBrand}" fit="small">
          <mc-option value="maersk" label="Maersk"></mc-option>
          <mc-option value="apmterminals" label="APMT"></mc-option>
          <mc-option value="alianca" label="Aliança"></mc-option>
          <mc-option value="apmterminalsexperimental" label="APMT 🧪"></mc-option>
        </mc-select>
        <mc-button id="theme-selector" appearance="neutral" variant="plain" icon="${currentTheme === 'light' ? 'moon' : 'sun'}" label="${currentTheme}" hiddenlabel fit="small"></mc-button>
        <div class="mds-neutral--weakest__text-color">|</div>`
            : ''
        }
        <mc-button id="toggle-code" appearance="neutral" variant="plain" trailingicon="${showCode === 'true' ? 'eye-slash' : 'eye'}" label="${showCode === 'true' ? 'Hide code' : 'Show code'}" fit="small"></mc-button>
      </div>
    </div>
    <script>
      setTimeout(() => {
        const brandList = document.querySelector('#brand-selector');
        if (brandList && !brandList.hasAttribute('data-listener-added')) {
          brandList.addEventListener('optionselected', window.changeBrand);
          brandList.setAttribute('data-listener-added', 'true');
        }
        const themeList = document.querySelector('#theme-selector');
        if (themeList && !themeList.hasAttribute('data-listener-added')) {
          themeList.addEventListener('click', window.changeTheme);
          themeList.setAttribute('data-listener-added', 'true');
        }
        const toggleCode = document.querySelector('#toggle-code');
        if (toggleCode) {
          toggleCode.addEventListener('click', window.changeToggleCode);
        }
      }, 100);
    </script>`;
};

if (typeof window !== 'undefined') {
  window.addEventListener('mds-theme-changed', () => {
    window.location.reload();
  });

  window.addEventListener('mds-brand-changed', () => {
    window.location.reload();
  });

  window.addEventListener('mds-toggle-code-changed', () => {
    window.location.reload();
  });
}
