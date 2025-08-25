import { McMultiChoiceFieldset } from '@maersk-global/mds-components-core-multi-choice-fieldset';

/**
 * @element `mc-switch-group`
 * @extends McMultiChoiceFieldset
 *
 * @event {CustomEvent<string | undefined>} change - Emitted when any of the mc-switch element in the group is checked/unchecked.
 *
 * @slot - One or more <mc-switch> elements to display in the group.
 * @slot `legend` - The legend HTML to use for the mc-switch-group.
 * @slot `hint` - The hint HTML to use for the mc-switch-group.
 * @slot `errormessage` - The errormessage HTML to use for the mc-switch-group.
 *
 * @part `fieldset-container` - The container of the fieldset that holds the switches.
 */
export class McSwitchGroup extends McMultiChoiceFieldset {}

declare global {
  interface HTMLElementTagNameMap {
    'mc-switch-group': McSwitchGroup;
  }
}

customElements.get('mc-switch-group') || customElements.define('mc-switch-group', McSwitchGroup);
