import { getSlot, ISlot, legendSlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'from',
    'named',
    'mc-date-range',
    `<mc-input-date slot="from">
        <span slot="label">
            Label as HTML
        </span>
        <span slot="hint">
            Hint as HTML
        </span>
        <span slot="errormessage">
            Error message as HTML
        </span>
    </mc-input-date>`,
    'when you want to customize, or have control over the details in the "from" input',
    'Examples',
    true
  ),
  getSlot(
    'to',
    'named',
    'mc-date-range',
    `<mc-input-date slot="to">
        <span slot="label">
            Label as HTML
        </span>
        <span slot="hint">
            Hint as HTML
        </span>
        <span slot="errormessage">
            Error message as HTML
        </span>
    </mc-input-date>`,
    'when you want to customize, or have control over the details in the "to" input',
    'Examples',
    true
  ),
  legendSlot('mc-date-range'),
];
