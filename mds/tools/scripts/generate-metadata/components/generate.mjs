import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { extractArgTypes } from './argTypes-extractor.mjs';
import { generateBasicExamples, generateMinimalExamples } from './generate-basic-examples.mjs';
import { generateAdvancedExamples } from './generate-advanced-examples.mjs';
import { generateFrameworkExamples } from './generate-framework-examples.mjs';
import { fetchUxBestPractices, enhanceGuidelines } from '../get-ux-docs.mjs';
import { getPackageInfo } from '../utils.mjs';
import { uxGeneralGuidelinesMapping } from './ux-general-mapping.mjs';

/**
 * Enhanced metadata generator for MDS components
 * Reads the generated custom-elements.json and args.json files and combines them
 * to create a comprehensive metadata.json file with a specific structure
 */
export async function generateComponentMetadata(packageDir, componentName) {
  const rootPath = packageDir.split('/').slice(1, -2).join('/');
  const packageName = componentName.replace('mc-', 'mds-components-core-');

  const cemPath = join('/', rootPath, 'dist', 'packages', packageName, 'custom-elements.json');
  const argsPath = join('/', rootPath, 'dist', 'packages', packageName, 'args.json');
  const metadataPath = join('/', rootPath, 'dist', 'packages', packageName, 'metadata.json');

  if (!existsSync(cemPath)) {
    console.warn(`❌ Custom elements manifest not found for ${componentName} at ${cemPath}`);
    return;
  }

  try {
    // Extract and save argTypes as JSON (this handles the args.json file creation)
    await extractArgTypes(packageDir, componentName);
    const cemData = JSON.parse(readFileSync(cemPath, 'utf8'));

    // Load args.json if it exists
    let argsData = null;
    if (existsSync(argsPath)) {
      argsData = JSON.parse(readFileSync(argsPath, 'utf8'));
    }

    // Find the main component declaration
    const mainModule = cemData.modules?.find(
      (module) =>
        module.path.includes('src/lib/index') &&
        !module.path.includes('.stories.') &&
        !module.path.includes('.spec.') &&
        !module.path.includes('.test.'),
    );

    const component = mainModule?.declarations?.find((decl) => decl.kind === 'class' && decl.tagName);

    if (!component) {
      console.warn(`No component declaration found for ${componentName}`);
      return;
    }

    // Extract examples from stories
    const minimalExample = await generateMinimalExamples(componentName, argsPath);
    const basicExample = await generateBasicExamples(componentName, argsPath);
    const advancedExamples = await generateAdvancedExamples(packageDir, component.tagName);
    const frameworkExamples = await generateFrameworkExamples(packageDir, component.tagName);

    // Create the new metadata structure
    const enhancedMetadata = await createEnhancedMetadataStructure(
      component,
      argsData,
      basicExample,
      minimalExample,
      advancedExamples,
      frameworkExamples,
      packageDir,
    );
    writeFileSync(metadataPath, JSON.stringify(enhancedMetadata, null, 2));

    // Clean up temporary args.json file after successful metadata generation
    cleanupTemporaryFiles(argsPath);

    console.log(`✅ Generated enhanced metadata for ${componentName} at ${metadataPath}`);
  } catch (error) {
    console.error(`❌ Error enhancing manifest for ${componentName}:`, error);
  } finally {
    // Cleanup: remove args.json after metadata.json is generated
    cleanupTemporaryFiles(argsPath);
  }
}

/**
 * Parse purpose, whenToUse, whenNotToUse, and category from JSDoc description
 */
