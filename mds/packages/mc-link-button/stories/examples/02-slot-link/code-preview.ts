export const preview = [
  {
    label: 'Vue3',
    template: `import '@maersk-global/mds-components-core/mc-link-button';

<mc-link-button>
  <router-link to="/my-route">Link button with router link</router-link>
</mc-link-button>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: `import { McLinkButton } from '@maersk-global/mds-react-wrapper/components-core/mc-link-button';

<McLinkButton>
  <Link to="/my-route">Link button with router link</Link>
</McLinkButton>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: `import '@maersk-global/mds-components-core/mc-link-button';

<mc-link-button>
  <a routerLink="/my-route">Link button with router link</a>
</mc-link-button>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-link-button';

// HTML
<mc-link-button>
  <a href="#link">Link button with router link</a>
</mc-link-button>`,
    language: 'javascript',
    copy: true,
  },
];
