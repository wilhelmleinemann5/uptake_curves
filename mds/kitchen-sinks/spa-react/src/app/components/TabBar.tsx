import { McTabBar } from '@maersk-global/mds-react-wrapper/components-core/mc-tab-bar';
import { McTab } from '@maersk-global/mds-react-wrapper/components-core/mc-tab';

export const TabBar = () => {
  return (
    <McTabBar>
      <McTab slot="tab" label="Info" icon="info-circle"></McTab>
      <div slot="panel">Info page with lots of information about us.</div>
      <McTab slot="tab" label="Work" icon="globe"></McTab>
      <div slot="panel">Work page that showcases our work.</div>
      <McTab slot="tab" label="Hobby" icon="heart"></McTab>
      <div slot="panel">Hobby page that shows our interests.</div>
      <McTab slot="tab" label="Contact" icon="envelope"></McTab>
      <div slot="panel">Contact page that shows our contacts.</div>
      <McTab slot="tab" label="Address" icon="warehouse"></McTab>
      <div slot="panel">Address page that shows our addresses.</div>
    </McTabBar>
  );
};
