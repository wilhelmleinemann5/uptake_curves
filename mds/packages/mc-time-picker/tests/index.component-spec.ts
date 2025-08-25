import { html } from 'lit';
import { McTimePicker } from '../src';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';
import '../src';
import { McPicker } from '@maersk-global/mds-components-core-picker';

const setupUTCClock = (hour: number, minute: number, second = 0): void => {
  // Create date in UTC
  const mockDate = new Date(Date.UTC(2024, 0, 1, hour, minute, second));

  // Mock all timezone-related methods to ensure UTC behavior
  cy.stub(Date.prototype, 'getTimezoneOffset').returns(0);
  cy.stub(Date.prototype, 'toString').returns(
    `Mon Jan 01 2024 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} GMT+0000 (UTC)`,
  );
  cy.stub(Date.prototype, 'getHours').returns(hour);
  cy.stub(Date.prototype, 'getMinutes').returns(minute);
  cy.stub(Date.prototype, 'getSeconds').returns(second);

  // Set the clock with the UTC time
  cy.clock(mockDate.valueOf(), ['Date']);
};

context('mc-time-picker', () => {
  describe('key navigation', () => {
    describe('when hour initially focused', () => {
      beforeEach(() => {
        cy.mount<McTimePicker>(html`<mc-time-picker></mc-time-picker>`);
        cy.get('[data-cy=hour]').then(($el) => ($el.get(0) as McPicker).focusWith());
      });

      it('Right arrow should bring the focus to the minute', () => {
        cy.realPress('ArrowRight');

        cy.get('[data-cy=hour]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(false);
        });
        cy.get('[data-cy=minute]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(true);
        });
      });

      it('Tab should bring the focus to the minute', () => {
        cy.realPress('Tab');

        cy.get('[data-cy=hour]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(false);
        });
        cy.get('[data-cy=minute]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(true);
        });
      });
    });

    describe('when minute initially focused', () => {
      beforeEach(() => {
        cy.mount<McTimePicker>(html`<button id="focus">Focus</button><mc-time-picker></mc-time-picker>`);
        cy.get('[data-cy=minute]').then(($el) => ($el.get(0) as McPicker).focusWith());
        cy.get('#focus').as('focus');
      });

      it('Left arrow should bring the focus to the hour', () => {
        cy.realPress('ArrowLeft');

        cy.get('[data-cy=hour]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(true);
        });
        cy.get('[data-cy=minute]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(false);
        });
      });

      it('Tab should not trap focus', () => {
        cy.get('@focus').focus();
        cy.focused().realPress('Tab');
        cy.get('[data-cy=hour]').find('mc-picker-item').eq(0).should('have.focused');
        cy.focused().realPress('Tab');
        cy.get('[data-cy=minute]').find('mc-picker-item').eq(0).should('have.focused');
        cy.focused().realPress('Tab');
        cy.get('[data-cy=hour]').find('mc-picker-item').eq(0).should('not.have.focused');
        cy.get('[data-cy=minute]').find('mc-picker-item').eq(0).should('not.have.focused');
      });
    });
  });

  describe('mc-time-picker', () => {
    describe('time selection', () => {
      describe('with minutestep === 1', () => {
        it('should use exact current time without rounding', () => {
          setupUTCClock(9, 41);

          cy.mount<McTimePicker>(html`<mc-time-picker preselectcurrenttime></mc-time-picker>`);

          cy.wait(100);

          cy.get('[data-cy=hour]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('09');
          });
          cy.get('[data-cy=minute]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('41');
          });
        });

        it('should keep exact minutes when selecting next hour', () => {
          setupUTCClock(9, 41);

          cy.mount<McTimePicker>(html`<mc-time-picker preselectcurrenttime></mc-time-picker>`);

          cy.wait(100);

          cy.get('[data-cy=hour]').find('mc-picker-item').contains('10').click();

          cy.get('[data-cy=hour]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('10');
          });
          cy.get('[data-cy=minute]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('41');
          });
        });
      });

      describe('with minutestep > 1', () => {
        it('should round up to nearest 15 minutes (09:41 → 09:45)', () => {
          setupUTCClock(9, 41);

          cy.mount<McTimePicker>(html`<mc-time-picker preselectcurrenttime minutestep="15"></mc-time-picker>`);

          cy.wait(100);

          cy.get('[data-cy=hour]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('09');
          });
          cy.get('[data-cy=minute]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('45');
          });
        });

        it('should round down to nearest 15 minutes (09:32 → 09:30)', () => {
          setupUTCClock(9, 32);

          cy.mount<McTimePicker>(html`<mc-time-picker preselectcurrenttime minutestep="15"></mc-time-picker>`);

          cy.wait(100);

          cy.get('[data-cy=hour]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('09');
          });
          cy.get('[data-cy=minute]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('30');
          });
        });

        it('should round up to next hour when close to hour (09:58 → 10:00)', () => {
          setupUTCClock(9, 58);

          cy.mount<McTimePicker>(html`<mc-time-picker preselectcurrenttime minutestep="15"></mc-time-picker>`);

          cy.wait(100);

          cy.get('[data-cy=hour]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('10');
          });
          cy.get('[data-cy=minute]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('00');
          });
        });

        it('should keep exact minutes when selecting next hour', () => {
          setupUTCClock(9, 32);

          cy.mount<McTimePicker>(html`<mc-time-picker preselectcurrenttime minutestep="15"></mc-time-picker>`);

          cy.wait(100);

          cy.get('[data-cy=hour]').find('mc-picker-item').contains('10').click();

          cy.get('[data-cy=hour]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('10');
          });
          cy.get('[data-cy=minute]').then(($el) => {
            const el: McPicker = $el.get(0) as McPicker;
            expect(el.value).to.equal('30');
          });
        });
      });
    });
  });
});
