/**
 * Framework Examples Generator for MDS Components
 *
 * This module extracts framework-specific code examples by calling the existing generateCode function
 * from the bundled mds-dev-utils, which generates framework examples for Vue, React, Angular, etc.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate framework examples for a component by calling the existing generateCode function
 * @param {string} packageDir - The package directory path
 * @param {string} tagName - The component tag name (e.g., 'mc-button')
 * @returns {Object} Framework examples object with framework names as keys
 */
export async function generateFrameworkExamples(packageDir, tagName) {
  try {
    const cleanTagName = tagName.replace(/`/g, '');
    const packageName = packageDir.split('/').pop(); // Extract package name (e.g., 'mc-button')

    // Get argTypes and default values for the component
    const { argTypes, defaultArgs } = await getComponentArgTypes(packageDir);

    if (!argTypes) {
      console.warn(`Could not load argTypes for ${cleanTagName}`);
    }

    // Import the generateCode function from the bundled JS file
    const generateCodePath = join(__dirname, '../../../../dist/packages/mds-dev-utils/lib/storybook/generate-code.js');
    const { generateCode } = await import(generateCodePath);

    // Call the existing generateCode function with the component's argTypes and default args
    // The function signature is: generateCode(tagName, argTypes, args, slot?)
    const codeExamples = generateCode(cleanTagName, argTypes, defaultArgs);

    // Transform the result into our expected format
    return transformCodeExamples(codeExamples, packageName);
  } catch (error) {
    console.warn(`Error generating framework examples for ${tagName}:`, error.message);
  }
}

/**
 * Load the component's data directly from args.json and transform it for generateCode
 */
export async function getComponentArgTypes(packageDir) {
  try {
    const packageName = packageDir.split('/').pop(); // Get package name from path
    const distPath = join(packageDir, '../../dist/packages', packageName.replace('mc-', 'mds-components-core-'));
    const argsJsonPath = join(distPath, 'args.json');

    if (!existsSync(argsJsonPath)) {
      console.warn(`args.json not found at ${argsJsonPath}`);
      return { argTypes: null, defaultArgs: {} };
    }

    // Read our generated args.json file
    const argsData = JSON.parse(readFileSync(argsJsonPath, 'utf8'));
    const extractedArgTypes = argsData.argTypes || {};

    // Transform args.json data directly to the format expected by generateCode
    const argTypes = {};
    const defaultArgs = {};

    for (const [propName, propData] of Object.entries(extractedArgTypes)) {
      if (propData.type === 'property') {
        // Use the exact structure from args.json, just reshape for generateCode
        argTypes[propName] = {
          name: propName,
          control: {
            type: propData.control?.type || 'text', // Use extracted control type or fallback to text
          },
          table: {
            defaultValue: {
              summary: propData.defaultValue,
            },
          },
        };

        // Use different values from defaults to show meaningful examples
        defaultArgs[propName] = getExampleValue(propData);
      } else if (propData.type === 'event') {
        argTypes[propName] = {
          name: propName,
          control: {
            type: 'event',
          },
          table: {
            defaultValue: {
              summary: undefined,
            },
          },
        };
      }
    }

    return { argTypes, defaultArgs };
  } catch (error) {
    console.warn(`Error loading argTypes:`, error.message);
    return { argTypes: null, defaultArgs: {} };
  }
}

/**
 * Get example values that are different from defaults to ensure they show up in code examples
 */
export function getExampleValue(propData) {
  // For properties with options, pick the first non-default option
  if (propData.options && Array.isArray(propData.options)) {
    const nonDefaultOptions = propData.options.filter((opt) => opt !== propData.defaultValue);
    if (nonDefaultOptions.length > 0) {
      return nonDefaultOptions[0];
    }
    return propData.options[0];
  }
}

/**
 * Transform the generateCode result into our metadata format
 */
export function transformCodeExamples(codeExamples, packageName) {
  const frameworkExamples = {};

  for (const example of codeExamples) {
    const frameworkKey = mapFrameworkLabel(example.label);
    const componentName = getComponentNameFromPackage(packageName);
    const extractedImport = extractImportFromTemplate(example.template, frameworkKey);
    const basicWithoutImport = removeImportFromTemplate(example.template, frameworkKey);

    frameworkExamples[frameworkKey] = {
      setup: getSetupInstruction(frameworkKey, packageName),
      import: extractedImport || getImportInstruction(frameworkKey, packageName, componentName),
      basic: basicWithoutImport || '// Code example not available',
    };
  }

  return frameworkExamples;
}

/**
 * Remove the import statement from the template to keep only the usage part
 */
export function removeImportFromTemplate(template, framework) {
  if (!template) return null;

  switch (framework) {
    case 'vanillajs':
      // For VanillaJS, remove the script tag with src attribute (import script)
      // Handle both single-line and multi-line script tags
      const cleanedTemplate = template.replace(/<script[^>]*\ssrc=[^>]*>[\s\S]*?<\/script>\s*/i, '');
      return cleanedTemplate.trim();

    case 'vue3':
    case 'vue2':
    case 'react':
    case 'angular':
    case 'lit':
    default:
      // For other frameworks, remove the import line and any following empty lines
      return template.replace(/^import[^;]+;\s*\n+/m, '');
  }
}

/**
 * Extract the import statement from the template for each framework
 */
export function extractImportFromTemplate(template, framework) {
  if (!template) return null;

  switch (framework) {
    case 'vanillajs':
      // For VanillaJS, find any script tag with src attribute (import script)
      // Handle both single-line and multi-line script tags
      const scriptTagMatch = template.match(/<script[^>]*\ssrc=[^>]*>[\s\S]*?<\/script>/i);
      if (scriptTagMatch) {
        return scriptTagMatch[0].trim();
      }

      return null;

    case 'vue3':
    case 'vue2':
    case 'react':
    case 'angular':
    case 'lit':
    default:
      // Extract the line that starts with 'import' for other frameworks
      const importMatch = template.match(/^import[^;]+;/m);
      if (importMatch) {
        return importMatch[0];
      }
      break;
  }

  return null;
}

/**
 * Get the setup instruction for each framework
 */
export function getSetupInstruction(framework, packageName) {
  const corePackageName = packageName.replace('mc-', 'mds-components-core-');

  switch (framework) {
    case 'react':
      return 'npm install @maersk-global/mds-react-wrapper';
    case 'vue3':
    case 'vue2':
    case 'angular':
    case 'vanillajs':
    case 'lit':
      return `npm install @maersk-global/${corePackageName}`;
    default:
      return `npm install @maersk-global/${corePackageName}`;
  }
}

/**
 * Get the import instruction for each framework
 */
export function getImportInstruction(framework, packageName, componentName) {
  const corePackageName = packageName.replace('mc-', 'mds-components-core-');

  switch (framework) {
    case 'react':
      return `import { ${componentName} } from '@maersk-global/mds-react-wrapper/components-core/${packageName}';`;
    case 'vue3':
    case 'vue2':
    case 'angular':
    case 'vanillajs':
    case 'lit':
      return `import '@maersk-global/${corePackageName}';`;
    default:
      return `import '@maersk-global/${corePackageName}';`;
  }
}

/**
 * Convert package name to React component name (e.g., mc-button -> McButton)
 */
export function getComponentNameFromPackage(packageName) {
  return packageName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Map generateCode framework labels to our metadata format
 */
export function mapFrameworkLabel(label) {
  const mapping = {
    Vue3: 'vue3',
    Vue2: 'vue2',
    React: 'react',
    Angular: 'angular',
    VanillaJs: 'vanillajs',
    Lit: 'lit',
  };

  return mapping[label] || label.toLowerCase();
}
