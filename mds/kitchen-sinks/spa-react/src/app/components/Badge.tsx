import { McBadge } from '@maersk-global/mds-react-wrapper/components-core/mc-badge';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Badge = () => {
  return (
    <McButton label="Test">
      <McBadge slot="badge" label="Test"></McBadge>
    </McButton>
  );
};
