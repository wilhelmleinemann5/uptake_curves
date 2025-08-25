import { html } from 'lit';

export default {
  title: 'Themes & tokens',
  parameters: {
    preview: { disable: true },
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const About = (args) => html`
<div class="mds-content">
  <p>The Maersk Design System's <a href="https://github.com/Maersk-Global/mds/tree/main/packages/foundations" target="_blank" className="mds-link--external">@maersk-global/mds-foundations</a> package contains page 
level CSS that you can use as the base of your web solutions.</p>

  <p>CSS classes are scoped to the <code>mds</code> class, so if you want to use foundations in your application, you have to add a <code>mds</code> class to a container element, e.g. <code>&lt;body&gt;</code> etc.</p>

  <p>We also provide a <code>mds-content</code> class. Adding this class to a container element e.g. <code>&lt;article&gt;</code> will provide spacing/margins for headers, paragraphs, unordered lists etc.</p> 

  <p>CSS & SASS Foundations include styling for:</p>

  <ul>
    <li><a href="/?path=/story/css-foundations-body-text">Body text</a></li>
    <li><a href="/?path=/story/css-foundations-colour">Colours</a></li>
    <li><a href="/?path=/story/css-foundations-headings">Headings</a></li>
    <li><a href="/?path=/story/css-foundations-links">Links</a></li>
    <li><a href="/?path=/story/css-foundations-lists">Lists</a></li>
    <li><a href="/?path=/story/css-foundations-breakpoints">Breakpoints & media queries</a></li>
    <li><a href="/?path=/story/css-foundations-table">Table</a></li>
    <li><a href="/?path=/story/css-foundations-typography">Typography</a></li>
  </ul>
</div>


Visit our website for more information on <a href="https://designsystem.maersk.com/get-started/developers/css/index.html" target="_blank" className="mds-link--external">getting started with foundations</a>.

<div style={{margin: "40px 0px"}}>
  <mc-notification heading="Need help using the Maersk Design System?">
    <div>Have you found a bug or have a new idea and not sure who to call or just need a chat? Check out our <a href="https://designsystem.maersk.com/about/help-and-support/" target="_blank" class="mds-neutral__text-color">help and support guidelines</a></div>
  </mc-notification>
</div>
`;
