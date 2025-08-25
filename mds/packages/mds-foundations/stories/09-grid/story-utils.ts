import { html } from 'lit';
import { hologramMarkup } from './grid-hologram';
export const codePreviewImports = `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

`;

export const componentBanner = html`MDS Grid is based on the CSS Grid and has a default number of columns per breakpoint
  and a default gap size between cells:
  <ul style="margin-left: 16px">
    <li><b>xs</b> (0-640px): 2 columns, 16px gap</li>
    <li><b>sm</b> (641px-1024px): 6 columns, 16px gap</li>
    <li><b>md </b>(1025px +): 12 columns, 24px gap</li>
  </ul>
  <br />
  For <b>positioning elements</b> inside the mds-grid, have a look at our css utility classes:
  <a href="?path=/story/layout-navigation-grid-css-utility-classes--column-positioning">column positioning</a>,
  <a href="?path=/story/layout-navigation-grid-css-utility-classes--column-positioning-reverse"
    >column positioning reverse</a
  >, <a href="/?path=/story/layout-navigation-grid-css-utility-classes--row-positioning">row positioning</a>,
  <a href="/?path=/story/layout-navigation-grid-css-utility-classes--column-spanning">column spanning</a> or
  <a href="/?path=/story/layout-navigation-grid-css-utility-classes--row-spanning">row spanning</a>. <br />For
  <b>customizing the number of columns or gap width</b>, have a look at:
  <a href="/?path=/story/layout-navigation-grid-css-utility-classes--custom-columns">custom columns</a>,
  <a href="/?path=/story/layout-navigation-grid-css-utility-classes--custom-gaps">custom gap</a>,
  <a href="/?path=/story/layout-navigation-grid-css-utility-classes--custom-column-gaps">custom column gap</a> or
  <a href="/?path=/story/layout-navigation-grid-css-utility-classes--custom-row-gaps">custom row gap</a>.`;

export const templateStory = (args, example, gridCssClass?: string) => `
<main class="${args['type'] === 'viewport' ? 'mds-viewport' : 'mds-container'}">
  ${hologramMarkup(args)}
  <div class="mds-grid ${gridCssClass ? gridCssClass : ''}">
    ${example}
  </div>
</main>`;

export const templateCode = (
  example,
  args?,
  gridCssClass?: string,
) => `<main class="${args && args['type'] === 'viewport' ? 'mds-viewport' : 'mds-container'}">
  <div class="mds-grid ${gridCssClass ? gridCssClass : ''}">
    ${example}
  </div>
</main>`;
