import { McDateRange } from '../src';
import '../src';
import { IDateRangeValue } from '../src/types';

const fromDate = '2022-08-14';
const toDate = '2022-08-21';
const inputName = 'test';

const chooseFromAndThenToInCalendarAndAssert = (
  from: string,
  to: string,
  expectedValue: IDateRangeValue | null,
): void => {
  // choosing the date in the 'from' calendar popover
  cy.get('@from-input').realClick();
  // wait for the drawer animation to finish

  cy.wait(250);
  cy.get('@from-input-date').find('mc-calendar').as('from-calendar');
  cy.get('@from-calendar').invoke('attr', 'activedate', from);
  cy.get('@from-calendar').find(`[data-date="${from}"]`).realClick();
  cy.get('@from-input-hidden').should('have.value', from);
  // wait for the drawer closing animation to finish

  cy.wait(250);
  // choosing the date in the 'to' calendar popover
  cy.get('@to-input').realClick();
  // wait for the drawer animation to finish

  cy.wait(250);
  cy.get('@to-input-date').find('mc-calendar').as('to-calendar');
  cy.get('@to-calendar').invoke('attr', 'activedate', to);
  cy.get('@to-calendar').find(`[data-date="${to}"]`).realClick();
  cy.get('@to-input-hidden').should('have.value', to);

  // assert selected value on the date range component itself
  cy.get('@mc-date-range')
    .invoke('val')
    .then((value) => expect(value).to.deep.equal(expectedValue));
};

const chooseToAndThenFromInCalendarAndAssert = (
  from: string,
  to: string,
  expectedValue: IDateRangeValue | null,
): void => {
  // choosing the date in the 'to' calendar popover
  cy.get('@to-input').realClick();
  // wait for the drawer animation to finish

  cy.wait(250);
  cy.get('@to-input-date').find('mc-calendar').as('to-calendar');
  cy.get('@to-calendar').invoke('attr', 'activedate', to);
  cy.get('@to-calendar').find(`[data-date="${to}"]`).realClick();
  cy.get('@to-input-hidden').should('have.value', to);
  // wait for the drawer closing animation to finish

  cy.wait(250);
  // choosing the date in the 'from' calendar popover
  cy.get('@from-input').realClick();
  // wait for the drawer animation to finish

  cy.wait(250);
  cy.get('@from-input-date').find('mc-calendar').as('from-calendar');
  cy.get('@from-calendar').invoke('attr', 'activedate', from);
  cy.get('@from-calendar').find(`[data-date="${from}"]`).realClick();
  cy.get('@from-input-hidden').should('have.value', from);

  // assert selected value on the date range component itself
  cy.get('@mc-date-range')
    .invoke('val')
    .then((value) => expect(value).to.deep.equal(expectedValue));
};

