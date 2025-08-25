import * as fs from 'fs';
import * as path from 'path';

export interface DesignToken {
  name: string;
  value: string | number | string[];
}

export function resolveTokenReference(tokens: Record<string, any>, reference: string): string {
  // Remove the $ prefix and convert to underscore format
  const tokenPath = reference.slice(1).replace(/\./g, '_');
  return tokens[tokenPath] || reference;
}

export function processTokens(tokens: Record<string, any>): DesignToken[] {
  const result: DesignToken[] = [];

  for (const [key, data] of Object.entries(tokens)) {
    let value = data;
    if (!key.includes('alt') && !key.includes('subtle')) {
      // If value starts with $, resolve it using the underscore reference
      if (typeof value === 'string' && value.startsWith('$')) {
        value = resolveTokenReference(tokens, value);
      }

      result.push({
        name: `--mds_${key}`,
        value: value,
      });
    }
  }

  return result;
}

try {
  // Read the design tokens JSON file
  const tokensPath = path.resolve(
    __dirname,
    '../../../dist/packages/mds-design-tokens/maersk/light/json/design-tokens-flat.json',
  );
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  // Process tokens
  const processedTokens = processTokens(tokens);

  // Generate TypeScript file content
  const fileContent = `// This file is auto-generated. Do not edit manually.
export interface DesignToken {
  name: string;
  value: string | number | string[];
}

const designTokens: DesignToken[] = ${JSON.stringify(processedTokens, null, 2)};

export default designTokens;
`;

  // Write the output file
  const outputPath = path.resolve(__dirname, '../assets/design-tokens.ts');
  fs.writeFileSync(outputPath, fileContent);
} catch (error) {
  console.error('Error extracting design tokens:', error);
  process.exit(1);
}
