import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
// import '@maersk-global/mds-components-core-button';
// import '@maersk-global/mds-components-core-table';

const meta: Meta = {
  title: 'Components/Loading Indicator/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    let interval = null;
    let progress = 0;
    let loadingIndicator = null;
    function startInterval() {
      if (!interval) {
        interval = setInterval(fetchData, 200);
      }
    }
    function fetchData() {
      const randomNum = getRandomNum(3, 6);
      progress += randomNum;
      if (progress >= 100) {
        clearInterval(interval);
        loadingIndicator.label = `Data fetched!`;
        return;
      }
      loadingIndicator.label = `Fetching data... ${progress}%`;
    }
    function getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    setTimeout(() => {
      loadingIndicator = document.querySelector('mc-loading-indicator');
      startInterval();
    }, 0);
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-loading-indicator label="Fetching data..."></mc-loading-indicator> ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const LoadingProgress: StoryObj = {};
