import { html } from 'lit';
import { McPicker } from '../src';
import '@maersk-global/mds-components-core-list';
import '../src';
import '@maersk-global/mds-components-core-picker-item';

context('mc-picker', () => {
  it('click on third item sets it as the selected value', () => {
    cy.mount(
      html`<mc-picker>
        <mc-picker-item value="1" label="1"></mc-picker-item>
        <mc-picker-item value="2" label="2"></mc-picker-item>
        <mc-picker-item value="3" label="3"></mc-picker-item>
        <mc-picker-item value="4" label="4"></mc-picker-item>
        <mc-picker-item value="5" label="5"></mc-picker-item>
        <mc-picker-item value="6" label="6"></mc-picker-item>
        <mc-picker-item value="7" label="7"></mc-picker-item>
        <mc-picker-item value="8" label="8"></mc-picker-item>
        <mc-picker-item value="9" label="9"></mc-picker-item
      ></mc-picker>`
    ).as('mc-picker');
    cy.get('@mc-picker').find('mc-picker-item:nth-child(3)').realClick();
    cy.get('@mc-picker').find('.selection-window').contains('3');
  });

  describe('"pickerselected" event', () => {
    it('first load do not dispatch anything', () => {
      const pickerSelectedHandler = cy.stub().as('pickerSelectedHandler');
      cy.mount<McPicker>(
        html`<mc-picker @pickerselected=${(event): void => pickerSelectedHandler(event)}>
          <mc-picker-item value="1" label="1"></mc-picker-item>
          <mc-picker-item value="2" label="2"></mc-picker-item>
          <mc-picker-item value="3" label="3"></mc-picker-item>
          <mc-picker-item value="4" label="4"></mc-picker-item>
          <mc-picker-item value="5" label="5"></mc-picker-item>
          <mc-picker-item value="6" label="6"></mc-picker-item>
          <mc-picker-item value="7" label="7"></mc-picker-item>
          <mc-picker-item value="8" label="8"></mc-picker-item>
          <mc-picker-item value="9" label="9"></mc-picker-item
        ></mc-picker>`
      ).as('mc-picker');

      cy.get('@pickerSelectedHandler').its('callCount').should('eq', 0);
    });

    it('click on an item dispatches only once with that item in the payload', () => {
      const pickerSelectedHandler = cy.stub().as('pickerSelectedHandler');
      const itemValueToScrollIntoView = '8';
      cy.mount<McPicker>(
        html`<mc-picker @pickerselected=${(event): void => pickerSelectedHandler(event)}>
          <mc-picker-item value="1" label="1"></mc-picker-item>
          <mc-picker-item disabled value="2" label="2"></mc-picker-item>
          <mc-picker-item value="3" label="3"></mc-picker-item>
          <mc-picker-item value="4" label="4"></mc-picker-item>
          <mc-picker-item value="5" label="5"></mc-picker-item>
          <mc-picker-item value="6" label="6"></mc-picker-item>
          <mc-picker-item value="7" label="7"></mc-picker-item>
          <mc-picker-item value="8" label="8"></mc-picker-item>
          <mc-picker-item value="9" label="9"></mc-picker-item
        ></mc-picker>`
      ).as('mc-picker');
      cy.get('@mc-picker').find(`mc-picker-item[value="${itemValueToScrollIntoView}"]`).click();

      cy.get('@pickerSelectedHandler').its('callCount').should('eq', 1);
      cy.get('@pickerSelectedHandler').should('have.been.calledWithMatch', {
        detail: {
          item: { value: '8' },
        },
      });
    });

    it('scrolling a disabled item into view do not dispatch', () => {
      const pickerSelectedHandler = cy.stub().as('pickerSelectedHandler');
      cy.mount<McPicker>(
        html`<mc-picker @pickerselected=${(event): void => pickerSelectedHandler(event)}>
          <mc-picker-item value="1" label="1"></mc-picker-item>
          <mc-picker-item disabled value="2" label="2"></mc-picker-item>
          <mc-picker-item value="3" label="3"></mc-picker-item>
          <mc-picker-item value="4" label="4"></mc-picker-item>
          <mc-picker-item value="5" label="5"></mc-picker-item>
          <mc-picker-item value="6" label="6"></mc-picker-item>
          <mc-picker-item value="7" label="7"></mc-picker-item>
          <mc-picker-item value="8" label="8"></mc-picker-item>
          <mc-picker-item value="9" label="9"></mc-picker-item
        ></mc-picker>`
      ).as('mc-picker');

      cy.get('@mc-picker')
        .find('mc-picker-item[disabled]')
        .then(($disabledEl) => {
          $disabledEl.get(0).scrollIntoView({ block: 'center' });
          cy.get('@pickerSelectedHandler').its('callCount').should('eq', 0);
        });
    });
  });
});
