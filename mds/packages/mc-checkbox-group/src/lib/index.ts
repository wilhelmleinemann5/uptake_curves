import { McMultiChoiceFieldset } from '@maersk-global/mds-components-core-multi-choice-fieldset';

/**
 * @element `mc-checkbox-group`
 * @extends McMultiChoiceFieldset
 *
 * @event change - Fired when any checkbox in the group is checked/unckecked.
 *
 * @slot - One or more <mc-checkbox> elements to display in the group.
 * @slot `legend` - The legend HTML to use for the mc-checkbox-group.
 * @slot `hint` - The hint HTML to use for the mc-checkbox-group.
 * @slot `errormessage` - The errormessage HTML to use for the mc-checkbox-group.
 *
 * @part `fieldset-container` - The container of the fieldset that holds the checkboxes.
 */
export class McCheckboxGroup extends McMultiChoiceFieldset {}
declare global {
  interface HTMLElementTagNameMap {
    'mc-checkbox-group': McCheckboxGroup;
  }
}

customElements.get('mc-checkbox-group') || customElements.define('mc-checkbox-group', McCheckboxGroup);
