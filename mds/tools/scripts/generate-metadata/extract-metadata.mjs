import { readFileSync, readdirSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to extract component name from package name
export function getComponentName(packageName) {
  // Extract mc-* from @maersk-global/mds-components-core-*
  return packageName.replace('@maersk-global/mds-components-core-', 'mc-');
}

// Function to clean HTML tags from description
export function cleanDescription(description) {
  if (!description) return '';
  return description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\\n\\r/g, ' ') // Replace escaped \n\r
    .replace(/\\n/g, ' ') // Replace escaped \n
    .replace(/\\r/g, ' ') // Replace escaped \r
    .replace(/\n\r/g, ' ') // Replace actual \n\r
    .replace(/[\n\r]/g, ' ') // Replace actual line breaks
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/""/g, '') // Remove double quotes (escaped quotes)
    .replace(/"/g, '') // Remove remaining double quotes
    .replace(/`/g, '') // Remove backticks
    .replace(/'/g, '') // Remove single quotes (optional)
    .replace(/&lt;/g, '<') // Replace HTML entity &lt; with <
    .replace(/&gt;/g, '>') // Replace HTML entity &gt; with >
    .replace(/&amp;/g, 'and') // Replace HTML entity &amp; with &
    .replace(/&quot;/g, '') // Replace HTML entity &quot; with "
    .replace(/&#39;/g, '') // Replace HTML entity &#39; with '
    .replace(/&nbsp;/g, ' ') // Replace HTML entity &nbsp; with space
    .trim(); // Remove leading/trailing spaces
}

// Function to process a single metadata.json file
export function processMetadataFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const metadata = JSON.parse(content);

    const componentName = getComponentName(metadata.overview.packageName);
    const results = [];

    // Extract props data
    if (metadata.api && metadata.api.props) {
      metadata.api.props.forEach((prop) => {
        results.push({
          component: componentName,
          category: prop.category || 'Other', // Default to 'Other' if no category
          type: 'props',
          name: prop.name,
          description: cleanDescription(prop.description),
        });
      });
    }

    // Extract events data
    if (metadata.api && metadata.api.events) {
      metadata.api.events.forEach((event) => {
        results.push({
          component: componentName,
          category: 'Events', // Default to 'Other' if no category
          type: 'events',
          name: event.name,
          description: cleanDescription(event.description),
        });
      });
    }

    // Extract slots data
    if (metadata.api && metadata.api.slots) {
      metadata.api.slots.forEach((slot) => {
        results.push({
          component: componentName,
          category: 'Slots', // Default to 'Other' if no category
          type: 'slots',
          name: slot.name,
          description: cleanDescription(slot.description),
        });
      });
    }

    // Extract CSS parts data
    if (metadata.styling && metadata.styling.cssParts) {
      metadata.styling.cssParts.forEach((cssPart) => {
        results.push({
          component: componentName,
          category: 'Css parts', // Default to 'Other' if no category
          type: 'cssParts',
          name: cssPart.name,
          description: cleanDescription(cssPart.description),
        });
      });
    }

    return results;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return [];
  }
}

// Function to convert data to CSV format
export function arrayToCSV(data) {
  if (data.length === 0) return '';

  // Header
  const header = 'Component;Category;Type;Name;Description\n';

  // Rows
  const rows = data.map((item) => {
    // Escape semicolons and quotes in CSV values
    const escapeCsvValue = (value) => {
      if (value.includes(';') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    return [
      escapeCsvValue(item.component),
      escapeCsvValue(item.category),
      escapeCsvValue(item.type),
      escapeCsvValue(item.name),
      escapeCsvValue(item.description),
    ].join(';');
  });

  return header + rows.join('\n');
}

// Main function
export function main() {
  const distPackagesDir = join(__dirname, '..', '..', '..', 'dist', 'packages');
  const allData = [];

  try {
    // Read all directories in dist/packages
    const directories = readdirSync(distPackagesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith('mds-components-core-'))
      .map((dirent) => dirent.name);

    console.log(`Found ${directories.length} component directories:`);
    directories.forEach((dir) => console.log(`  - ${dir}`));

    // Process each directory
    directories.forEach((dirName) => {
      const metadataPath = join(distPackagesDir, dirName, 'metadata.json');

      if (existsSync(metadataPath)) {
        console.log(`Processing: ${metadataPath}`);
        const data = processMetadataFile(metadataPath);
        allData.push(...data);
      } else {
        console.log(`Warning: metadata.json not found in ${dirName}`);
      }
    });

    // Convert to CSV and save
    const csvContent = arrayToCSV(allData);
    const outputPath = join(__dirname, 'component-metadata.csv');

    writeFileSync(outputPath, csvContent, 'utf8');
    allData.slice(0, 5).forEach((item) => {
      const desc = item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description;
      console.log(`${item.component} | ${item.type} | ${item.name} | ${desc}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
