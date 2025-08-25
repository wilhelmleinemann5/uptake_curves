export const wrapCSSExample = (isPreview: boolean, isMDSContent: boolean, example: string): string => {
  const cssClass = isPreview ? 'mds' : 'css-example';
  if (isMDSContent) {
    return `<!-- Add foundations and design-tokens imports
<link rel="stylesheet" href="@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css">
<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">
-->

<div class="${cssClass}">
  <article class="mds-content">
    ${example.replace(/\n/g, '\n    ')}
  </article>
</div>
  `;
  }
  return `<!-- Add foundations and design-tokens imports
<link rel="stylesheet" href="@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css">
<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">
-->

<div class="${cssClass}">
  ${example.replace(/\n/g, '\n  ')}
</div>
  `;
};
