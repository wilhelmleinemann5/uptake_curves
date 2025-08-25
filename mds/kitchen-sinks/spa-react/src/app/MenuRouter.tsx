import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McMenu } from '@maersk-global/mds-react-wrapper/components-core/mc-menu';
import { McList } from '@maersk-global/mds-react-wrapper/components-core/mc-list';
import { McListItem } from '@maersk-global/mds-react-wrapper/components-core/mc-list-item';

const MenuRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  const pages = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="mds-grid mds-grid-cols-1">
      <McMenu>
        <McButton slot="trigger" icon="bars-horizontal" variant="outlined" appearance="neutral">
          Menu
        </McButton>
        <McList>
          {pages.map((page, i) => (
            <McListItem onClick={() => setCurrentIndex(page)}>
              <Link key={i} to={`/menurouter/${page}`}>
                {page}
              </Link>
            </McListItem>
          ))}
        </McList>
      </McMenu>

      <hr />
      <p>Content of page: {id}</p>
    </div>
  );
};

export default MenuRouter;
