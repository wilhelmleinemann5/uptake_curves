import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McPagination } from '@maersk-global/mds-react-wrapper/components-core/mc-pagination';

const PaginationRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  const pages = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <div className="mds-grid mds-grid-cols-1">
      <McPagination totalpages="20" currentpage={currentIndex} visiblepages="10">
        {pages.map((page, i) => (
          <Link key={i} onClick={() => setCurrentIndex(page)} to={`/paginationrouter/${page}`}>
            {page}
          </Link>
        ))}
      </McPagination>

      <hr />

      <McButton onClick={() => setCurrentIndex(3)}>
        <Link to="/paginationrouter/3">Open page 3</Link>
      </McButton>

      <hr />
      <p>Current page: {id}</p>
    </div>
  );
};

export default PaginationRouter;
