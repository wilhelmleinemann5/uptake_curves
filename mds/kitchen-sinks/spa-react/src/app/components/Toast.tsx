import { McToast } from '@maersk-global/mds-react-wrapper/components-core/mc-toast';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McNotification } from '@maersk-global/mds-react-wrapper/components-core/mc-notification';

export const Toast = () => {
  return (
    <McToast>
      <McButton label="Toast" slot="trigger"></McButton>
      <McNotification body="Body text"></McNotification>
    </McToast>
  );
};
