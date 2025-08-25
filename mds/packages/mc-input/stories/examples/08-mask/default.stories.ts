import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    let digitsInput;
    let creditCardNumberObjInput;
    document.addEventListener('DOMContentLoaded', () => {
      digitsInput = document.querySelector('#digitsInput');
      creditCardNumberObjInput = document.querySelector('#creditCardNumberObj');
      if (digitsInput) {
        digitsInput.mask = /^\d+$/;
      }
      if (creditCardNumberObjInput) {
        creditCardNumberObjInput.mask = { mask: '0000 0000 0000 0000' };
      }
    });
    const handleInputChange = (type) => {
      const prefixUnmasked = 'Unmasked value:';
      const prefixMasked = 'Masked value:';
      switch (type) {
        case 'creditCardNumber':
          return (e) => {
            if (e.target.value.length === 0) {
              creditCardNumberUnmasked.innerHTML = '';
              return;
            }
            creditCardNumberUnmasked.innerHTML = `${prefixUnmasked} ${e.target.value}`;
            creditCardNumberMasked.innerHTML = `${prefixMasked} ${e.target.maskController.maskedValue}`;
          };
        case 'containerName':
          return (e) => {
            if (e.target.value.length === 0) {
              containerNameUnmasked.innerHTML = '';
              return;
            }
            containerNameUnmasked.innerHTML = `${prefixUnmasked} ${e.target.value}`;
            containerNameMasked.innerHTML = `${prefixMasked} ${e.target.maskController.maskedValue}`;
          };
        case 'optionalInput':
          return (e) => {
            if (e.target.value.length === 0) {
              optionalInputUnmasked.innerHTML = '';
              return;
            }
            optionalInputUnmasked.innerHTML = `${prefixUnmasked} ${e.target.value}`;
            optionalInputMasked.innerHTML = `${prefixMasked} ${e.target.maskController.maskedValue}`;
          };
        case 'digits':
          return (e) => {
            if (e.target.value.length === 0) {
              digitsInputUnmasked.innerHTML = '';
              return;
            }
            digitsInputUnmasked.innerHTML = `${prefixUnmasked} ${e.target.value}`;
            digitsInputMasked.innerHTML = `${prefixMasked} ${e.target.maskController.maskedValue}`;
          };
        case 'creditCardNumberObj':
          return (e) => {
            if (e.target.value.length === 0) {
              creditCardNumberObjUnmasked.innerHTML = '';
              return;
            }
            creditCardNumberObjUnmasked.innerHTML = `${prefixUnmasked} ${e.target.value}`;
            creditCardNumberObjMasked.innerHTML = `${prefixMasked} ${e.target.maskController.maskedValue}`;
          };
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .pb-1 {
          padding-bottom: 1rem;
        }
        .my-1 {
          margin: 1rem 0 !important;
        }
      </style>
      <div style="padding-bottom: 1rem;">
        <mc-notification appearance="info" icon="question-circle" heading="How to define a mask">
          The <b><code>mask</code></b> property must be a string or a RegExp. When using a string mask pattern, the
          following special characters can be used for defining a mask: <br />
          <b>0</b> - any digit <br />
          <b>a</b> - any letter <br />
          <b>*</b> - any character <br />
          <b>[ ]</b> - optional input <br />
          <b>{ }</b> - fixed part of a mask
          <br />
          <br />
          If a definition character should be treated as fixed it should be escaped by "\\\\" (E.g. \\\\0).
          <br />
          <br />
          You can also pass a mask as an object with a <code>mask</code> property. This does not have any benefit at the
          moment, but it will be used in the future to pass mask configuration.
          <br />
          More examples on mask can be found on <a href="https://imask.js.org/">imask.js</a> page.
        </mc-notification>
      </div>
      <p class="mds-neutral--weak__text-color pb-1">Mask as a string: <code>"0000 0000 0000 0000"</code></p>
      <mc-input
        name="creditCardNumber"
        label="Credit card number"
        id="creditCardNumber"
        @input="${handleInputChange('creditCardNumber')}"
        mask="0000 0000 0000 0000"
        placeholder="1234 1234 1234 1234"
      ></mc-input>
      <div id="creditCardNumberUnmasked" class="mds-neutral--weak__text-color"></div>
      <div id="creditCardNumberMasked" class="mds-neutral--weak__text-color"></div>
      <hr class="my-1" />
      <p class="mds-neutral--weak__text-color pb-1">
        Mask as a string with fixed charecters: <code>"{MKRU} 0000 000 000"</code>
      </p>
      <mc-input
        name="containerName"
        label="Container name"
        id="containerName"
        @input="${handleInputChange('containerName')}"
        mask="{MKRU} 0000 000 000"
        hint="The container number e.g. MKRU 1234 123 123"
      ></mc-input>
      <div id="containerNameUnmasked" class="mds-neutral--weak__text-color"></div>
      <div id="containerNameMasked" class="mds-neutral--weak__text-color"></div>
      <hr class="my-1" />
      <p class="mds-neutral--weak__text-color pb-1">Mask as a string with optional input: <code>"00-aa-*[**]"</code></p>
      <mc-input
        name="optionalInput"
        label="Optional input"
        id="optionalInput"
        @input="${handleInputChange('optionalInput')}"
        mask="00-aa-*[**]"
      ></mc-input>
      <div id="optionalInputUnmasked" class="mds-neutral--weak__text-color"></div>
      <div id="optionalInputMasked" class="mds-neutral--weak__text-color"></div>
      <hr class="my-1" />
      <p class="mds-neutral--weak__text-color pb-1">
        Mask as a RegExp(allows only digits to be inserted): <code>/^\\d+$/</code>
      </p>
      <mc-input name="digitsInput" label="Digits" id="digitsInput" @input="${handleInputChange('digits')}"></mc-input>
      <div id="digitsInputUnmasked" class="mds-neutral--weak__text-color"></div>
      <div id="digitsInputMasked" class="mds-neutral--weak__text-color"></div>
      <hr class="my-1" />
      <p class="mds-neutral--weak__text-color pb-1">Mask as an object: <code>{ mask:"0000 0000 0000 0000" }</code></p>
      <mc-input
        name="creditCardNumberObj"
        label="Credit card number"
        id="creditCardNumberObj"
        @input="${handleInputChange('creditCardNumberObj')}"
      ></mc-input>
      <div id="creditCardNumberObjUnmasked" class="mds-neutral--weak__text-color"></div>
      <div id="creditCardNumberObjMasked" class="mds-neutral--weak__text-color"></div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const Mask: StoryObj = {};
