export const preview = [
  {
    label: 'Vue3',
    template: `import "@maersk-global/mds-components-core/mc-segmented-control";
import "@maersk-global/mds-components-core/mc-segmented-control-item";

<mc-segmented-control type="none">
  <mc-segmented-control-item trailingicon="computer">
    <router-link to="/computer">Computer</router-link>
  </mc-segmented-control-item>
  <mc-segmented-control-item icon="printer">
    <router-link to="/printer">Printer</router-link>  
  </mc-segmented-control-item>
  <mc-segmented-control-item>
    <router-link to="/file">File</router-link>  
  </mc-segmented-control-item>
</mc-segmented-control>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: `import { McSegmentedControl } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control';
import { McSegmentedControlItem } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control-item';

<McSegmentedControl type="none">
  <McSegmentedControlItem trailingicon="computer">
    <Link to="/computer">Computer</Link>
  </McSegmentedControlItem>
  <McSegmentedControlItem icon="printer">
    <Link to="/printer">Printer</Link>  
  </McSegmentedControlItem>
  <McSegmentedControlItem>
    <Link to="/file">File</Link>  
  </McSegmentedControlItem>
</McSegmentedControl>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: `import "@maersk-global/mds-components-core/mc-segmented-control";
import "@maersk-global/mds-components-core/mc-segmented-control-item";

<mc-segmented-control type="none">
  <mc-segmented-control-item trailingicon="computer">
    <a routerLink="/computer">Computer</a>
  </mc-segmented-control-item>
  <mc-segmented-control-item icon="printer">
    <a routerLink="/printer">Printer</a>  
  </mc-segmented-control-item>
  <mc-segmented-control-item>
    <a routerLink="/file">File</a>  
  </mc-segmented-control-item>
</mc-segmented-control>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'JavaScript/CSS/HTML',
    template: `import "@maersk-global/mds-components-core/mc-segmented-control";
import "@maersk-global/mds-components-core/mc-segmented-control-item";

<mc-segmented-control type="none">
  <mc-segmented-control-item trailingicon="computer">
    <a href="#computer">Computer</a>
  </mc-segmented-control-item>
  <mc-segmented-control-item icon="printer">
    <a href="#printer">Printer</a>
  </mc-segmented-control-item>
  <mc-segmented-control-item>
    <a href="#file">File</a>
  </mc-segmented-control-item>
</mc-segmented-control>`,
    language: 'javascript',
    copy: true,
  },
];
