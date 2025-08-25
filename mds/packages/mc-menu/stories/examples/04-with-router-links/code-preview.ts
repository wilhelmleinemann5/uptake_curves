export const preview = [
  {
    label: 'Vue3',
    template: `import "@maersk-global/mds-components-core/mc-menu";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

<mc-menu>
  <mc-button
    slot="trigger"
    hiddenlabel
    label="menu"
    icon="bars-horizontal"
    variant="outlined"
    appearance="neutral"
  ></mc-button>
  <mc-list>
    <mc-list-item><router-link to="/page1">Page 1</router-link></mc-list-item>
    <mc-list-item><router-link to="/page2">Page 2</router-link></mc-list-item>
    <mc-list-item><router-link to="/page3">Page 3</router-link></mc-list-item>
  </mc-list>
</mc-menu>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: `import { McMenu } from '@maersk-global/mds-react-wrapper/components-core/mc-menu';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McList } from '@maersk-global/mds-react-wrapper/components-core/mc-list';
import { McListItem } from '@maersk-global/mds-react-wrapper/components-core/mc-list-item';

<McMenu>
  <McButton
    slot="trigger"
    hiddenlabel
    label="menu"
    icon="bars-horizontal"
    variant="outlined"
    appearance="neutral"
  ></McButton>
  <McList>
    <McListItem><Link to="/page1">Page 1</Link></McListItem>
    <McListItem><Link to="/page2">Page 2</Link></McListItem>
    <McListItem><Link to="/page3">Page 3</Link></McListItem>
  </McList>
</McMenu>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: `import "@maersk-global/mds-components-core/mc-menu";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

<mc-menu>
  <mc-button
    slot="trigger"
    hiddenlabel
    label="menu"
    icon="bars-horizontal"
    variant="outlined"
    appearance="neutral"
  ></mc-button>
  <mc-list>
    <mc-list-item><routerLink="/page1">Page 1</router-link></mc-list-item>
    <mc-list-item><routerLink="/page2">Page 2</router-link></mc-list-item>
    <mc-list-item><routerLink="/page3">Page 3</router-link></mc-list-item>
  </mc-list>
</mc-menu>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'JavaScript/CSS/HTML',
    template: `import "@maersk-global/mds-components-core/mc-menu";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

<mc-menu>
  <mc-button
    slot="trigger"
    hiddenlabel
    label="menu"
    icon="bars-horizontal"
    variant="outlined"
    appearance="neutral"
  ></mc-button>
  <mc-list>
    <mc-list-item><a href="#page1">Page 1</a></mc-list-item>
    <mc-list-item><a href="#page2">Page 2</a></mc-list-item>
    <mc-list-item><a href="#page3">Page 3</a></mc-list-item>
  </mc-list>
</mc-menu>`,
    language: 'javascript',
    copy: true,
  },
];
