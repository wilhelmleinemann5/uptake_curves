import { TemplateResult, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const renderComponentBanner = (heading: string, message: TemplateResult): TemplateResult => {
  return html` <div class="story-notification">
    <mc-notification .heading="${heading}" icon=""> ${message} </mc-notification>
  </div>`;
};

export const renderBetaBanner = (entity: 'component' | 'feature' = 'component'): TemplateResult => {
  return html`<div class="story-notification">
    <mc-notification icon="exclamation-triangle" appearance="warning">
      <p>
        This ${entity} is considered "beta" and is open for testing and
        <a
          href="https://designsystem.maersk.com/about/help-and-support/"
          target="_blank"
          class="mds-neutral__text-color"
          >feedback</a
        >. However, we recommend caution when using this ${entity} in your production applications as breaking changes
        may be introduced between releases.
      </p>
    </mc-notification>
  </div>`;
};

export const renderAlphaBanner = (entity: 'component' | 'feature' = 'component'): TemplateResult => {
  return html`<div class="story-notification">
    <mc-notification icon="exclamation-triangle" appearance="warning">
      <p>
        This ${entity} is considered "alpha and under construction" and is open for testing and
        <a
          href="https://designsystem.maersk.com/about/help-and-support/"
          target="_blank"
          class="mds-neutral__text-color"
          >feedback</a
        >. However, we recommend caution when using this ${entity} in your production applications as breaking changes
        may be introduced between releases.
      </p>
    </mc-notification>
  </div>`;
};

export const renderDeprecationBanner = (componentName: string, supersededBy: string): TemplateResult => {
  return html`<div class="story-notification">
    <mc-notification icon="exclamation-triangle" appearance="warning">
      <strong>
        The ${componentName} has now been superseded by the ${unsafeHTML(supersededBy)} core MDS components.
      </strong>
      <p>It is recommended to use/migrate to the new core MDS components.</p>
    </mc-notification>
  </div>`;
};

export const renderExperimentalBannerHtml = `<div class="story-notification"><mc-notification
      icon="chemistry-beakers"
      heading="Experiments are not production-ready"
      appearance="warning"
      .actions=${[{ url: 'https://designsystem.maersk.com/experiments/', label: 'Read more about MDS Experiments' }]}
    >
      <p>There will be missing documentation, design and code. Experiments are subject to frequent breaking changes.</p>
    </mc-notification></div>`;

export const renderExperimentalBanner = (content?: string): TemplateResult => {
  return html`<div class="story-notification">${unsafeHTML(content ? content : renderExperimentalBannerHtml)}</div>`;
};

export const renderDialogFocusTrapBanner = (componentName: string): TemplateResult => {
  return html`<div class="story-notification">
    <mc-notification heading="Focus trapping in the documentation">
      <p>
        The ${componentName} component uses browser's native focus trap to prevent users from navigating away using the
        keyboard. The focus trap does not work in the StoryBook example due to multiple iframes. Please
        <a
          href="http://${window.location.host ||
          'mds.maersk.com'}/iframe.html?id=components-${componentName}-documentation--documentation&viewMode=story"
          >open the canvas in fullscreen</a
        >
        to test the focus trap.
      </p>
    </mc-notification>
  </div>`;
};