export function parseJSDocDescription(description) {
  if (!description) {
    return {};
  }

  const result = {};

  // Extract category
  const categoryMatch = description.match(/Category:\s*(.+?)(?=\n\n|\nPurpose:|\nWhen to use:|\nWhen not to use:|$)/is);
  if (categoryMatch) {
    result.category = categoryMatch[1].trim();
  }

  // Extract purpose
  const purposeMatch = description.match(/Purpose:\s*(.+?)(?=\n\n|\nCategory:|\nWhen to use:|\nWhen not to use:|$)/is);
  if (purposeMatch) {
    result.purpose = purposeMatch[1].trim();
  }

  // Extract when to use
  const whenToUseMatch = description.match(
    /When to use:\s*(.+?)(?=\n\n|\nWhen not to use:|\nPurpose:|\nCategory:|$)/is,
  );
  if (whenToUseMatch) {
    result.whenToUse = whenToUseMatch[1].split(',').map((s) => s.trim());
  }

  // Extract when not to use
  const whenNotToUseMatch = description.match(
    /When not to use:\s*(.+?)(?=\n\n|\nPurpose:|\nWhen to use:|\nCategory:|$)/is,
  );
  if (whenNotToUseMatch) {
    result.whenNotToUse = whenNotToUseMatch[1].split(',').map((s) => s.trim());
  }

  // Extract the main description (everything before the first special field)
  const mainDescMatch = description.match(/^(.+?)(?=\n\n\s*(?:Purpose|Category|When to use|When not to use):|$)/is);
  if (mainDescMatch) {
    result.description = mainDescMatch[1].trim();
  } else {
    result.description = description;
  }

  return result;
}

/**
 * Create the enhanced metadata structure based on the template
 */
