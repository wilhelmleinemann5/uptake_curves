export const preview = [
  {
    label: 'Vue3',
    template: `import '@maersk-global/mds-components-core/mc-button';

<mc-button>
  <router-link to="/my-route">Button with router link</router-link>
</mc-button>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: `import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

<McButton>
  <Link to="/my-route">Button with router link</Link>
</McButton>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: `import '@maersk-global/mds-components-core/mc-button';

<mc-button>
  <a routerLink="/my-route">Button with router link</a>
</mc-button>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-button';

// HTML
<mc-button>
  <a href="#link">Button with router link</a>
</mc-button>`,
    language: 'javascript',
    copy: true,
  },
];
