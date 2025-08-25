import fs from 'fs';
import path from 'path';
import { gapValues } from './gap.mjs';
/**
 * This function generates gap specific utility classes from the density design tokens.
 */
export const generateGapUtilityClasses = () => {
  // const jsonFilePath = path.join('dist/packages/mds-design-tokens/density/default/json/design-tokens-flat.json');
  const gapOverallUtilityClassesFilePath = path.join('packages/mds-foundations/scss/_gap.scss');
  const gapBreakpointSpecificMixinsFilePath = path.join('packages/mds-foundations/scss/mixins/_gap.scss');

  // Generate classes out of corresponding design tokens
  const commentBlock = `/** 
 * These classes are auto-generated out of their counter-part design-tokens 
 * during build of foundations using scripts/utils/generate-gap-utility-classes.mjs 
 **/
`;
  let gapOverallUtilityClasses = commentBlock;
  let gapBreakpointSpecificMixins = commentBlock;
  gapBreakpointSpecificMixins += `
@mixin mds-gap($breakpoint) {
`;
  gapValues.forEach((gap) => {
    gapOverallUtilityClasses += `
.mds-gap-${gap.key},
.mds-container .mds-gap-${gap.key},
.mds-viewport .mds-gap-${gap.key} {
  gap: ${gap.value}px;
}

.mds-col-gap-${gap.key},
.mds-container .mds-col-gap-${gap.key},
.mds-viewport .mds-col-gap-${gap.key} {
  column-gap: ${gap.value}px;
}

.mds-row-gap-${gap.key},
.mds-container .mds-row-gap-${gap.key},
.mds-viewport .mds-row-gap-${gap.key} {
  row-gap: ${gap.value}px;
}
`;
    gapBreakpointSpecificMixins += `  .mds-#{$breakpoint}-gap-${gap.key},
  .mds-container .mds-#{$breakpoint}-gap-${gap.key},
  .mds-viewport .mds-#{$breakpoint}-gap-${gap.key} {
    gap: ${gap.value}px;
  }

  .mds-#{$breakpoint}-col-gap-${gap.key},
  .mds-container .mds-#{$breakpoint}-col-gap-${gap.key},
  .mds-viewport .mds-#{$breakpoint}-col-gap-${gap.key} {
    column-gap: ${gap.value}px;
  }

  .mds-#{$breakpoint}-row-gap-${gap.key},
  .mds-container .mds-#{$breakpoint}-row-gap-${gap.key},
  .mds-viewport .mds-#{$breakpoint}-row-gap-${gap.key} {
    row-gap: ${gap.value}px;
  }
`;
  });

  gapBreakpointSpecificMixins += '}\n';

  // Write the updated content back to the _media SCSS file
  fs.writeFileSync(gapOverallUtilityClassesFilePath, gapOverallUtilityClasses, 'utf8');

  // Write the updated content back to the _media SCSS file
  fs.writeFileSync(gapBreakpointSpecificMixinsFilePath, gapBreakpointSpecificMixins, 'utf8');

  console.log('Foundations _media SCSS file updated with gap specific utility classes successfully!');
};