export async function createEnhancedMetadataStructure(
  component,
  argsData,
  basicExample,
  minimalExample,
  advancedExamples,
  frameworkExamples,
  packageDir,
) {
  // Parse JSDoc description for purpose, whenToUse, etc.
  const parsedJSDoc = parseJSDocDescription(component.description);

  // Extract properties from both CEM and args.json
  const combinedProps = combinePropertiesFromSources(component, argsData);

  // Extract events from both CEM and args.json (use CEM descriptions)
  const events = extractEventsFromSources(component, argsData);

  // Calculate summary data
  const summary = calculateSummaryData(component, combinedProps, events);

  // Fetch UX guidelines from cache
  const componentName = component.tagName.replace(/`/g, '').replace('mc-', '');
  let guidelines = {
    categories: [],
    title: '',
    description: '',
    rules: {},
    designPrinciples: [],
    relatedGuidelines: [],
  };

  try {
    console.log(`🔍 Fetching UX guidelines for ${componentName}...`);

    // Fetch component-specific guidelines
    const componentGuidelines = await fetchUxBestPractices('components', componentName);
    if (componentGuidelines && Object.keys(componentGuidelines).length > 0) {
      guidelines = componentGuidelines;
      console.log(`✅ Successfully fetched component guidelines for ${componentName}`);
    } else {
      console.log(`ℹ️  No component-specific guidelines found for ${componentName}`);
    }

    // Enhance with general guidelines using mapping
    if (uxGeneralGuidelinesMapping[componentName]) {
      console.log(`🔗 Enhancing ${componentName} with general guidelines...`);
      const generalGuidelines = await enhanceGuidelines(uxGeneralGuidelinesMapping[componentName]);
      guidelines = {
        ...guidelines,
        designPrinciples: [...(generalGuidelines.designPrinciples || [])],
        relatedGuidelines: [...(generalGuidelines.relatedGuidelines || [])],
      };
      console.log(`✅ Successfully enhanced guidelines for ${componentName}`);
    }
  } catch (error) {
    console.warn(`⚠️  Could not fetch guidelines for ${componentName}: ${error.message}`);
    guidelines = {
      categories: [],
      title: componentName,
      description: 'No guidelines available',
      rules: {},
    };
  }

  const enhancedData = {
    description: parsedJSDoc.description || component.description || `${component.tagName.replace(/`/g, '')} component`,
    tagName: component.tagName.replace(/`/g, ''),
    customElement: component.customElement,
    category: parsedJSDoc.category || 'Category not set',
    purpose: parsedJSDoc.purpose || 'No purpose defined',
    whenToUse: parsedJSDoc.whenToUse || [],
    whenNotToUse: parsedJSDoc.whenNotToUse || [],
    summary,
  };
  const overview = getPackageInfo(join(packageDir, 'package.json'), enhancedData);
  return {
    overview,
    usage: {
      import: `import '${overview.packageName}';`,
      examples: {
        ...(minimalExample ? { minimal: minimalExample } : {}),
        ...(basicExample ? { basic: basicExample } : {}),
        ...(Object.keys(advancedExamples).length > 0 ? { advanced: advancedExamples } : {}),
      },
      frameworkExamples: frameworkExamples || {
        vue3: { language: 'javascript', template: '// Framework example not available' },
        vue2: { language: 'javascript', template: '// Framework example not available' },
        react: { language: 'javascript', template: '// Framework example not available' },
        angular: { language: 'javascript', template: '// Framework example not available' },
        vanillajs: { language: 'javascript', template: '// Framework example not available' },
        lit: { language: 'javascript', template: '// Framework example not available' },
      },
    },
    api: {
      props: combinedProps,
      events: events,
      slots: enhanceSlots(component.slots || []),
    },
    styling: {
      cssParts: enhanceCssParts(component.cssParts || []),
      themeSupport: getThemeSupport(),
    },
    guidelines,
  };
}

/**
 * Combine properties from both custom-elements.json and args.json
 * Prioritizes Storybook args - includes ALL properties from args.json,
 * then uses CEM data to fill in any missing fields for those properties
 */
export function combinePropertiesFromSources(component, argsData) {
  const props = [];
  const processedProps = new Set();

  // Get properties from CEM for reference
  const cemProperties =
    component.members?.filter(
      (member) => member.kind === 'field' && (member.privacy === 'public' || member.privacy === null),
    ) || [];

  // Create a map of CEM properties for easy lookup
  const cemPropsMap = new Map(cemProperties.map((prop) => [prop.name, prop]));

  // Get properties from args.json (prioritize these)
  const argsProperties = argsData || {};

  console.log(`🔍 Args.json has ${Object.keys(argsProperties).length} properties`);
  console.log(`🔍 CEM has ${cemProperties.length} public properties for reference`);

  // Process ALL properties from args.json first (prioritize Storybook args)
  Object.entries(argsProperties).forEach(([name, argsProp]) => {
    // Skip known event properties
    const isEvent =
      argsProp.type === 'event' ||
      (name.startsWith('event') && ['eventBlur', 'eventClick', 'eventFocus'].includes(name)) ||
      (['blur', 'focus', 'click'].includes(name) && argsProp.type !== 'property');

    if (isEvent) {
      console.log(`⏭️  Skipping event: ${name}`);
      return; // Skip events - they are handled separately in extractEventsFromSources
    }

    // Get corresponding CEM property for filling missing data
    const cemProp = cemPropsMap.get(name);

    // Start with args data as the base (prioritize Storybook)
    const propData = {
      name,
      type: cemProp?.type?.text || 'unknown',
      defaultValue:
        argsProp.defaultValue !== undefined && argsProp.defaultValue !== null
          ? parseDefaultValue(argsProp.defaultValue)
          : undefined,
      description: argsProp.description || 'Description missing',
      options: argsProp.options || [],
      required: (argsProp.type && argsProp.type.required) || argsProp.required || false,
      category: (argsProp.table && argsProp.table.category) || 'Other',
    };

    // Fill in missing fields from CEM data if available
    if (cemProp) {
      // Use CEM type if args type is missing or unknown
      if (!propData.type || propData.type === 'unknown') {
        propData.type = cemProp.type?.text || 'unknown';
      }

      // Use CEM default value if args default is missing
      if (propData.defaultValue === undefined && cemProp.default) {
        propData.defaultValue = parseDefaultValue(cemProp.default);
      }

      // Use CEM description if args description is missing
      if (propData.description === 'Description missing' && cemProp.description) {
        propData.description = cemProp.description;
      }

      console.log(`✅ Enhanced args property ${name} with CEM data`);
    } else {
      console.log(`➕ Added args-only property: ${name}`);
    }

    props.push(propData);
    processedProps.add(name);
  });

  console.log(`✅ Processed ${processedProps.size} properties from args.json`);
  return props;
}

/**
 * Extract events from both custom-elements.json and args.json
 * Prioritizes CEM events - includes ALL events from CEM,
 * then enhances them with argTypes data when available
 */
export function extractEventsFromSources(component, argsData) {
  const eventsMap = new Map();

  // Get events from CEM (prioritize these)
  const cemEvents = component.events || [];

  // Get events from args.json for additional metadata
  const argsEvents = argsData?.argTypes || {};

  // Process ALL CEM events first (prioritize CEM)
  cemEvents.forEach((cemEvent) => {
    const cleanEventName = cemEvent.name.replace(/`/g, '');

    eventsMap.set(cleanEventName, {
      name: cleanEventName,
      description: cemEvent.description || 'Description missing',
      type: cemEvent.type?.text || 'CustomEvent',
    });
  });

  // Add any additional events from args.json that aren't already in CEM
  Object.entries(argsEvents).forEach(([name, data]) => {
    if (data.type === 'event' && !eventsMap.has(name)) {
      eventsMap.set(name, {
        name,
        description: data.description || 'Description missing',
        type: data.eventType || 'CustomEvent',
      });
    }
  });

  return Array.from(eventsMap.values());
}

/**
 * Calculate summary data for the overview
 */
export function calculateSummaryData(component, props, events) {
  return {
    publicProperties: props.length,
    publicMethods: component.members?.filter((m) => m.kind === 'method' && m.privacy === 'public').length || 0,
    events: events.length,
    slots: component.slots?.length || 0,
    cssParts: component.cssParts?.length || 0,
    hasAttributes: props.some((p) => !!component.members?.find((m) => m.name === p.name && m.attribute)),
    hasReflectedProperties: component.members?.some((m) => m.reflects) || false,
    hasDeprecatedProperties: component.members?.some((m) => m.deprecated) || false,
    hasSlots: (component.slots?.length || 0) > 0,
    hasEvents: events.length > 0,
    hasCssParts: (component.cssParts?.length || 0) > 0,
  };
}

/**
 * Enhance slots with additional metadata
 */
export function enhanceSlots(slots) {
  return slots.map((slot) => ({
    ...slot,
    name: slot.name?.replace(/`/g, '') || '',
    isDefault: slot.name === '' || slot.name === 'default',
    isNamed: slot.name !== '' && slot.name !== 'default',
  }));
}

/**
 * Enhance CSS parts by cleaning up backticks from names
 */
export function enhanceCssParts(cssParts) {
  return cssParts.map((part) => ({
    ...part,
    name: part.name?.replace(/`/g, '') || part.name,
  }));
}

/**
 * Get theme support configuration
 */
export function getThemeSupport() {
  return [
    {
      themeName: 'Maersk Light',
      usage: {
        import: "import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';",
      },
    },
    {
      themeName: 'Maersk Dark',
      usage: {
        import: "import '@maersk-global/mds-design-tokens/maersk/dark/css/design-tokens-px.css';",
      },
    },
    {
      themeName: 'APM Terminals Light',
      usage: {
        import: "import '@maersk-global/mds-design-tokens/apmterminals/light/css/design-tokens-px.css';",
      },
    },
    {
      themeName: 'APM Terminals Dark',
      usage: {
        import: "import '@maersk-global/mds-design-tokens/apmterminals/dark/css/design-tokens-px.css';",
      },
    },
    {
      themeName: 'Alianca Light',
      usage: {
        import: "import '@maersk-global/mds-design-tokens/alianca/light/css/design-tokens-px.css';",
      },
    },
    {
      themeName: 'Alianca Dark',
      usage: {
        import: "import '@maersk-global/mds-design-tokens/alianca/dark/css/design-tokens-px.css';",
      },
    },
  ];
}

/**
 * Parse default value to appropriate type
 */
export function parseDefaultValue(value) {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}

/**
 * Clean up temporary files after metadata generation
 */
export function cleanupTemporaryFiles(argsPath) {
  if (existsSync(argsPath)) {
    try {
      unlinkSync(argsPath);
      console.log(`🗑️  Cleaned up temporary args.json file`);
    } catch (error) {
      console.warn(`⚠️  Could not remove args.json file: ${error.message}`);
    }
  }
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const packageDir = process.cwd();
  const packageName = packageDir.split('/').pop();

  // Enhance the custom elements manifest
  generateComponentMetadata(packageDir, packageName)
    .then(() => {
      console.log(`✅ ${packageName} metadata generation completed successfully`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌${packageName} metadata generation failed:`, error);
      process.exit(1);
    });
}
