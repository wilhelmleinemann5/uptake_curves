import { html, TemplateResult } from 'lit';

export const renderHostStyles = (tagName: string): TemplateResult => {
  if (tagName === 'mc-modal') {
    return html`
      <style>
        mc-modal {
          position: fixed;
          z-index: 1000;
        }
      </style>
    `;
  }
  return html`
    <style>
      ${tagName} {
        display: contents;
      }
    </style>
  `;
};
