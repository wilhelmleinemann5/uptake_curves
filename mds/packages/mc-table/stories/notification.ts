import { TemplateResult, html } from 'lit';

export const renderExpandableTableBanner = (): TemplateResult => {
  return html`<div class="story-notification">
    <mc-notification heading="Expandable rows" icon="exclamation-triangle" appearance="info">
      <div>
        <p style="margin: 0 0 12px 0;">
          A row will become expandable when a slot with the row's <code><b>datakey</b></code> is present in the table
          and <code><b>expand</b></code> is set to true. Please look at the code preview tab for more.
        </p>
      </div>
    </mc-notification>
  </div>`;
};
