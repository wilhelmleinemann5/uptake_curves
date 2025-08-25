'use client';
import { useState, useEffect } from 'react';
import { McPagination } from '@maersk-global/mds-react-wrapper/components-core/mc-pagination';

export const Pagination = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McPagination totalpages={5}></McPagination> : null;
};
