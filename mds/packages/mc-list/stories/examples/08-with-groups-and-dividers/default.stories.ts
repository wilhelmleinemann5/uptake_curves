import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/List/List/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: () =>
    html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="max-width: 400px">
        <mc-list>
          <small>Numbers</small>
          <mc-list-item value="1">One</mc-list-item>
          <mc-list-item value="2">Two</mc-list-item>
          <mc-list-item value="3">Three</mc-list-item>
          <hr />
          <small>Letters</small>
          <mc-list-item value="a">A</mc-list-item>
          <mc-list-item value="b">B</mc-list-item>
          <mc-list-item value="c">C</mc-list-item>
        </mc-list>
      </div>
      <mc-c-code-preview fit="small" .code=${preview}></mc-c-code-preview>`,
};

export default meta;
export const WithGroupsAndDividers: StoryObj = {};
