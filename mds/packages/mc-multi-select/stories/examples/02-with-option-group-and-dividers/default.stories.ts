import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="max-width: 400px">
        <mc-multi-select name="selectOne" label="Select medium item">
          <small>Numbers</small>
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <hr />
          <small>Letters</small>
          <mc-option value="a">A</mc-option>
          <mc-option value="b">B</mc-option>
          <mc-option value="c">C</mc-option>
        </mc-multi-select>
        <br />
        <mc-multi-select name="selectTwo" label="Select small item" fit="small">
          <small>Numbers</small>
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <hr />
          <small>Letters</small>
          <mc-option value="a">A</mc-option>
          <mc-option value="b">B</mc-option>
          <mc-option value="c">C</mc-option>
        </mc-multi-select>
        <br />
        <mc-multi-select name="selectThree" label="Select large item" fit="large">
          <small>Numbers</small>
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <hr />
          <small>Letters</small>
          <mc-option value="a">A</mc-option>
          <mc-option value="b">B</mc-option>
          <mc-option value="c">C</mc-option>
        </mc-multi-select>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const WithOptionGroupsAndDividers: StoryObj = {};
