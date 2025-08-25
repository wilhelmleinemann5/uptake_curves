import { html } from 'lit';
import './welcome.css';
import imageFile from '../.storybook/public/hero.svg';

export default {
  title: 'Welcome',
  parameters: {
    preview: { disable: true },
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};
export const Welcome = (args) => html`
  <div class="home-hero">
    <h1>
      <span class="home-hero__block">The Maersk Design</span>
      <span class="home-hero__block"> System's <span class="home-hero__emphasise">developer</span></span>
      <span class="home-hero__block">
        <span class="home-hero__emphasise"> companion resource</span>
      </span>
    </h1>
    <img src="${imageFile}" />
  </div>
  <div class="mds-content home-content">
    <p>
      Here you will find developer API documentation for the
      <a href="https://designsystem.maersk.com" target="_blank" class="mds-link--external">Maersk Design System's</a>
      components and CSS.
    </p>
    <p>If this is your first time using the Maersk Design System, then we recommend that you:</p>
    <ul>
      <li>
        Familiarise yourself with the
        <a href="https://designsystem.maersk.com" target="_blank" class="mds-link--external"
          >Maersk Design System website</a
        >
      </li>
      <li>
        Read the
        <a
          href="https://designsystem.maersk.com/get-started/developers/index.html"
          target="_blank"
          class="mds-link--external"
          >installation &amp; integration guides</a
        >
      </li>
    </ul>
  </div>

  <mc-notification heading="Need help using the Maersk Design System?">
    <div>
      Have you found a bug or have a new idea and not sure who to call or just need a chat? Check out our
      <a href="https://designsystem.maersk.com/about/help-and-support/" target="_blank" class="mds-neutral__text-color"
        >help and support guidelines</a
      >
    </div>
  </mc-notification>
`;
