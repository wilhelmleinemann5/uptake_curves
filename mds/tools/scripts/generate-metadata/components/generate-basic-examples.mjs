import { readFileSync } from 'fs';

/**
 * Generate a minimal component example with only required properties
 * This creates the simplest possible example using only required props
 */
export async function generateMinimalExamples(componentTagName, argsPath) {
  try {
    // Extract argTypes using the dedicated extractor
    let argTypesData = {};
    try {
      argTypesData = JSON.parse(readFileSync(argsPath, 'utf8'));
    } catch (error) {
      console.warn(`Error extracting argTypes for ${componentTagName}:`, error.message);
    }
    const requiredArgs = {};

    for (const [propName, propInfo] of Object.entries(argTypesData)) {
      if (propInfo.type && propInfo.type.required === true) {
        requiredArgs[propName] = propInfo;
      }
    }
    // Create example with only required properties
    const example = createExample(componentTagName, requiredArgs);

    return example;
  } catch (error) {
    console.warn(`Error generating minimal example for ${componentTagName}:`, error.message);
  }
}

/**
 * Generate a basic component example from Storybook stories and argTypes
 * This is the main entry point for example generation
 */
export async function generateBasicExamples(componentTagName, argsPath) {
  try {
    // Try to extract argTypes using the dedicated extractor
    let argTypesData = {};
    try {
      argTypesData = JSON.parse(readFileSync(argsPath, 'utf8'));
    } catch (error) {
      console.warn(`Error extracting argTypes for ${componentTagName}:`, error.message);
    }

    // Create example with only required properties
    const example = createExample(componentTagName, argTypesData);

    return example;
  } catch (error) {
    console.warn(`Error reading stories file for ${componentTagName}:`, error.message);
    return null;
  }
}

/**
 * Create and example of component implementation based on passed args
 */
export function createExample(componentTagName, args) {
  // Start with the component tag
  let example = `<${componentTagName}`;

  // Add properties based on args
  for (const [propName, propInfo] of Object.entries(args)) {
    if (propInfo.defaultValue !== undefined && propInfo.defaultValue !== null) {
      if (typeof propInfo.defaultValue === 'boolean') {
        if (propInfo.defaultValue) {
          example += ` ${propName}`;
        }
      } else {
        example += ` ${propName}="${propInfo.defaultValue}"`;
      }
    }
  }

  // Close the component tag
  example += `></${componentTagName}>`;

  return example;
}
