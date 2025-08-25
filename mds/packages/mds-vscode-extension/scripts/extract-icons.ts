import * as fs from 'fs';
import * as path from 'path';

interface IconMetadata {
  name: string;
  [key: string]: unknown;
}

export function extractIconNames(metadata: IconMetadata[]): string[] {
  return metadata.map((icon) => icon.name);
}

export function generateFileContent(iconNames: string[]): string {
  return `// This file is auto-generated. Do not edit manually.
export const iconNames: string[] = ${JSON.stringify(iconNames, null, 2)};
`;
}

try {
  const metadataPath = require.resolve('@maersk-global/icons/metadata/metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as IconMetadata[];

  const iconNames = extractIconNames(metadata);
  const fileContent = generateFileContent(iconNames);

  const outputPath = path.resolve(__dirname, '../assets/icons.ts');
  fs.writeFileSync(outputPath, fileContent);
} catch (error) {
  console.error('Error extracting icons:', error);
  process.exit(1);
}
