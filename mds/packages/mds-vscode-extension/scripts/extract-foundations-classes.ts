import fs from 'fs';
import path from 'path';

export const cssFiles = {
  grid: '_container-grid.css',
  breadcrumb: '_breadcrumb.css',
  color: '_color.css',
  gap: '_gap.css',
  link: '_link.css',
  table: '_table.css',
  typography: '_typography.css',
};

const baseDir = path.resolve(__dirname, '../../../dist/packages/mds-foundations/css');
const outputPath = path.resolve(__dirname, '../assets/css-classes.ts');

export function extractClassesFromCSS(cssContent: string, key: string): string[] {
  const classRegex = /\.([a-zA-Z0-9_-]+)/g;
  const matches = cssContent.match(classRegex)?.filter((match) => match.startsWith('.mds-')) || [];
  const uniqueClasses = [...new Set(matches.map((match: string) => match.substring(1)))];
  if (key === 'gap') {
    return uniqueClasses.filter((className) => className.includes('gap'));
  }
  return uniqueClasses;
}

try {
  const allClasses: Record<string, string[]> = {};

  // Extract classes from each CSS file
  for (const [key, filename] of Object.entries(cssFiles)) {
    const filePath = path.join(baseDir, filename);
    if (fs.existsSync(filePath)) {
      const cssContent = fs.readFileSync(filePath, 'utf8');
      allClasses[key] = extractClassesFromCSS(cssContent, key);
    } else {
      console.warn(`Warning: File ${filename} not found`);
      allClasses[key] = [];
    }
  }

  // Create assets directory if it doesn't exist
  const assetsDir = path.dirname(outputPath);
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const fileContent = `// This file is auto-generated. Do not edit manually.
${Object.entries(allClasses)
  .map(([key, classes]) => `export const ${key}Classes: string[] = ${JSON.stringify(classes, null, 2)};`)
  .join('\n\n')}
`;

  fs.writeFileSync(outputPath, fileContent);
} catch (error) {
  console.error('Error processing CSS files:', error);
  process.exit(1);
}
