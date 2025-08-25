import { html } from 'lit';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { generateThemeSelector, renderComponentBanner } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Components/Link/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const focusShadowInset = () => {
  return html`${unsafeHTML(generateThemeSelector())}
    ${renderComponentBanner(
      'Focus shadow inset',
      html`<p>Changes the focus of the link to be an inset shadow - has use on links such as nested navigation.</p>`,
    )}
    ${unsafeHTML(preview(false)[0].template)}
    <mc-c-code-preview fit="small" .code=${preview(true)}></mc-c-code-preview>`;
};
