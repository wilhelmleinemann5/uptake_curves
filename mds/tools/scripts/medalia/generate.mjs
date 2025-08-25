import fs from 'fs';

const mergeCssFiles = (targetFile, baseFile, outputPath) => {
  const targetCss = fs.readFileSync(targetFile, 'utf8');
  const baseCss = fs.readFileSync(baseFile, 'utf8');

  const mergedCss = targetCss.replace(
    /\/\* Base styles \*\/[\s\S]*?\/\* End base styles \*\//,
    `/* Base styles */\n${baseCss}\n/* End base styles */`,
  );

  fs.writeFileSync(outputPath, mergedCss, 'utf8');
};

mergeCssFiles('medalia/base/left.css', 'medalia/base/base.css', 'medalia/left-aligned.css');
mergeCssFiles('medalia/base/center.css', 'medalia/base/base.css', 'medalia/center-aligned.css');
