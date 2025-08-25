export const codePreviewImports = `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

`;

export const storybookStylesOverrides = `
<style>
body {
    padding: 0 !important;
    overflow: hidden !important;
}
#root-inner {
    padding: 0;
    display: inline;
}
</style>
`;

export const layoutPageCustomStyles = `
<style>
footer {
  background-color: var(--mds_brand_appearance_neutral_strong_background-color);
  color: var(--mds_brand_appearance_neutral_strong_on-background-color);
  padding: 16px 0;
  text-align: center;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--mds_brand_appearance_neutral_weak_background-color);
  color: var(--mds_brand_appearance_neutral_weak_on-background-color);
  height: 40px;
}
.cell-with-nested-grid {
  display: block;
}
.cell-with-nested-grid .cell {
  background-color: var(--mds_brand_appearance_neutral_strong_background-color);
  color: var(--mds_brand_appearance_neutral_strong_on-background-color);
}
.mds ol.mds-list--horizontal {
  gap: 16px;
}
.mds ol.mds-list--horizontal a {
  text-decoration: none;
}
.mds ol.mds-list--horizontal a:hover {
  text-decoration: underline;
}
mc-switch::part(label-container) {
  justify-content: flex-start;
}
</style>
`;
