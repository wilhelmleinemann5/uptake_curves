export const preview = [
  {
    label: 'Vue3',
    template: `import "@maersk-global/mds-components-core/mc-button-group";
import "@maersk-global/mds-components-core/mc-button-group-item";

<mc-button-group>
  <mc-button-group-item value="Computer" trailingicon="computer">
    <router-link to="/computer">Computer</router-link>
  </mc-button-group-item>
  <mc-button-group-item value="Printer" icon="printer">
    <router-link to="/printer">Printer</router-link>  
  </mc-button-group-item>
  <mc-button-group-item value="File">
    <router-link to="/file">File</router-link>  
  </mc-button-group-item>
</mc-button-group>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: `import { McButtonGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group';
import { McButtonGroupItem } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group-item';

<McButtonGroup>
  <McButtonGroupItem value="Computer" trailingicon="computer">
    <Link to="/computer">Computer</Link>
  </McButtonGroupItem>
  <McButtonGroupItem value="Printer" icon="printer">
    <Link to="/printer">Printer</Link>  
  </McButtonGroupItem>
  <McButtonGroupItem value="File">
    <Link to="/file">File</Link>  
  </McButtonGroupItem>
</McButtonGroup>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: `import "@maersk-global/mds-components-core/mc-button-group";
import "@maersk-global/mds-components-core/mc-button-group-item";

<mc-button-group>
  <mc-button-group-item value="Computer" trailingicon="computer">
    <a routerLink="/computer">Computer</a>
  </mc-button-group-item>
  <mc-button-group-item value="Printer" icon="printer">
    <a routerLink="/printer">Printer</a>  
  </mc-button-group-item>
  <mc-button-group-item value="File">
    <a routerLink="/file">File</a>  
  </mc-button-group-item>
</mc-button-group>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'JavaScript/CSS/HTML',
    template: `import "@maersk-global/mds-components-core/mc-button-group";
import "@maersk-global/mds-components-core/mc-button-group-item";

<mc-button-group>
  <mc-button-group-item value="Computer" trailingicon="computer">
    <a href="#computer">Computer</a>
  </mc-button-group-item>
  <mc-button-group-item value="Printer" icon="printer">
    <a href="#printer">Printer</a>
  </mc-button-group-item>
  <mc-button-group-item value="File">
    <a href="#file">File</a>
  </mc-button-group-item>
</mc-button-group>`,
    language: 'javascript',
    copy: true,
  },
];
