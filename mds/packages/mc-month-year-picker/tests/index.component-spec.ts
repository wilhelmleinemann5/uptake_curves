import { html } from 'lit';
import { McMonthYearPicker } from '../src';
import '../src';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';
import { McPicker } from '@maersk-global/mds-components-core-picker';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getYears = (cap: number): number[] => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - cap;
  const endYear = currentYear + cap;
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
};

context('mc-month-year-picker', () => {
  describe('setting value', () => {
    beforeEach(() => {
      cy.mount<McMonthYearPicker>(html`<mc-month-year-picker locale="en-GB"></mc-month-year-picker>`);
    });
    it('should set correct value with a month as a number', () => {
      cy.get('mc-month-year-picker')
        .then(($el) => {
          ($el[0] as McMonthYearPicker).value = { month: 0, year: 2023 };
        })
        .then(() => {
          cy.get('[data-cy=selection-window]').should('have.text', `${months[0]}2023`);
        });
    });

    it('should set correct value with a month as a string', () => {
      cy.get('mc-month-year-picker').then(($el) => {
        ($el[0] as McMonthYearPicker).value = { month: months[0], year: 2023 };
        cy.get('[data-cy=selection-window]').should('have.text', `${months[0]}2023`);
      });
    });

    it('should set value as a current month when the provided number value is out of range', () => {
      cy.get('mc-month-year-picker').then(($el) => {
        ($el[0] as McMonthYearPicker).value = { month: 15, year: 2023 };
        cy.get('[data-cy=month]').then(($el) =>
          expect(($el.get(0) as McPicker).value).to.equal(months[new Date().getMonth()]),
        );
      });
    });
  });

  describe('month/year cap', () => {
    beforeEach(() => {
      cy.mount<McMonthYearPicker>(html`<mc-month-year-picker locale="en-GB" yearcap="5"></mc-month-year-picker>`);
    });
    it('should render only 12 months', () => {
      cy.get('mc-month-year-picker').within(() => {
        cy.get('[data-cy=month]').within(() => {
          cy.get('mc-picker-item').then(($els) => {
            expect($els.length).to.equal(12);
            for (const el of $els) {
              expect(months.includes(el.value)).to.be.true;
            }
          });
        });
      });
    });

    it('should render years within the range', () => {
      const expectedYears = getYears(5);
      cy.get('mc-month-year-picker').within(() => {
        cy.get('[data-cy=year]').within(() => {
          cy.get('mc-picker-item').then(($els) => {
            expect($els.length).to.equal(11);
            for (const el of $els) {
              expect(expectedYears.includes(el.value)).to.be.true;
            }
          });
        });
      });
    });
  });

  describe('min max', () => {
    beforeEach(() => {
      cy.mount<McMonthYearPicker>(html`<mc-month-year-picker locale="en-GB" yearcap="5"></mc-month-year-picker>`);
      cy.get('mc-month-year-picker').then(($el) => ($el[0].value = { month: 'June', year: 2023 }));
    });

    it('should disable years before the min year value', () => {
      cy.get('mc-month-year-picker').then(($el) => {
        $el[0].min = { month: 'March', year: 2021 };
      });
      cy.get('[data-cy="month"]').within(() => {
        // months should not be disabled in the current year 2023
        cy.get('mc-picker-item[disabled]').should('have.length', 0);
      });
      cy.get('[data-cy="year"]').within(() => {
        cy.get('mc-picker-item[disabled]').should('have.length', 1);
        cy.get('mc-picker-item[disabled]').then(($els) => {
          let text = '';
          for (const element of $els) {
            text += element.shadowRoot.querySelector('mc-button').label;
          }
          expect(text).to.equal('2020');
        });
      });

      // January and February should be disabled in the 2020
      cy.get('[data-cy="year"]').find(`mc-picker-item[value="2021"]`).click();
      cy.get('[data-cy="month"]').within(() => {
        cy.get('mc-picker-item[disabled]').should('have.length', 2);
        cy.get('mc-picker-item[disabled]').then(($els) => {
          let text = '';
          for (const element of $els) {
            text += element.shadowRoot.querySelector('mc-button').label;
          }
          expect(text).to.equal('JanuaryFebruary');
        });
      });
    });

    it('should disable years after the max year value', () => {
      cy.get('mc-month-year-picker').then(($el) => {
        $el[0].max = { month: 9, year: 2025 };
      });
      cy.get('[data-cy="month"]').within(() => {
        // all months should not be disabled in the current year 2023
        cy.get('mc-picker-item[disabled]').should('have.length', 0);
      });
      cy.get('[data-cy="year"]').within(() => {
        cy.get('mc-picker-item[disabled]').should('have.length', 5);
        cy.get('mc-picker-item[disabled]').then(($els) => {
          let text = '';
          for (const element of $els) {
            text += element.shadowRoot.querySelector('mc-button').label;
          }
          expect(text).to.equal('20262027202820292030');
        });
      });
      // January and February should be disabled in the 2025
      cy.get('[data-cy="year"]').find(`mc-picker-item[value="2025"]`).click();
      cy.get('[data-cy="month"]').within(() => {
        cy.get('mc-picker-item[disabled]').should('have.length', 2);
        cy.get('mc-picker-item[disabled]').then(($els) => {
          let text = '';
          for (const element of $els) {
            text += element.shadowRoot.querySelector('mc-button').label;
          }
          expect(text).to.equal('NovemberDecember');
        });
      });
    });

    it('should pick first not disabled month when swapping years with min & max values set', () => {
      cy.get('mc-month-year-picker').then(($el) => {
        $el[0].min = { month: 'March', year: 2023 };
        $el[0].max = { month: 9, year: 2024 };
      });
      cy.get('[data-cy="month"]').find(`mc-picker-item[value="November"]`).click();
      cy.get('[data-cy="year"]').find(`mc-picker-item[value="2024"]`).click();
      cy.get('mc-month-year-picker')
        .then(($el) => {
          ($el[0] as McMonthYearPicker).value = { month: 0, year: 2024 };
        })
        .then(() => {
          cy.get('[data-cy=selection-window]').should('have.text', `${months[0]}2024`);
        });
      cy.get('[data-cy="month"]').within(() => {
        cy.get('mc-picker-item[disabled]').should('have.length', 2);
        cy.get('mc-picker-item[disabled]').then(($els) => {
          let text = '';
          for (const element of $els) {
            text += element.shadowRoot.querySelector('mc-button').label;
          }
          expect(text).to.equal('NovemberDecember');
        });
      });
      cy.get('[data-cy="year"]').find(`mc-picker-item[value="2023"]`).click();
      cy.get('mc-month-year-picker')
        .then(($el) => {
          ($el[0] as McMonthYearPicker).value = { month: 2, year: 2023 };
        })
        .then(() => {
          cy.get('[data-cy=selection-window]').should('have.text', `${months[2]}2023`);
        });
      cy.get('[data-cy="month"]').within(() => {
        cy.get('mc-picker-item[disabled]').should('have.length', 2);
        cy.get('mc-picker-item[disabled]').then(($els) => {
          let text = '';
          for (const element of $els) {
            text += element.shadowRoot.querySelector('mc-button').label;
          }
          expect(text).to.equal('JanuaryFebruary');
        });
      });
    });
  });

  describe('key navigation', () => {
    describe('when month initially focused', () => {
      beforeEach(() => {
        cy.mount<McMonthYearPicker>(html`<mc-month-year-picker locale="en-GB"></mc-month-year-picker>`);
        cy.get('[data-cy=month]').then(($el) => ($el.get(0) as McPicker).focusWith());
      });

      it('right arrow should bring the focus to the year', () => {
        cy.realPress('ArrowRight');
        cy.get('[data-cy=month]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(false);
        });
        cy.get('[data-cy=year]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(true);
        });
      });
    });

    describe('when year initially focused', () => {
      beforeEach(() => {
        cy.mount<McMonthYearPicker>(html`<mc-month-year-picker></mc-month-year-picker>`);
        cy.get('[data-cy=year]').then(($el) => ($el.get(0) as McPicker).focusWith());
      });

      it('left arrow should bring the focus to the month', () => {
        cy.realPress('ArrowLeft');

        cy.get('[data-cy=month]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(true);
        });
        cy.get('[data-cy=year]').then(($el) => {
          const el: McPicker = $el.get(0) as McPicker;
          expect(el.focused).to.equal(false);
        });
      });
    });
  });

  describe('in a different locale', () => {
    it('should render months in a different locale', () => {
      cy.mount<McMonthYearPicker>(html`<mc-month-year-picker locale="de-DE"></mc-month-year-picker>`);
      cy.get('[data-cy=month]').within(() => {
        cy.get('mc-button').then(($els) => {
          expect($els.length).to.equal(12);
          for (const el of $els) {
            expect(el.label).to.match(
              /(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)/,
            );
          }
        });
      });
    });
  });
});
