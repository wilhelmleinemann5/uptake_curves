import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { McToast } from '../../../src/lib';

const meta: Meta = {
  title: 'Components/Toast/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const onTagDismiss = (tagIndex: number) => {
      const mcTags: NodeListOf<HTMLElement> = document.querySelectorAll('mc-tag') as unknown as NodeListOf<HTMLElement>;
      const mcToast: NodeListOf<McToast> = document.querySelectorAll('mc-toast');
      mcTags[tagIndex].classList.add('hidden');
      mcToast[tagIndex].show();
    };
    const restoreTag = (tagIndex) => {
      const mcTags: NodeListOf<HTMLElement> = document.querySelectorAll('mc-tag') as unknown as NodeListOf<HTMLElement>;
      const mcToast: NodeListOf<McToast> = document.querySelectorAll('mc-toast');
      mcTags[tagIndex].classList.remove('hidden');
      mcToast[tagIndex].hide();
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .hidden {
          display: none;
        }
        .container {
          display: flex;
          gap: 8px;
        }
      </style>
      <div class="container">
        <mc-tag label="engineering" withaction @dismiss=${() => onTagDismiss(0)}></mc-tag>
        <mc-tag label="ui" withaction @dismiss=${() => onTagDismiss(1)}></mc-tag>
        <mc-tag label="ux" withaction @dismiss=${() => onTagDismiss(2)}></mc-tag>
        <mc-tag label="visual-design" withaction @dismiss=${() => onTagDismiss(3)}></mc-tag>
        <mc-tag label="product" withaction @dismiss=${() => onTagDismiss(4)}></mc-tag>
      </div>
      <mc-toast appearance="info">
        <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
          <span><b>engineering</b> has been dismissed</span>
          <span slot="actions" class="mc-notification__actions">
            <mc-button
              class="undo"
              @click=${() => restoreTag(0)}
              variant="plain"
              appearance="neutral"
              padding="none"
              icon="arrow-anti-clockwise"
              >Undo</mc-button
            >
          </span>
        </mc-notification>
      </mc-toast>
      <mc-toast appearance="info">
        <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
          <span><b>ui</b> has been dismissed</span>
          <span slot="actions" class="mc-notification__actions">
            <mc-button
              class="undo"
              @click=${() => restoreTag(1)}
              variant="plain"
              appearance="neutral"
              padding="none"
              icon="arrow-anti-clockwise"
              >Undo</mc-button
            >
          </span>
        </mc-notification>
      </mc-toast>
      <mc-toast appearance="info">
        <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
          <span><b>ux</b> has been dismissed</span>
          <span slot="actions" class="mc-notification__actions">
            <mc-button
              class="undo"
              @click=${() => restoreTag(2)}
              variant="plain"
              appearance="neutral"
              padding="none"
              icon="arrow-anti-clockwise"
              >Undo</mc-button
            >
          </span>
        </mc-notification>
      </mc-toast>
      <mc-toast appearance="info">
        <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
          <span><b>visual-design</b> has been dismissed</span>
          <span slot="actions" class="mc-notification__actions">
            <mc-button
              class="undo"
              @click=${() => restoreTag(3)}
              variant="plain"
              appearance="neutral"
              padding="none"
              icon="arrow-anti-clockwise"
              >Undo</mc-button
            >
          </span>
        </mc-notification>
      </mc-toast>
      <mc-toast appearance="info">
        <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
          <span><b>product</b> has been dismissed</span>
          <span slot="actions" class="mc-notification__actions">
            <mc-button
              class="undo"
              @click=${() => restoreTag(4)}
              variant="plain"
              appearance="neutral"
              padding="none"
              icon="arrow-anti-clockwise"
              >Undo</mc-button
            >
          </span>
        </mc-notification> </mc-toast
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const TagAutotrigger: StoryObj = {};
