import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McButtonGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group';
import { McButtonGroupItem } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group-item';

const MenuRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  const pages = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="mds-grid mds-grid-cols-1">
      <McButtonGroup>
        {pages.map((page, i) => (
          <McButtonGroupItem onClick={() => setCurrentIndex(page)}>
            <Link key={i} to={`/buttongrouprouter/${page}`}>
              {page}
            </Link>
          </McButtonGroupItem>
        ))}
      </McButtonGroup>

      <hr />
      <p>Content of page: {id}</p>
    </div>
  );
};

export default MenuRouter;
