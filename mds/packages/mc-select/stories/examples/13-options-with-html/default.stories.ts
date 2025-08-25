import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-select label="Select number">
        <mc-option value="1"><strong>1</strong>&nbsp;One&nbsp;<strong>1</strong></mc-option>
        <mc-option value="2"><strong>2</strong>&nbsp;Two&nbsp;<strong>2</strong></mc-option>
        <mc-option value="3"><strong>3</strong>&nbsp;Three&nbsp;<strong>3</strong></mc-option>
        <mc-option value="4"><strong>4</strong>&nbsp;Four&nbsp;<strong>4</strong></mc-option>
        <mc-option value="5"><strong>5</strong>&nbsp;Five&nbsp;<strong>5</strong></mc-option> </mc-select
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const OptionsWithHTML: StoryObj = {};
