import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McTab } from '@maersk-global/mds-react-wrapper/components-core/mc-tab';
import { McTabBar } from '@maersk-global/mds-react-wrapper/components-core/mc-tab-bar';

const TabBarRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  return (
    <div className="mds-grid mds-grid-cols-1">
      <McTabBar currentindex={currentIndex}>
        <McTab onClick={() => setCurrentIndex(0)} slot="tab">
          <Link to="/tabbarrouter/0">Tab 1</Link>
        </McTab>
        <div slot="panel">Tab 1</div>
        <McTab onClick={() => setCurrentIndex(1)} slot="tab">
          <Link to="/tabbarrouter/1">Tab 2</Link>
        </McTab>
        <div slot="panel">Tab 2</div>
        <McTab onClick={() => setCurrentIndex(2)} slot="tab">
          <Link to="/tabbarrouter/2">Tab 3</Link>
        </McTab>
        <div slot="panel">Tab 3</div>
      </McTabBar>

      <hr />

      <McButton onClick={() => setCurrentIndex(2)}>
        <Link to="/tabbarrouter/2">Open tab 3</Link>
      </McButton>

      <hr />
      <p>Current index: {id}</p>
    </div>
  );
};

export default TabBarRouter;
