import { McInputDate } from '../src';
import '../src';

const label = 'Input Date';
const testDate = '2022-08-14';
const inputName = 'test';
const minDate = '2022-08-05';
const maxDate = '2022-09-15';

context('mc-input-date', () => {
  describe('mounting and getting value', () => {
    beforeEach(() => {
      cy.viewport(1000, 1000);
      cy.mount<McInputDate>(`<mc-input-date clearbutton keepclearbuttonvisible label="${label}"></mc-input-date>`).as(
        'mc-input-date',
      );
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
    });
    it('mounts', () => {
      cy.get('@mc-input-date').contains(label);
    });
    it('calendar is closed by default', () => {
      cy.get('mc-calendar').should('not.exist');
    });

    it('the calendar remains closed on focus', () => {
      cy.get('@mc-input-date-input').focus();
      cy.get('mc-calendar').should('not.exist');
    });

    it('closes the calendar when clicked outside', () => {
      cy.get('@mc-input-date-input').realClick();
      cy.get('body').realClick();
      cy.get('mc-calendar').should('not.be.visible');
    });

    it('opens the calendar when `Space` key is pressed and focuses on month/year selector', () => {
      cy.get('@mc-input-date-input').focus();
      cy.get('mc-calendar').should('not.exist');
      cy.get('@mc-input-date-input').type(' ');
      cy.get('mc-calendar').should('be.visible');
      cy.get('mc-calendar').find('[data-cy="month-name"]').find('button').should('have.focus');
    });

    it('click should toggle the calendar, but keeps the focus on the input', () => {
      cy.get('@mc-input-date-input').realClick();
      cy.get('mc-calendar').should('be.visible');
      cy.get('@mc-input-date-input').should('have.focus');
    });

    it('closes the calendar when `Escape` key is pressed and focuses back on the input', () => {
      cy.get('@mc-input-date-input').focus();
      cy.get('mc-calendar').should('not.exist');
      cy.realPress('Space');
      cy.get('mc-calendar').should('be.visible');
      cy.realPress('Escape');
      cy.get('mc-calendar').should('not.exist');
      cy.get('@mc-input-date-input').should('have.focus');
    });

    it('keeps the calendar open when the min date is set and the arrow button is used to navigate to that month', () => {
      cy.get('@mc-input-date-input').as('inner-input');
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realType(maxDate);
      cy.get('@mc-input-date-input').realClick();
      cy.get('mc-calendar').invoke('attr', 'min', minDate);
      cy.get('[data-cy="previousButton"]').realClick();
      cy.get('mc-calendar').should('be.visible');
    });

    it('keeps the calendar open when the max date is set and the arrow button is used to navigate to that month', () => {
      cy.get('@mc-input-date-input').as('inner-input');
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realType(minDate);
      cy.get('@mc-input-date-input').realClick();
      cy.get('mc-calendar').invoke('attr', 'min', maxDate);
      cy.get('[data-cy="nextButton"]').realClick();
      cy.get('mc-calendar').should('be.visible');
    });

    it('click clearbutton should deselect currently selected date in calendar', () => {
      cy.get('@mc-input-date-input').as('inner-input').realClick();
      cy.get('@inner-input').realType(testDate);
      cy.get('mc-calendar').find('[data-cy="day-selected"]').should('exist');
      cy.get('[data-cy="clearButton"]').find('button').click({ force: true });
      cy.get('@mc-input-date-input').as('inner-input').realClick();
      cy.get('mc-calendar').find('[data-cy="day-selected"]').should('not.exist');
    });

    it('fires keydown event with correct event key', () => {
      cy.get('@mc-input-date').then(($input) => {
        const input = $input[0];
        const keydownStub = cy.stub();
        input.addEventListener('keydown', keydownStub);

        cy.get('@mc-input-date-input').type('2');
        cy.get('@mc-input-date-input').then(() => {
          expect(keydownStub).to.be.calledOnce;
          expect(keydownStub.firstCall.args[0].key).to.equal('2');
        });
      });
    });

    describe('in small screen', () => {
      beforeEach(() => {
        cy.viewport(400, 400);
      });

      it('drawer should be displayed instead of popover', () => {
        cy.get('@mc-input-date-input').realClick();
        cy.get('mc-calendar').should('be.visible');
        cy.get('mc-popover').should('not.exist');
        cy.get('mc-drawer').should('be.visible');
      });

      it('same label as the input should be displayed on drawer heading', () => {
        cy.get('@mc-input-date-input').realClick();
        cy.get('mc-calendar').should('be.visible');
        cy.get('mc-drawer').should('contain', label);
      });

      it('click should toggle the calendar and move the focus to the calendar', () => {
        cy.get('@mc-input-date-input').realClick();
        cy.get('mc-calendar').should('be.visible');
        cy.get('[data-cy="month-name"]').find('button').should('have.focus');
      });
    });

    it('has the correct value format in the input when the date is selected and custom format is provided', () => {
      const oldInputDate = document.querySelector('mc-input-date');
      oldInputDate?.remove();
      cy.mount<McInputDate>(
        `<mc-input-date label="${label}" activedate="2022-08-14" format="DD/MM/YYYY"></mc-input-date>`,
      ).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      const formatTestDate = '14/08/2022';
      const formatTestDateDayAfter = '15/08/2022';

      cy.get('@mc-input-date-input').click();
      cy.get('[data-cy="month-name"]').find('button').should('contain.text', 'August 2022');
      cy.get('body').click();

      cy.get('@mc-input-date-input').click();
      cy.get('[data-cy="month-name"]').find('button').should('contain.text', 'August 2022');
      cy.get('mc-calendar').find(`[data-date="2022-08-14"]`).click();
      cy.get('@mc-input-date-input').should('have.value', formatTestDate);

      cy.get('@mc-input-date-input').click();
      cy.get('mc-calendar').find(`[data-date="2022-08-15"]`).click();
      cy.get('@mc-input-date-input').should('have.value', formatTestDateDayAfter);
    });
    it('has the correct activedate set in the calendar when custom format is provided', () => {
      const oldInputDate = document.querySelector('mc-input-date');
      oldInputDate?.remove();
      cy.mount<McInputDate>(
        `<mc-input-date label="${label}" activedate="2022-08-14" format="DD/MM/YYYY"></mc-input-date>`,
      ).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').click();
      cy.get('[data-cy="month-name"]').find('button').should('contain.text', 'August 2022');
    });
  });
  describe('with a mask', () => {
    it('should not have a mask by default', () => {
      cy.mount<McInputDate>(`<mc-input-date label="${label}"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').focus();
      cy.get('@mc-input-date-input').type('20220814');
      cy.get('@mc-input-date-input').should('have.value', '20220814');
    });

    it('should apply YYYY-MM-DD mask by default if custom format is not specified', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').focus();
      cy.get('@mc-input-date-input').type('20220814');
      cy.get('@mc-input-date-input').should('have.value', '2022-08-14');
    });

    it('should have a mask that is correctly transformaed based on the format prop using only numbers', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask format="YYYY-MM-DD"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').focus();
      cy.get('@mc-input-date-input').type('20220814');
      cy.get('@mc-input-date-input').should('have.value', '2022-08-14');
    });

    it('should have a mask that is correctly transformaed based on the format prop using letters and numbers', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask format="MMM-DD-YYYY"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').focus();
      cy.get('@mc-input-date-input').type('Aug142022');
      cy.get('@mc-input-date-input').should('have.value', 'Aug-14-2022');
    });

    it('applies the mask with different spearators', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask format="DD/MM/YYYY"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').focus();
      cy.get('@mc-input-date-input').type('14082022');
      cy.get('@mc-input-date-input').should('have.value', '14/08/2022');
    });

    it('sets the correct date in the calendar when the date is typed in the input', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask format="DD/MM/YYYY"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').focus();
      cy.get('@mc-input-date-input').type('14082022');
      cy.get('@mc-input-date-input').should('have.value', '14/08/2022');
      cy.get('@mc-input-date-input').click();
      cy.get('mc-calendar').find(`[data-cy="day-selected"]`).find('button').should('contain.text', '14');
    });

    it('has the correct date in the input when the date is selected in the calendar', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask activedate="2022-08-14"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').click();
      cy.get('[data-cy="month-name"]').find('button').should('contain.text', 'August 2022');
      cy.get('mc-calendar').find(`[data-date="${testDate}"]`).click();
      cy.get('@mc-input-date-input').should('have.value', '2022-08-14');
    });

    it('renders a placeholder text that is same as format by default', () => {
      cy.mount<McInputDate>(`<mc-input-date usemask format="DD/MM/YYYY"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').should('have.attr', 'placeholder', 'DD/MM/YYYY');
    });

    it('renders user provided placeholder', () => {
      cy.mount<McInputDate>(
        `<mc-input-date usemask format="DD/MM/YYYY" placeholder="Enter your birthday"></mc-input-date>`,
      ).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      cy.get('@mc-input-date-input').should('have.attr', 'placeholder', 'Enter your birthday');
    });
  });
  describe('within the form', () => {
    beforeEach(() => {
      cy.mount<McInputDate>(`<form><mc-input-date name="${inputName}" label="${label}"></mc-input-date></form>`).as(
        'mc-input-date',
      );
      cy.get('@mc-input-date').find('input[aria-hidden="true"]').as('mc-input-date-hidden');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
    });

    it('parent form gets updated when typing date into the input', () => {
      cy.get('@mc-input-date-input').as('inner-input');
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realType(testDate);
      cy.get('@mc-input-date-hidden').should('have.value', testDate);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(testDate);
      });
    });

    it('parent form gets the selected date value', () => {
      cy.get('@mc-input-date-input').click({ force: true, waitForAnimations: true });
      cy.get('mc-calendar').invoke('attr', 'value', testDate);
      cy.get('mc-calendar').find(`[data-date="${testDate}"]`).click({ force: true, waitForAnimations: true });
      cy.get('@mc-input-date-hidden').should('have.value', testDate);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(testDate);
      });
    });
  });
  describe('validation', () => {
    beforeEach(() => {
      cy.viewport(1000, 1000);
      cy.mount<McInputDate>(
        `<form><mc-input-date min=${minDate} max=${maxDate} label="${label}"></mc-input-date></form>`,
      );
      cy.get('mc-input-date').as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
    });

    describe('with min and max date', () => {
      it('should validate correctly when date is within the valid range', () => {
        cy.get('@mc-input-date-input').type('2022-08-10');
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', false);
      });

      it('should invalidate when date is below the minimum date', () => {
        cy.get('@mc-input-date-input').type('2022-08-01');
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);
        cy.get('@mc-input-date').its('0.internals.validity.rangeUnderflow').should('be.true');
      });

      it('should invalidate when date is above the maximum date', () => {
        cy.get('@mc-input-date-input').type('2022-09-20');
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);
        cy.get('@mc-input-date').its('0.internals.validity.rangeOverflow').should('be.true');
      });

      it('should dispatch invalid event when the validity state is invalid', () => {
        const invalidHandler = cy.stub().as('invalidHandler');
        cy.get('@mc-input-date').then(($el) => $el.get(0).addEventListener('invalid', invalidHandler));
        cy.get('@mc-input-date-input').type('2022-09-20');

        cy.get('@invalidHandler').should('have.been.calledOnce');
        cy.get('@invalidHandler').its('firstCall.args[0].target.internals.validity.rangeOverflow').should('be.true');
      });

      it('should set parent form to invalid state when date is invalid', () => {
        cy.get('@mc-input-date-input').type('2022-09-20');
        cy.get('form').then((form) => expect(form[0].checkValidity()).to.be.false);
      });

      it('should validate correctly when date is changed from invalid to valid', () => {
        cy.get('@mc-input-date-input').type('2022-09-20');
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);
        cy.get('@mc-input-date-input').clear();
        cy.get('@mc-input-date-input').type('2022-08-10');
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', false);
        cy.get('form').then((form) => expect(form[0].checkValidity()).to.be.true);
      });

      it('selecting a valid date from the calendar should reset the validation', () => {
        // settin an invalid date
        cy.get('@mc-input-date-input').type('2022-09-20');
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);
        cy.get('@mc-input-date').its('0.internals.validity.rangeOverflow').should('be.true');

        // choosing a valid date from the calendar
        cy.get('mc-calendar').invoke('prop', 'activedate', '2022-08-01');
        cy.get('mc-calendar').find(`[data-date="2022-08-14"]`).click();

        cy.get('@mc-input-date').its('0.internals.validity.rangeOverflow').should('be.false');
      });
    });

    describe('with invalid=true', () => {
      beforeEach(() => {
        //remove old input date
        const oldInputDate = document.querySelector('mc-input-date');
        oldInputDate?.remove();

        cy.mount<McInputDate>(`<mc-input-date label="${label}" clearbutton></mc-input-date>`);
        cy.get('mc-input-date').as('mc-input-date');
        cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');
      });

      it('should maintain the invalid state and red border through all user interactions', () => {
        cy.get('@mc-input-date').then(($el) => {
          const inputDate = $el.get(0) as McInputDate;
          inputDate.invalid = true;
        });

        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);

        //Select a date from calendar and verify invalid state persists
        cy.get('@mc-input-date-input').click();
        cy.get('mc-calendar').invoke('prop', 'activedate', '2022-08-14');
        cy.get('mc-calendar').find(`[data-date="2022-08-14"]`).click();
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);
        cy.get('body').click();

        //Type a valid date and verify invalid state persists
        cy.get('@mc-input-date-input').type('2022-08-10');
        cy.get('body').click();
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);

        //Clear input and verify invalid state persists
        cy.get('@mc-input-date-input').clear();
        cy.get('body').click();
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);

        //Click clear button and verify invalid state persists
        cy.get('@mc-input-date-input').type('2022-08-10');
        cy.get('[data-cy="clearButton"]').click();
        cy.get('body').click();
        cy.get('@mc-input-date').its('0').should('have.property', 'invalid', true);
      });
    });
  });

  describe('dayperiod property', () => {
    it('forwards dayperiod property to calendar', () => {
      cy.mount<McInputDate>(`<mc-input-date label="${label}" dayperiod="narrow"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');

      // Open the calendar
      cy.get('@mc-input-date-input').click();

      // Check that weekdays are displayed in narrow format
      cy.get('mc-calendar').should('be.visible');
      cy.get('[data-cy="weekday"]').should(($weekdays) => {
        const joinedString = $weekdays.text();
        expect(joinedString).to.match(/MTWTFSS/);
      });
    });

    it('updates calendar weekday format when dayperiod changes', () => {
      cy.mount<McInputDate>(`<mc-input-date label="${label}" dayperiod="short"></mc-input-date>`).as('mc-input-date');
      cy.get('@mc-input-date').find('input[data-cy="input"]').as('mc-input-date-input');

      // Open the calendar and verify short format
      cy.get('@mc-input-date-input').click();
      cy.get('[data-cy="weekday"]').should(($weekdays) => {
        const joinedString = $weekdays.text();
        expect(joinedString).to.match(/MonTueWedThuFriSatSun/);
      });

      // Close calendar
      cy.get('body').click();

      // Change dayperiod to long
      cy.get('@mc-input-date').invoke('attr', 'dayperiod', 'long');

      // Open calendar again and verify long format
      cy.get('@mc-input-date-input').click();
      cy.get('[data-cy="weekday"]').should(($weekdays) => {
        const joinedString = $weekdays.text();
        expect(joinedString).to.match(/MondayTuesdayWednesdayThursdayFridaySaturdaySunday/);
      });
    });
  });
});