context('mc-date-range-range', () => {
  beforeEach(() => {
    cy.mount<McDateRange>(`<form><mc-date-range name="${inputName}"></mc-date-range></form>`).as('form');

    cy.get('@form').find('mc-date-range').as('mc-date-range');

    cy.get('@mc-date-range').find('[data-cy="from-input"]').as('from-input-date');
    cy.get('@from-input-date').find('input[aria-hidden="true"]').as('from-input-hidden');
    cy.get('@mc-date-range').find('[data-cy="from-input"]').shadow().find('input[data-cy="input"]').as('from-input');

    cy.get('@mc-date-range').find('[data-cy="to-input"]').as('to-input-date');
    cy.get('@to-input-date').find('input[aria-hidden="true"]').as('to-input-hidden');
    cy.get('@mc-date-range').find('[data-cy="to-input"]').shadow().find('input[data-cy="input"]').as('to-input');
  });

  describe('general', () => {
    it('setting the value tuple from outside would set the corresponding value into the underlying input date', () => {
      const from = '2023-04-01';
      const to = '2023-03-01';

      cy.get('@mc-date-range').invoke('prop', 'value', { from, to });
      cy.get('@from-input').should('have.value', from);
      cy.get('@from-input-hidden').should('have.value', from);
      cy.get('@to-input').should('have.value', to);
      cy.get('@to-input-hidden').should('have.value', to);
    });
  });

  describe('within the form', () => {
    it('parent form gets updated when typing date into the input', () => {
      cy.get('@from-input').focus();
      cy.get('@from-input').realType(fromDate);
      cy.get('@from-input-hidden').should('have.value', fromDate);
      cy.get('@to-input').focus();
      cy.get('@to-input').realType(toDate);
      cy.get('@to-input-hidden').should('have.value', toDate);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(`{"from":"${fromDate}","to":"${toDate}"}`);
      });
    });

    it('parent form gets the selected date value when using the calendar', () => {
      chooseFromAndThenToInCalendarAndAssert(fromDate, toDate, { from: fromDate, to: toDate });

      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(`{"from":"${fromDate}","to":"${toDate}"}`);
      });
    });
  });

  describe('choose date from calendar', () => {
    it('select a valid date range with "from" <= "to", maintains the original dates and sets the value to the aggregated date', () => {
      chooseFromAndThenToInCalendarAndAssert(fromDate, toDate, { from: fromDate, to: toDate });
    });

    it('select an invalid date "from" date which is greater than the "to" date, maintains the newly selected "from" date and sets "to" date to empty', () => {
      const from = '2023-04-01';
      const to = '2023-03-01';

      chooseToAndThenFromInCalendarAndAssert(from, to, { from, to: null });
    });

    it('select an invalid date "to" date which is less than the "from" date, maintains the newly selected "to" date and sets "from" date to empty', () => {
      const from = '2023-04-01';
      const to = '2023-03-01';

      chooseFromAndThenToInCalendarAndAssert(from, to, { from: null, to });
    });
  });

  describe('type-in and blur', () => {
    it('type in an invalid date in "from" input date which is greater than the "to" date, maintains the newly entered "from" date and sets the "to" date to empty', () => {
      const from = '2023-04-01';
      const to = '2023-03-01';

      cy.get('@to-input').focus();
      cy.get('@to-input').realType(to);
      cy.get('@to-input-hidden').should('have.value', to);

      cy.get('@from-input').focus();
      cy.get('@from-input').realType(from);
      cy.get('@from-input-hidden').should('have.value', from);

      // blur "from"
      cy.get('@to-input').focus();

      // assert selected value on the date range component itself
      cy.get('@mc-date-range')
        .invoke('val')
        .then((value) => expect(value).to.deep.equal({ from, to: null }));
    });

    it('type in an invalid date in "to" input date which is less than the "from" date, maintains the newly entered "to" date and sets the "from" date to empty', () => {
      const from = '2023-04-01';
      const to = '2023-03-01';

      cy.get('@from-input').focus();
      cy.get('@from-input').realType(from);
      cy.get('@from-input-hidden').should('have.value', from);

      cy.get('@to-input').focus();
      cy.get('@to-input').realType(to);
      cy.get('@to-input-hidden').should('have.value', to);

      // blur "to"
      cy.get('@from-input').focus();

      // assert selected value on the date range component itself
      cy.get('@mc-date-range')
        .invoke('val')
        .then((value) => expect(value).to.deep.equal({ from: null, to }));
    });

    it('preserves both from and to when the format is `DD-MM-YYYY` and the dates are in a valid range (from < to)', () => {
      cy.get('@mc-date-range').invoke('prop', 'format', 'DD-MM-YYYY');
      const from = '01-04-2023';
      const to = '01-04-2024';
      const expectedFrom = '01-05-2023';

      cy.get('@from-input').focus();
      cy.get('@from-input').realType(from);
      cy.get('@from-input-hidden').should('have.value', from);

      cy.get('@to-input').focus();
      cy.get('@to-input').realType(to);
      cy.get('@to-input-hidden').should('have.value', to);

      // change "from", but still to a valid date
      cy.get('@from-input-date').invoke('prop', 'value', expectedFrom);

      // blur "from"
      cy.get('body').realClick();

      // assert selected value on the date range component itself
      cy.get('@mc-date-range')
        .invoke('val')
        .then((value) => expect(value).to.deep.equal({ from: expectedFrom, to }));
    });
  });
});
