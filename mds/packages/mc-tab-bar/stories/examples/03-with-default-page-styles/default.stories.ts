import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Tabs/Tab Bar/Examples',
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
      <mc-tab-bar>
        <mc-tab slot="tab" label="Default page styles"></mc-tab>
        <div slot="panel">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>
            This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Et tortor consequat id porta. Sit amet mattis vulputate enim
            nulla aliquet porttitor. Magna etiam tempor orci eu lobortis. Sit amet consectetur adipiscing elit. Sagittis
            id consectetur purus ut faucibus. Consequat ac felis donec et odio pellentesque diam volutpat commodo.
            Cursus in hac habitasse platea dictumst. Donec ac odio tempor orci dapibus. Amet venenatis urna cursus eget
            nunc scelerisque viverra. Nibh mauris cursus mattis molestie a. Quis hendrerit dolor magna eget est lorem
            ipsum.
          </p>
          <p>
            This is another paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris. Congue mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar.
          </p>
          <hr />
          <p>Here is a link to the <a href="https://designsystem.maersk.com">Maersk Design System's website</a>.</p>
          <hr />
          <p><strong>Strong</strong> and <em>Emphasise</em>.</p>
          <hr />
          <ol>
            <li>Ordered list item</li>
            <li>Ordered list item</li>
            <li>Ordered list item</li>
          </ol>
          <hr />
          <ul>
            <li>Unordered list item</li>
            <li>Unordered list item</li>
            <li>Unordered list item</li>
          </ul>
        </div> </mc-tab-bar
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const DefaultPageStyles: StoryObj = {};
