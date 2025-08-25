/// <reference types="cypress" />
import { html } from 'lit';
import type { McCalendar } from '../src';
import '../src';

const date = '2022-08-14 14:55';

const focusButton = (selector: string): unknown => {
  return cy.get(selector).then(($el) => {
    $el[0].focus();
  });
};

context('mc-calendar', () => {
  describe('interaction', () => {
    beforeEach(() => {
      cy.mount<McCalendar>(html`<mc-calendar .value="${date}"></mc-calendar>`).as('mc-calendar');
      // aliases
      cy.get('[data-cy="month-name"]').as('month-name-button');
      cy.get('[data-cy="previousButton"]').as('previous-button');
      cy.get('[data-cy="nextButton"]').as('next-button');
    });

    it('sets the active date to today when today equals max but has a later time', () => {
      const min = '2021-12-03';
      const max = '2022-08-14';

      cy.get('mc-calendar').invoke('prop', 'min', min);
      cy.get('mc-calendar').invoke('prop', 'max', max);
      cy.get('mc-calendar').click();

      cy.get('@month-name-button').contains('August 2022');
    });

    it('sets active date to min if min and max are in the same month', () => {
      const min = '2023-12-03';
      const max = '2023-12-15';

      cy.get('mc-calendar').invoke('attr', 'min', min);
      cy.get('mc-calendar').invoke('attr', 'max', max);

      cy.get('[data-cy="month-name"]').contains('December 2023');
    });

    it("sets active date to min's month, if min's month is after the calendar's value", () => {
      const min = '2022-09-10';

      cy.get('mc-calendar').invoke('prop', 'min', min);

      cy.get('[data-cy="month-name"]').contains('September 2022');
    });

    it("sets active date to max's month, if max is before the calendar's value", () => {
      const max = '2022-07-10';

      cy.get('mc-calendar').invoke('prop', 'max', max);

      cy.get('[data-cy="month-name"]').contains('July 2022');
    });

    it('no day is selected by default', () => {
      cy.get('mc-calendar').invoke('attr', 'value', '');
      cy.get('mc-calendar').find('[data-cy="day-selected"]').should('not.exist');
    });

    it('clicking on an enabled date marks it as selected', () => {
      cy.get('mc-calendar').find('[data-cy="day"]').first().click();
      cy.get('mc-calendar').find('[data-cy="day-selected"]').should('exist');
    });

    it('clicking on enabled previous button navigates to next month', () => {
      cy.get('@previous-button').click();
      cy.get('[data-cy="month-name"]').contains('July 2022');
    });

    it('clicking on enabled next button navigates to next month', () => {
      cy.get('@next-button').click();
      cy.get('[data-cy="month-name"]').contains('September 2022');
    });

    it('is possible to navigate to previous month, even if it is not in the allowed range', () => {
      cy.get('mc-calendar').invoke('attr', 'min', '2022-08-01');
      cy.get('@previous-button').should('not.have.attr', 'disabled');
    });

    it('is possible to navigate to next month, even if it is not in the allowed range', () => {
      cy.get('mc-calendar').invoke('attr', 'max', '2022-08-31');
      cy.get('@next-button').should('not.have.attr', 'disabled');
    });

    it('renders weekdays in required order', () => {
      cy.get('[data-cy="weekday"]').should(($weekdays) => {
        const joinedString = $weekdays.text();
        expect(joinedString).to.match(/MonTueWedThuFriSatSun/);
      });

      cy.get('mc-calendar').invoke('attr', 'startofweek', '0');

      cy.get('[data-cy="weekday"]').should(($elements) => {
        const joinedString = $elements.text();
        expect(joinedString).to.match(/SunMonTueWedThuFriSat/);
      });
    });

    it('renders the month name in specified locale', () => {
      cy.get('mc-calendar').invoke('attr', 'locale', 'pl');
      cy.get('[data-cy="month-name"]').contains('sierpień 2022');
    });

    it('shows February 2024 by default when activedate is set to "2024-02-01"', () => {
      cy.get('mc-calendar').invoke('attr', 'activedate', '2024-02-01');
      cy.get('[data-cy="month-name"]').contains('February 2024');
    });

    it('renders the weekdays in specified locale', () => {
      cy.get('mc-calendar').invoke('attr', 'locale', 'pl');
      cy.get('[data-cy="weekday"]').should(($weekdays) => {
        const joinedString = $weekdays.text();
        expect(joinedString).to.match(/pon.wt.śr.czw.pt.sob.niedz./);
      });
    });

    describe('dayperiod', () => {
      it('renders weekdays in short format by default', () => {
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MonTueWedThuFriSatSun/);
        });
      });

      it('renders weekdays in long format when dayperiod is set to "long"', () => {
        cy.get('mc-calendar').invoke('attr', 'dayperiod', 'long');
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MondayTuesdayWednesdayThursdayFridaySaturdaySunday/);
        });
      });

      it('renders weekdays in short format when dayperiod is set to "short"', () => {
        cy.get('mc-calendar').invoke('attr', 'dayperiod', 'short');
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MonTueWedThuFriSatSun/);
        });
      });

      it('renders weekdays in narrow format when dayperiod is set to "narrow"', () => {
        cy.get('mc-calendar').invoke('attr', 'dayperiod', 'narrow');
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MTWTFSS/);
        });
      });

      it('renders weekdays in specified locale and dayperiod format', () => {
        cy.get('mc-calendar').invoke('attr', 'locale', 'pl');
        cy.get('mc-calendar').invoke('attr', 'dayperiod', 'long');
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/poniedziałekwtorekśrodaczwartekpiąteksobotaniedziela/);
        });
      });

      it('updates weekday display when dayperiod is changed dynamically', () => {
        // Start with default short format
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MonTueWedThuFriSatSun/);
        });

        // Change to narrow format
        cy.get('mc-calendar').invoke('attr', 'dayperiod', 'narrow');
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MTWTFSS/);
        });

        // Change to long format
        cy.get('mc-calendar').invoke('attr', 'dayperiod', 'long');
        cy.get('[data-cy="weekday"]').should(($weekdays) => {
          const joinedString = $weekdays.text();
          expect(joinedString).to.match(/MondayTuesdayWednesdayThursdayFridaySaturdaySunday/);
        });
      });
    });

    it('selects a date passed as value', () => {
      cy.get('mc-calendar').invoke('attr', 'value', '2022-08-20');
      cy.get('mc-calendar').find('[data-date="2022-08-20"]').should('have.attr', 'data-cy', 'day-selected');
    });

    it('disables dates passed to the `customize` prop', () => {
      const customize = [
        { date: '2022-08-17', disabled: true },
        { date: new Date(2022, 7, 18), disabled: true },
        { date: { from: '2022-08-22', to: '2022-08-24' }, disabled: true },
      ];
      const expectedDisabledDates = ['2022-08-17', '2022-08-18', '2022-08-22', '2022-08-23', '2022-08-24'];
      cy.get('mc-calendar').then(($calendar) => {
        $calendar[0].customize = customize;
      });
      cy.get('mc-button[disabled]').each((el) =>
        expect(expectedDisabledDates).to.include(el[0].getAttribute('data-date')),
      );
    });

    it('customizes dates passed to the `customize` prop', () => {
      const customstyles = `.holiday{ background: rgb(197, 229, 194);}`;
      const customize = [{ date: (date: Date): boolean => date.getDay() === 0, customClasses: ['holiday'] }];
      const expectedDatesWithHolidayClass = ['2022-08-07', '2022-08-14', '2022-08-21', '2022-08-28', '2022-09-04'];
      cy.get('mc-calendar').invoke('attr', 'customstyles', customstyles);
      cy.get('mc-calendar').then(($calendar) => {
        $calendar[0].customize = customize;
      });
      cy.get('.holiday').each((el) => {
        expect(expectedDatesWithHolidayClass).to.include(el[0].getAttribute('data-date'));
        expect(el[0]).to.have.css(
          'background',
          'rgb(197, 229, 194) none repeat scroll 0% 0% / auto padding-box border-box',
        );
      });
    });

    it('renders indicator under dates passed to the `customize` prop', () => {
      const customize = [
        { date: '2022-08-12', indicatorAppearance: 'success' },
        { date: '2022-08-15', indicatorAppearance: 'warning' },
        { date: '2022-08-16', indicatorAppearance: 'info' },
        { date: '2022-08-17', indicatorAppearance: '#000000' },
      ];
      cy.get('mc-calendar').then(($calendar) => {
        $calendar[0].customize = customize;
        //needed for the electron tests to past
        cy.wait(1);
        cy.get('[data-date="2022-08-12"]').then(($el) => {
          const color = $el[0].style.getPropertyValue('--indicator-color').trim();
          expect(color).to.equal('var(--mds_core_calendar_indicator_appearance_success_background-color)');
        });

        cy.get('[data-date="2022-08-15"]').then(($el) => {
          const color = $el[0].style.getPropertyValue('--indicator-color').trim();
          expect(color).to.equal('var(--mds_core_calendar_indicator_appearance_warning_background-color)');
        });

        cy.get('[data-date="2022-08-16"]').then(($el) => {
          const color = $el[0].style.getPropertyValue('--indicator-color').trim();
          expect(color).to.equal('var(--mds_core_calendar_indicator_appearance_info_background-color)');
        });

        cy.get('[data-date="2022-08-17"]').then(($el) => {
          const color = $el[0].style.getPropertyValue('--indicator-color').trim();
          expect(color).to.equal('#000000');
        });
      });
    });

    it('renders `indicator` as transparent when date is selected', () => {
      const customize = [{ date: '2022-08-12', indicatorAppearance: 'success' }];
      cy.get('mc-calendar').then(($calendar) => {
        $calendar[0].customize = customize;
      });

      cy.get('[data-date="2022-08-12"]').click();
      cy.get('[data-date="2022-08-12"]').then(($el) => {
        const color = $el[0].style.getPropertyValue('--indicator-color').trim();
        expect(color).to.equal('transparent');
      });
    });

    it('sets the date correctly when using `selectDate` public function', () => {
      cy.get('mc-calendar').then(($calendar) => {
        const calendar = $calendar[0];
        calendar.selectDate('2022-08-07');
      });
      cy.get('mc-calendar').find('[data-cy="day-selected"]').should('have.attr', 'data-date', '2022-08-07');
    });

    it('shows adjacent month days when "showadjacentmonthdays" is true', () => {
      cy.get('mc-calendar').invoke('attr', 'showadjacentmonthdays', true);
      cy.get('mc-calendar').invoke('attr', 'value', '2023-08-31');
      cy.get('[data-date="2023-09-01"]').should('be.visible');
    });

    it('supports string and array in customClasses prop in customize', () => {
      const customize = [
        { date: '2022-08-12', customClasses: 'holiday friday' },
        { date: (date: Date) => date.getDay() === 0, customClasses: ['holiday', 'weekend'] },
      ];
      cy.get('mc-calendar').then(($calendar) => {
        $calendar[0].customize = customize;
      });
      cy.get('.holiday').should('have.length', 5);
      cy.get('.weekend').should('have.length', 4);
      cy.get('.friday').should('have.length', 1);
    });

    describe('month and year selection', () => {
      it('should open month and year selector on header click', () => {
        cy.get('[data-cy="month-name"]').click({ force: true, waitForAnimations: true });
        cy.get('[data-cy="month-year-picker"]').should('be.visible');
      });

      it('should change the header text when selecting month/year', () => {
        cy.get('[data-cy="month-name"]').click({ waitForAnimations: true });
        cy.get('[data-cy="month-year-picker"]').should('be.visible');
        cy.get('[value="February"]').click({ force: true });
        cy.get('[value="2024"]').click({ force: true });
        cy.get('[data-cy="month-name"]').contains('February 2024');
      });

      it('should change the calendar date and close when header is clicked on open state', () => {
        cy.get('[data-cy="month-name"]').click();
        cy.get('[data-cy="month-year-picker"]').should('be.visible');
        cy.get('[value="February"]').click({ force: true });
        cy.get('[value="2024"]').click({ force: true });
        cy.get('[data-cy="month-name"]').contains('February 2024');
        cy.get('[data-cy="month-name"]').click({ force: true });
        cy.get('[data-cy="month-name"]').contains('February 2024');
        cy.get('[data-cy="month-year-picker"]').should('not.exist');
      });
    });

    describe('week numbers', () => {
      it('should not render week numbers by default', () => {
        cy.get('[data-cy="week-number-header"]').should('not.exist');
        cy.get('[data-cy="week-number"]').should('not.exist');
      });
      it('should render week numbers when `showweeknumbers` is present', () => {
        cy.get('mc-calendar').invoke('attr', 'showweeknumbers', 'true');
        cy.get('[data-cy="week-number-header"]').should('exist');
        cy.get('[data-cy="week-number"]').then(($weekNumbers) => {
          expect($weekNumbers.length).to.equal(5);
          const text = $weekNumbers.text();
          expect(text).to.equal('3132333435');
        });
      });
    });

    describe('keyboard navigation', () => {
      describe('keyboard navigation - all enabled', () => {
        it('focuses `month-name` button on initial focus', () => {
          cy.realPress('Tab');
          cy.get('@month-name-button').should('have.focus');
        });

        it('focuses the `next` button when Tab is pressed and the focus is on the previous button', () => {
          focusButton('@previous-button');
          cy.realPress('Tab');
          cy.get('@next-button').should('have.focus');
        });

        it('focuses latest focused day index when Tab is pressed and the `next` button is focused', () => {
          focusButton('@next-button');
          cy.realPress('Tab');
          cy.get('[data-cy="day-selected"]').should('have.focus');
        });

        it('focuses `previous` button when the Tab is pressed and a day is focused', () => {
          focusButton('[data-cy="day-selected"]');
          cy.realPress('Tab');
          cy.get('@month-name-button').should('have.focus');
        });

        it('focuses previous day when arrow left is clicked and currently focused day is not 1st day of month', () => {
          focusButton('[data-cy="day-selected"]');
          cy.realPress('ArrowLeft');
          cy.get('[data-date="2022-08-13"]').should('be.focused');
        });

        it('focuses next day when arrow right is clicked and currently focused day is not last day of month', () => {
          focusButton('[data-cy="day-selected"]');
          cy.realPress('ArrowRight');
          cy.get('[data-date="2022-08-15"]').should('be.focused');
        });

        it('focuses a day above currently focused when arrow up is clicked and currently focused day is not in the top row', () => {
          focusButton('[data-cy="day-selected"]');
          cy.realPress('ArrowUp');
          cy.get('[data-date="2022-08-07"]').should('be.focused');
        });

        it('focuses a day below currently focused when arrow down is clicked and currently focused day is not in the last row', () => {
          focusButton('[data-cy="day-selected"]');
          cy.realPress('ArrowDown');
          cy.get('[data-date="2022-08-21"]').should('be.focused');
        });

        it('navigates to previous month when arrow left is clicked and currently focused day is 1st day of month', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-01');
          focusButton('[data-date="2022-08-01"]');
          cy.get('[data-date="2022-08-01"]').realPress('ArrowLeft', { force: true });
          cy.get('[data-cy="month-name"]').contains('July 2022');
          cy.get('[data-date="2022-07-31"]').should('be.focused');
        });

        it('navigates to previous month when arrow up is clicked and currently focused day is in the top row', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-03');
          focusButton('[data-date="2022-08-03"]');
          cy.get('[data-date="2022-08-03"]').realPress('ArrowUp');
          cy.get('[data-cy="month-name"]').contains('July 2022');
          cy.get('[data-date="2022-07-31"]').should('be.focused');
        });

        it('navigates to next month when arrow right is clicked and currently focused day is last day of month', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-31');
          cy.get('[data-date="2022-08-31"]').click();
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.get('[data-cy="month-name"]').contains('September 2022');
          cy.get('[data-date="2022-09-05"]').should('be.focused');
        });

        it('navigates to next adjacent month day when "showadjacentmonthdays=true" & arrow right is clicked and currently focused day is last day of month', () => {
          cy.get('mc-calendar').invoke('attr', 'showadjacentmonthdays', true);
          cy.get('mc-calendar').invoke('attr', 'value', '2023-08-31');
          cy.get('[data-date="2023-08-31"]').click();
          cy.realPress('ArrowRight');
          cy.get('[data-cy="month-name"]').contains('September 2023');
          cy.get('[data-date="2023-09-01"]').should('be.focused');
        });

        it('navigates to previous adjacent month day when "showadjacentmonthdays=true" & arrow left is clicked and currently focused day is first day of month', () => {
          cy.get('mc-calendar').invoke('attr', 'showadjacentmonthdays', true);
          cy.get('mc-calendar').invoke('attr', 'value', '2023-08-01');
          cy.get('[data-date="2023-08-01"]').click();
          cy.realPress('ArrowLeft');
          cy.get('[data-cy="month-name"]').contains('July 2023');
          cy.get('[data-date="2023-07-31"]').should('be.focused');
        });

        it('navigates to next month when arrow down is clicked and currently focused day is in the last row', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-31');
          cy.get('[data-date="2022-08-31"]').click();
          cy.realPress('ArrowDown');
          cy.get('[data-cy="month-name"]').contains('September 2022');
          cy.get('[data-date="2022-09-01"]').should('be.focused');
        });

        it('navigates to previous month when `pageup` is clicked', () => {
          focusButton('[data-date="2022-08-01"]');
          cy.realPress('PageUp');
          cy.get('[data-cy="month-name"]').contains('September 2022');
        });

        it('navigates to next month when `pagedown` is clicked', () => {
          focusButton('[data-date="2022-08-01"]');
          cy.realPress('PageDown');
          cy.get('[data-cy="month-name"]').contains('July 2022');
        });

        it('focuses 1st day when `home` is clicked', () => {
          focusButton('[data-date="2022-08-02"]');
          cy.realPress('Home');
          cy.get('[data-date="2022-08-01"]').should('be.focused');
        });

        it('focuses last day when `end` is clicked', () => {
          focusButton('[data-date="2022-08-02"]');
          cy.realPress('End');
          cy.get('[data-date="2022-08-31"]').should('be.focused');
        });

        it('sets the tabindex of the selected day to 1', () => {
          cy.get('mc-calendar').find('[data-date="2022-08-02"]').as('day-to-select');
          cy.get('@day-to-select').click();
          cy.get('@day-to-select').should('have.attr', 'tabIndex', '0');
        });

        it('opens the month-year picker when Enter is presed and month-name is focused', () => {
          focusButton('[data-cy="month-name"]').realPress('Enter');
          cy.get('[data-cy="month-year-picker"]').should('be.visible');
        });

        it('should focus the month-name-button when the Tab is pressed and the picker is open', () => {
          focusButton('[data-cy="month-name"]').realPress('Enter');
          cy.get('[data-cy="month-year-picker"]').should('be.visible');
          cy.realPress('Tab');
          cy.get('[data-cy="month-name"]').should('have.focus');
        });
      });

      describe('keyboard navigation - previous disabled', () => {
        beforeEach(() => {
          cy.get('mc-calendar').invoke('attr', 'min', '2022-08-01');
        });

        it('focuses `month-name` button on initial focus', () => {
          cy.realPress('Tab');
          cy.get('@month-name-button').should('be.focused');
        });

        it('focuses latest focused day index when Tab is pressed and the `next` button is focused', () => {
          focusButton('[data-cy="nextButton"]');
          cy.realPress('Tab');
          cy.get('[data-cy="day-selected"]').should('have.focus');
        });

        it('focuses `month-name` button when the Tab is pressed and a day is focused', () => {
          focusButton('[data-date="2022-08-02"]');
          cy.realPress('Tab');
          cy.get('@month-name-button').should('be.focused');
        });

        it('does not navigate to the previous month when arrow left is clicked and currently focused day is 1st day of the month', () => {
          focusButton('[data-date="2022-08-01"]');
          cy.realPress('ArrowLeft');
          cy.get('[data-cy="month-name"]').contains('August 2022');
        });

        it('does not navigate to the previous month when arrow up is clicked and currently focused day is in the 1st row', () => {
          focusButton('[data-date="2022-08-01"]');
          cy.realPress('ArrowUp');
          cy.get('[data-cy="month-name"]').contains('August 2022');
        });

        it('navigates to the next month when `pageup` is clicked', () => {
          focusButton('[data-date="2022-08-01"]');
          cy.realPress('PageUp');
          cy.get('[data-cy="month-name"]').contains('September 2022');
        });
      });

      describe('keyboard navigation - next disabled', () => {
        beforeEach(() => {
          cy.get('mc-calendar').invoke('attr', 'max', '2022-08-31');
        });

        it('focuses `month-name` button on initial focus', () => {
          cy.realPress('Tab');
          cy.get('@month-name-button').should('be.focused');
        });

        it('focuses latest focused day index when Tab is pressed and the `previous` button focused', () => {
          focusButton('@previous-button');
          cy.realPress('Tab');
          cy.get(':focused').first().should('have.attr', 'data-cy', 'nextButton');
        });

        it('focuses `month-name` button when the Tab is pressed and a day is focused', () => {
          focusButton('[data-cy="day-selected"]');
          cy.realPress('Tab');
          cy.get('@month-name-button').should('be.focused');
        });

        it('does not navigate to the next month when arrow right is clicked and currently focused day is last day of the month', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-31');
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.realPress('ArrowRight');
          cy.get('[data-cy="month-name"]').contains('August 2022');
        });

        it('does not navigate to the next month when arrow down is clicked and currently focused day is in the last row', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-31');
          cy.realPress('ArrowDown');
          cy.get('[data-cy="month-name"]').contains('August 2022');
        });

        it('does not navigate to next next when `pagedown` is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-31');
          cy.realPress('PageDown');
          cy.get('[data-cy="month-name"]').contains('August 2022');
        });
      });

      describe('keyboard navigation - next and previous disabled', () => {
        beforeEach(() => {
          cy.get('mc-calendar').invoke('attr', 'min', '2022-08-01');
          cy.get('mc-calendar').invoke('attr', 'max', '2022-08-31');
        });

        it('focuses `month-name` button on initial focus', () => {
          cy.realPress('Tab');
          cy.get('@month-name-button').should('be.focused');
        });

        it('focuses the current date when tab pressed 4 times', () => {
          cy.get('body').realClick();
          cy.realPress('Tab');
          cy.realPress('Tab');
          cy.realPress('Tab');
          cy.realPress('Tab');
          cy.get('[data-cy=day-selected]').should('be.focused');
        });

        it('focuses `month-name` button when Tab is pressed and a day is selected', () => {
          focusButton('[data-date="2022-08-06"]');
          cy.get('[data-date="2022-08-06"]');
          cy.realPress('Tab');
          cy.get('@month-name-button').should('be.focused');
        });
      });

      describe('keyboard navigation - days in the month disabled', () => {
        beforeEach(() => {
          cy.get('mc-calendar').invoke('attr', 'min', '2022-08-06');
          cy.get('mc-calendar').invoke('attr', 'max', '2022-08-31');
          const customize = [
            { date: '2022-08-10', disabled: true },
            { date: '2022-08-22', disabled: true },
            { date: '2022-08-23', disabled: true },
          ];
          cy.get('mc-calendar').then(($calendar) => {
            $calendar[0].customize = customize;
          });
        });

        it('moves to previous month if the left arrow is pressed and no enabled dates are available', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-06');
          focusButton('[data-date="2022-08-06"]');
          cy.get('[data-date="2022-08-06"]').realPress('ArrowLeft').realPress('Enter');
          cy.get('[data-cy="month-name"]').contains('July 2022');
        });

        it('moves to next month if the right arrow is pressed and no enabled dates are available', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-31');
          focusButton('[data-date="2022-08-31"]');
          cy.get('[data-date="2022-08-31"]').realPress('ArrowRight').realPress('Enter');
          cy.get('[data-cy="month-name"]').contains('September 2022');
        });

        it('moves to previous month if the up arrow is pressed and no enabled dates are available', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-09');
          focusButton('[data-date="2022-08-09"]');
          cy.get('[data-date="2022-08-09"]').realPress('ArrowUp').realPress('Enter');
          cy.get('[data-cy="month-name"]').contains('July 2022');
        });

        it('moves to next month if the down arrow is pressed and no enabled dates are available', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-25');
          focusButton('[data-date="2022-08-25"]');
          cy.get('[data-date="2022-08-25"]').realPress('ArrowDown').realPress('Enter');
          cy.get('[data-cy="month-name"]').contains('September 2022');
        });

        it('selects the first enabled day index when `Home` is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-18');
          focusButton('[data-date="2022-08-18"]');
          cy.get('[data-date="2022-08-18"]').realPress('Home').realPress('Enter');
          cy.get('[data-date="2022-08-06"]').should('have.attr', 'data-cy', 'day-selected');
        });

        it('selects the last enabled day index when `End` is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-18');
          focusButton('[data-date="2022-08-18"]');
          cy.get('[data-date="2022-08-18"]').realPress('End').realPress('Enter');
          cy.get('[data-date="2022-08-31"]').should('have.attr', 'data-cy', 'day-selected');
        });

        it('selects the next available day if the desired is disabled and ArrowRight is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-09');
          focusButton('[data-date="2022-08-09"]');
          cy.get('[data-date="2022-08-09"]').realPress('ArrowRight').realPress('Enter');
          cy.get('[data-date="2022-08-11"]').should('have.attr', 'data-cy', 'day-selected');
        });

        it('selects the next available day if the desired is disabled and ArrowRight is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-09');
          focusButton('[data-date="2022-08-09"]');
          cy.get('[data-date="2022-08-09"]').realPress('ArrowRight').realPress('Enter');
          cy.get('[data-date="2022-08-11"]').should('have.attr', 'data-cy', 'day-selected');
        });

        it('selects the next available day if the desired is disabled and ArrowDown is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-16');
          focusButton('[data-date="2022-08-16"]');
          cy.get('[data-date="2022-08-16"]').realPress('ArrowDown').realPress('Enter');
          cy.get('[data-date="2022-08-24"]').should('have.attr', 'data-cy', 'day-selected');
        });

        it('selects the previous available day if the desired is disabled and ArrowLeft is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-11');
          focusButton('[data-date="2022-08-11"]');
          cy.get('[data-date="2022-08-11"]').realPress('ArrowLeft').realPress('Enter');
          cy.get('[data-date="2022-08-09"]').should('have.attr', 'data-cy', 'day-selected');
        });

        it('selects the previous available day if the desired is disabled and ArrowUp is clicked', () => {
          cy.get('mc-calendar').invoke('attr', 'value', '2022-08-30');
          focusButton('[data-date="2022-08-30"]');
          cy.get('[data-date="2022-08-30"]').realPress('ArrowUp').realPress('Enter');
          cy.get('[data-date="2022-08-21"]').should('have.attr', 'data-cy', 'day-selected');
        });
      });
    });
  });
});
