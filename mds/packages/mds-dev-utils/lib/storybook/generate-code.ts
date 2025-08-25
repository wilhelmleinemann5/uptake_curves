import { html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { pascalCase } from 'change-case';
import { styleMap } from 'lit/directives/style-map.js';

type Result = {
  label?: string;
  language?: string;
  template?: string;
  script?: string;
};

const languages = ['Vue3', 'React', 'VanillaJs', 'Angular', 'Vue2', 'Lit'];
const propNamePlaceholder = '{{%}}';
const propValuePlaceholder = '{{*}}';
const componentNamePlaceholder = '{{componentName}}';
const sbControls = [
  {
    name: ['select', 'text', 'color', 'select'],
    type: 'string',
    templates: [
      { name: 'Angular', template: `${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'Lit', template: `${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'React', template: `${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'VanillaJs', template: `${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'Vue2', template: `${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'Vue3', template: `${propNamePlaceholder}="${propValuePlaceholder}"` },
    ],
  },
  {
    name: ['number'],
    type: 'number',
    templates: [
      { name: 'Angular', template: `[${propNamePlaceholder}]="${propValuePlaceholder}"` },
      { name: 'Lit', template: `.${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'React', template: `${propNamePlaceholder}={${propValuePlaceholder}}` },
      {
        name: 'VanillaJs',
        template: `${propNamePlaceholder}="${propValuePlaceholder}"`,
      },
      { name: 'Vue2', template: `:${propNamePlaceholder}.prop="${propValuePlaceholder}"` },
      { name: 'Vue3', template: `:${propNamePlaceholder}="${propValuePlaceholder}"` },
    ],
  },
  {
    name: ['boolean'],
    type: 'boolean',
    templates: [
      { name: 'Angular', template: `${propNamePlaceholder}` },
      { name: 'Lit', template: `${propNamePlaceholder}` },
      { name: 'React', template: `${propNamePlaceholder}` },
      {
        name: 'VanillaJs',
        template: `${propNamePlaceholder}`,
      },
      { name: 'Vue2', template: `${propNamePlaceholder}` },
      { name: 'Vue3', template: `${propNamePlaceholder}` },
    ],
  },
  {
    name: ['object', 'multi-select', 'array'],
    type: 'property',
    templates: [
      { name: 'Angular', template: `[${propNamePlaceholder}]="${propValuePlaceholder}"` },
      { name: 'Lit', template: `.${propNamePlaceholder}="${propValuePlaceholder}"` },
      { name: 'React', template: `${propNamePlaceholder}={${propValuePlaceholder}}` },
      {
        name: 'VanillaJs',
        template: `document.querySelector('${componentNamePlaceholder}').${propNamePlaceholder}=${propValuePlaceholder};`,
      },
      { name: 'Vue2', template: `:${propNamePlaceholder}.prop="${propValuePlaceholder}"` },
      { name: 'Vue3', template: `:${propNamePlaceholder}="${propValuePlaceholder}"` },
    ],
  },
  {
    name: ['event'],
    type: 'event',
    templates: [
      { name: 'Angular', template: `(${propNamePlaceholder})="yourEventHandler(e)"` },
      { name: 'Lit', template: `@${propNamePlaceholder}={yourEventHandler(e)}` },
      { name: 'React', template: `${propNamePlaceholder}={yourEventHandler(e)}` },
      {
        name: 'VanillaJs',
        template: `document.querySelector('${componentNamePlaceholder}').addEventListener('${propNamePlaceholder}', (e) => yourEventHandler(e));`,
      },
      { name: 'Vue2', template: `@${propNamePlaceholder}="yourEventHandler(e)"` },
      { name: 'Vue3', template: `@${propNamePlaceholder}="yourEventHandler(e)"` },
    ],
  },
];

/**
 * Converts a JavaScript object to string representation, including functions
 * @param obj - The object to stringify
 * @returns A string representation of the object with functions preserved
 */
function stringifyWithFunctions(obj: any): string {
  if (!obj) return 'null';

  // Handle primitive types
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return JSON.stringify(obj);
  }

  // Handle functions
  if (typeof obj === 'function') {
    return obj.toString();
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const items = obj.map((item) => stringifyWithFunctions(item));
    return `[${items.join(', ')}]`;
  }

  // Handle objects
  const entries = Object.entries(obj).map(([key, value]) => {
    // Use appropriate quotes for the key
    const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
    return `${formattedKey}: ${stringifyWithFunctions(value)}`;
  });

  return `{${entries.join(', ')}}`;
}
/*
 *
 * How to use generateCode() & mc-c-code-preview in index.stories.ts (without slot):
 * @example
 * import { generateCode } from '@maersk-global/mds-dev-utils';
 * import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
 * import '@maersk-global/community-ui-code-preview';
 * ...
 * export const Documentation = (args) => {
 *   const code = generateCode('mc-c-component', argTypes, args);
 *   return html`
 *     <mc-c-component></mc-c-component>
 *     <mc-c-code-preview fit="small" .code=${code as IMcCCode[]}></mc-c-code-preview>
 *   `;
 * };
 *
 * How to use generateCode() & mc-c-code-preview in index.stories.ts (with slot):
 * @example
 * import { unsafeHTML } from 'lit/directives/unsafe-html.js';
 * import { generateCode } from '@maersk-global/mds-dev-utils';
 * import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
 * import '@maersk-global/community-ui-code-preview';
 * ...
 * export const Documentation = (args) => {
 *   const slot = `slot content`;
 *   const code = generateCode('mc-c-component', argTypes, args, slot);
 *   return html`
 *     <mc-c-component>${unsafeHTML(slot)}</mc-c-component>
 *     <mc-c-code-preview fit="small" .code=${code as IMcCCode[]}></mc-c-code-preview>
 *   `;
 * };
 */
export function generateCode(
  componentTag: string,
  argTypes: any,
  args: any,
  slot: string | null = null,
  extraHeaderCode: string | null = null,
) {
  const results: Result[] = languages.map((language) => ({
    label: language,
    language: 'javascript',
    template: '',
    script: '',
  }));
  for (const propName in argTypes) {
    const sbControlType = argTypes[propName].control.type;
    const control = sbControls.find((control) => control.name.includes(sbControlType));
    getArgs(results, args, argTypes, propName, componentTag, control);
  }
  getTemplate(results, componentTag, slot, extraHeaderCode);
  cleanUp(results);
  return results;
}

function getArgs(results: Result[], args: any, argTypes: any, propName: string, componentTag: string, control: any) {
  const sbControlName = argTypes[propName].name;
  const sbDefaultValue = argTypes[propName].table.defaultValue?.summary;

  for (const item of control?.templates ?? []) {
    if (item) {
      const currentItem = results.find((el) => el.label === item.name);
      if (currentItem) {
        if (
          args[sbControlName] &&
          sbDefaultValue !== args[sbControlName] &&
          (control?.type === 'string' || control?.type === 'number' || control?.type === 'boolean')
        ) {
          currentItem.template += `\n  ${item.template
            .replace(propNamePlaceholder, sbControlName)
            .replace(propValuePlaceholder, args[sbControlName])}`;
        }
        if (control?.type === 'event') {
          if (item.name === 'VanillaJs') {
            currentItem.script += `\n  ${item.template
              .replace(componentNamePlaceholder, componentTag)
              .replace(propNamePlaceholder, sbControlName)}`;
          } else {
            currentItem.template += `\n  ${item.template.replace(propNamePlaceholder, sbControlName)}`;
          }
        }
        if (control?.type === 'property' && args[sbControlName] && sbDefaultValue !== args[sbControlName]) {
          if (item.name === 'VanillaJs') {
            currentItem.script += `\n  ${item.template
              .replace(componentNamePlaceholder, componentTag)
              .replace(propNamePlaceholder, sbControlName)
              .replace(propValuePlaceholder, stringifyWithFunctions(args[sbControlName]).replace(/"/g, "'"))}`;
          } else {
            currentItem.template += `\n  ${item.template
              .replace(propNamePlaceholder, sbControlName)
              .replace(propValuePlaceholder, stringifyWithFunctions(args[sbControlName]).replace(/"/g, "'"))}`;
          }
        }
      }
    }
  }
}

function getTemplate(results: Result[], componentTag: string, slot: string | null, extraHeaderCode: string | null) {
  for (const item of results) {
    item.template = `${getImport(item.label, componentTag, slot)}\n\n${getExtraHeaderCode(extraHeaderCode)}<${getTag(
      item.label,
      componentTag,
    )}${item.template}>${getSlot(item.label, slot)}\n</${getTag(item.label, componentTag)}>${
      item.script ? `\n\n<script>${item.script}\n</script>` : ''
    }`;
  }
}

function getExtraHeaderCode(extraHeaderCode: string | null) {
  if (extraHeaderCode) {
    return `${extraHeaderCode}\n\n`;
  }
  return '';
}

function getImport(label: string | undefined, componentTag: string, slot: string | null) {
  const componentName = componentTag;
  const subComponentImports = getSubComponentImport(label, slot);
  switch (label) {
    case 'Angular':
    case 'Vue2':
    case 'Vue3':
    case 'Lit':
      return `import '@maersk-global/mds-components-core-${componentName.replace(/mc?-/, '')}';${subComponentImports}`;
    case 'React':
      return `import { ${pascalCase(
        componentTag,
      )} } from "@maersk-global/mds-react-wrapper/components-core/${componentName}";${subComponentImports}`;
    case 'VanillaJs':
      return `<script type="module"\n  src="./node_modules/@maersk-global/mds-components-core-${componentName.replace(/mc?-/, '')}/index.js"></script>${subComponentImports}`;
    default:
      return '';
  }
}

function getSubComponentImport(label: string | undefined, slot: string | null) {
  if (slot) {
    const match = slot.match(/mc?-([\w-]+)/g);
    const subComponentTagName = [...new Set(match)];
    if (subComponentTagName.length === 0) return '';
    let subComponentImports = '';
    subComponentTagName.forEach((tag) => {
      const subComponentName = tag.replace(/mc?-/, '');
      switch (label) {
        case 'Angular':
        case 'Vue2':
        case 'Vue3':
        case 'Lit':
          subComponentImports += `\nimport '@maersk-global/mds-components-core-${subComponentName}';`;
          break;
        case 'React':
          subComponentImports += `\nimport { ${pascalCase(
            tag,
          )} } from "@maersk-global/mds-react-wrapper/components-core/mc-${subComponentName}";`;
          break;
        case 'VanillaJs':
          subComponentImports += `\n<script type="module"\n  src="./node_modules/@maersk-global/mds-components-core-${subComponentName}/index.js"></script>`;
          break;
        default:
          subComponentImports += '';
      }
    });
    return subComponentImports;
  }
  return '';
}

function getTag(label: string | undefined, componentTag: string) {
  if (label === 'React') {
    return pascalCase(componentTag);
  } else {
    return componentTag;
  }
}

function getSlot(label: string | undefined, slot: string | null) {
  if (slot) {
    if (label === 'React') {
      return slot.replace(/mc-([\w-]+)/g, (match, p1) => {
        return (
          'Mc' +
          p1
            .split('-')
            .map((part: string) => pascalCase(part))
            .join('')
        );
      });
    } else {
      return slot;
    }
  } else {
    return '';
  }
}

function cleanUp(results: Result[]) {
  for (const item of results) {
    delete item.script;
  }
}

export const getStoredShowCode = (): string => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    let retval = localStorage.getItem('mds-sb-show-code');
    if (!retval) {
      retval = urlParams.has('mdsdocs') ? 'false' : 'true';
    }
    return retval;
  }
  return 'true';
};

export const renderCodePreview = (
  code: Result[],
  context: any,
  slot?: TemplateResult,
  variant?: string,
  id?: string,
): TemplateResult => {
  let urlParams: URLSearchParams;
  try {
    urlParams = new URLSearchParams(window?.location?.search || '');
  } catch (error) {
    console.warn('Failed to parse URL parameters:', error);
    urlParams = new URLSearchParams();
  }

  // if (urlParams.has('mdshidecode')) {
  //   if (urlParams.get('mdshidecode') === 'true') {
  //     return html``;
  //   }
  // } else {
  //   const showCode = getStoredShowCode();
  //   if (showCode === 'false') {
  //     return html``;
  //   }
  // }

  const showCode = getStoredShowCode();
  if (showCode === 'false') {
    return html``;
  }

  const mdsDocsTheme = urlParams.get('mdsdocstheme');
  let contextTheme = 'light';
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    contextTheme = localStorage.getItem('mds-sb-selected-theme') || 'light';
  }
  const theme = mdsDocsTheme || contextTheme || 'light';

  // Validate appearance value
  const safeTheme = typeof theme === 'string' ? theme : 'light';

  // Safe appearance detection with null checks
  const isDark = safeTheme.toLowerCase().includes('dark');
  const codeAppearance = isDark ? 'inverse' : 'default';

  const divStyles = urlParams.has('mdshidecode') ? { width: '100%' } : { 'margin-top': '24px', width: '100%' };

  return html`<div id="code-preview" style=${styleMap(divStyles)}>
    <mc-c-code-preview
      fit="small"
      .code=${code}
      id=${ifDefined(id)}
      variant=${ifDefined(variant)}
      hidetoggle
      .appearance=${codeAppearance}
    >
      ${slot}
    </mc-c-code-preview>
  </div>`;
};
