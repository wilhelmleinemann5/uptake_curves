import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { useState } from 'react';

export const Button = () => {
  const [label, setLabel] = useState('Test');
  return <McButton data-testid="mcButton" click={() => setLabel('Another Test')} icon="star" label={label}></McButton>;
};
