import type { IMcTypeahead, IMcTypeaheadData } from '@maersk-global/mds-components-core-typeahead/types';

// Extended interface for multi-select specific data including custom tags
export type IMcTypeaheadMultiSelectData = IMcTypeaheadData & {
  /**
   * Indicates if this is a custom tag created by the user (not from the dropdown options)
   */
  isCustomTag?: boolean;
};

export interface IMcTypeaheadMultiSelect extends IMcTypeahead {
  /**
   * Array of selected data that will be rendered as tags.
   * Can be set initially to pre-populate the component with selected options.
   * @default []
   * @type IMcTypeaheadMultiSelectData[]
   */
  selecteddata?: IMcTypeaheadMultiSelectData[];
  /**
   * If set to true, the typeahead will hide tags with selected options.
   * This is useful when you want to keep the input clean and only show the selected options in the dropdown.
   * @default false
   * @type boolean
   */
  hiddentags?: boolean;
  /**
   * Label for the clear all filters button that appears when there are more than 2 selected options.
   * Set to empty string to disable the clear filters button.
   * @default "Clear filters"
   * @type string
   */
  clearalllabel?: string;
  /**
   * Allows users to create custom tags by pressing Enter when the input doesn't match any dropdown option.
   * Custom tags can be dismissed without affecting the dropdown suggestion list.
   * @default false
   * @type boolean
   */
  freetexttagging?: boolean;
  /**
   * Callback function you can add to mc-tag @dismiss, whenever hiddentags property is passed, and you want to display tags another place on the page (not directly below the typeahead).
   * This function will be called with the array of selected options.
   * @param option - The option to remove
   * @param preventPopoverOpen - Whether to prevent the popover from opening after removal (default: false)
   */
  removeSelectedOption?: (option: IMcTypeaheadMultiSelectData, preventPopoverOpen?: boolean) => void;
}
