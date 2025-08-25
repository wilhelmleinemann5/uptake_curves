import fs from 'fs';
import path from 'path';

/**
 * This function generates SASS variables from the breakpoint's design tokens because CSS variables cannot be used
 * as breakpoints in CSS media queries.
 */
export const generateBreakpointSassVariables = () => {
  const jsonFilePath = path.join('dist/packages/mds-design-tokens/maersk/light/json/design-tokens-flat.json');
  const scssFilePath = path.join('packages/mds-foundations/scss/mixins/_media.scss');

  // Read and parse the breakpoint's design tokens JSON file
  const themeTokensJsonString = fs.readFileSync(jsonFilePath, 'utf8');
  const themeTokens = JSON.parse(themeTokensJsonString);
  const breakpointDesignTokensJson = Object.fromEntries(
    Object.entries(themeTokens).filter(([key]) => key.startsWith('global_breakpoint')),
  );

  // Generate SASS variables out of corresponding design tokens
  const commentBlock = `/** 
 * These SASS variables are auto-generated out of their counter-part design-tokens 
 * during build of foundations using scripts/utils/generate-breakpoint-sass-variables.mjs 
 **/
`;
  let sassVariables = commentBlock;
  for (const [key, value] of Object.entries(breakpointDesignTokensJson)) {
    sassVariables += `$mds_${key.replace('global_', '')}: ${value}${value ? 'px' : ''};\n`;
  }

  // Read the _media SCSS file
  const breakpointFoundationsSassData = fs.readFileSync(scssFilePath, 'utf8');

  // Generate SASS variables out of the breakpoint CSS properties (design tokens) and
  // replaces the existing breakpoint SASS variables and the comment block in the _media SCSS file
  const updatedScssData = `${sassVariables.replace(/\n$/, '')}${breakpointFoundationsSassData.replace(/\/\*\*[\s\S]*?\*\//, '').replace(/\$mds_breakpoint_[\w-]+-width: .*;\n?/g, '')}`;

  // Write the updated content back to the _media SCSS file
  fs.writeFileSync(scssFilePath, updatedScssData, 'utf8');

  console.log('Foundations _media SCSS file updated with the breakpoint SASS variables successfully!');
};
