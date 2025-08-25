import { html } from 'lit';
import { McCalendarMonthYearPicker } from '../../../src/lib/components/mc-calendar-month-year-picker';
import '../../../src/lib/components/mc-calendar-month-year-picker';

context('mc-calendar-month-year-picker', () => {
  describe('in English', () => {
    beforeEach(() => {
      const closedSpy = cy.spy().as('onClosedSpy');
      const selectedSpy = cy.spy().as('onSelectedSpy');

      cy.mount<McCalendarMonthYearPicker>(
        html`<mc-calendar-month-year-picker
          @closed="${(e: CustomEvent): void => closedSpy(e.detail.value)}"
          @monthyearselected="${(e: CustomEvent): void => selectedSpy(e.detail.value)}"
          .value=${{ month: 2, year: 2023 }}
          locale="en-GB"
        ></mc-calendar-month-year-picker>`,
      ).as('mc-calendar-month-year-picker');
    });

    it('sets the provided values', () => {
      cy.get('[data-cy="selection-window"]').should('have.text', 'March2023');
    });

    it('dispatches `closed` event when the component is closed', () => {
      cy.get('@mc-calendar-month-year-picker').invoke('remove');
      cy.wait(500);
      cy.get('@onClosedSpy').its('callCount').should('eq', 1);
      cy.get('@mc-calendar-month-year-picker').should('not.exist');
    });

    // TODO: marked to be skipped due to flakiness in the pipeline, fix this test, as soon as possible
    it.skip('dispatches `monthyearselected` event on selection', () => {
      cy.get('[value="February"]').as('feb-cell');
      cy.get('@feb-cell').click();
      cy.wait(500);
      cy.get('@onSelectedSpy').its('callCount').should('eq', 1);
    });
  });
  describe('in a different locale', () => {
    it('should render months in a different locale', () => {
      cy.mount<McCalendarMonthYearPicker>(
        html`<mc-calendar-month-year-picker
          @closed="${(e: CustomEvent): void => closedSpy(e.detail.value)}"
          @monthyearselected="${(e: CustomEvent): void => selectedSpy(e.detail.value)}"
          .value=${{ month: 2, year: 2023 }}
          locale="fr-FR"
        ></mc-calendar-month-year-picker>`,
      ).as('mc-calendar-month-year-picker-in-fr');

      cy.get('@mc-calendar-month-year-picker-in-fr')
        .get('[data-cy="selection-window"]')
        .should('have.text', 'mars2023');
    });
  });
});
