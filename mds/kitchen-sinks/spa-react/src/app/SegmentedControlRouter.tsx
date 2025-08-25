import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McSegmentedControl } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control';
import { McSegmentedControlItem } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control-item';

const MenuRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  const pages = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="mds-grid mds-grid-cols-1">
      <McSegmentedControl type="none">
        {pages.map((page, i) => (
          <McSegmentedControlItem selected={currentIndex === page} onClick={() => setCurrentIndex(page)}>
            <Link key={i} to={`/segmentedcontrolrouter/${page}`}>
              {page}
            </Link>
          </McSegmentedControlItem>
        ))}
      </McSegmentedControl>

      <hr />
      <p>Content of page: {id}</p>
    </div>
  );
};

export default MenuRouter;
