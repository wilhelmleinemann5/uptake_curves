import type { IMcListItem } from '@maersk-global/mds-shared-types';
export type { Fit, IMcListItem, McListValueType, ListTypes, IMcList, McListKeyNavigationType, McListRole, MouseMoveVisibleArea } from '@maersk-global/mds-shared-types';

export interface IMcListChangeDetail {
  readonly item?: IMcListItem;
}

export interface IMcListItemsLoadedDetail {
  readonly items: IMcListItem[];
}

export interface IMcListFocusChangeDetail {
  readonly item?: IMcListItem;
  readonly index?: number;
}
