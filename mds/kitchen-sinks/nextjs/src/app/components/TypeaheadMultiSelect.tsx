'use client';
import { useState, useEffect } from 'react';
import { McTypeaheadMultiSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-typeahead-multi-select';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

export const TypeaheadMultiSelect = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McTypeaheadMultiSelect>
      <McOption value="One">One</McOption>
      <McOption value="Two">Two</McOption>
      <McOption value="Three" disabled>
        Three
      </McOption>
      <McOption value="Four">Four</McOption>
      <McOption value="Five">Five</McOption>
    </McTypeaheadMultiSelect>
  ) : null;
};
