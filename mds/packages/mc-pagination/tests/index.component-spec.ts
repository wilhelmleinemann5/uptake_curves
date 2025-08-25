import { McPagination } from '../src';
import '../src';

const totalpages = '10';

describe('mc-pagination', () => {
  describe('when interacting directly with mouse', () => {
    beforeEach(() => {
      cy.mount<McPagination>(`<mc-pagination></mc-pagination>`).as('mc-pagination');
      cy.get('mc-pagination').as('mc-pagination').invoke('attr', 'totalpages', totalpages);
      cy.get('@mc-pagination').find('mc-button#pagination-button-1').as('first-page-mc-button');
      cy.get('@mc-pagination').find('ul li:first-child mc-button').as('prev-mc-button');
      cy.get('@mc-pagination').find('ul li:last-child mc-button').as('next-mc-button');
      cy.viewport(800, 500);
    });
    it('mounts', () => {
      cy.get('@mc-pagination').contains(totalpages);
    });
    describe('one single page', () => {
      beforeEach(() => {
        cy.get('mc-pagination').as('mc-pagination').invoke('attr', 'totalpages', 1);
      });
      it('shows the first page number as selected', () => {
        cy.get('@first-page-mc-button').should('have.attr', 'variant', 'filled');
      });

      it('should disable next/previous', () => {
        cy.get('@prev-mc-button').should('have.attr', 'disabled');
        cy.get('@next-mc-button').should('have.attr', 'disabled');
      });

      it("shouldn't truncate", () => {
        cy.get('@mc-pagination').find('ul li span:contains("...")').should('have.length', 0);
      });

      it("doesn't dispatch pagechange, when pressing the page number", () => {
        const pageChangeHandler = cy.stub().as('pageChangeHandler');
        cy.get('@mc-pagination').then(($el) => {
          const mcPagination = $el.get(0);
          mcPagination.addEventListener('pagechange', pageChangeHandler);
          cy.get('@first-page-mc-button').realClick();
        });
        cy.get('@pageChangeHandler').its('callCount').should('eq', 0);
      });
    });

    describe('more than one page', () => {
      beforeEach(() => {
        cy.get('@mc-pagination').invoke('attr', 'visiblepages', 7);
        cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').as('second-page-mc-button');
      });

      it('selects the second page number as the only one, when pressing the second page number', () => {
        cy.get('@second-page-mc-button').realClick();
        cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').should('have.attr', 'variant', 'filled');
        cy.get('@mc-pagination').find('mc-button[variant="filled"]').should('have.length', 1);
      });

      it('selects the second page as the only one, when pressing the next button whilst the first page is selected', () => {
        cy.get('@first-page-mc-button').realClick();
        cy.get('@next-mc-button').realClick();
        cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').should('have.attr', 'variant', 'filled');
        cy.get('@mc-pagination').find('mc-button[variant="filled"]').should('have.length', 1);
      });

      it("dispatches a 'pagechange' event with '2' in the event detail, when pressing the second page number", () => {
        const pageChangeHandler = cy.stub().as('pageChangeHandler');
        cy.get('@mc-pagination').then(($el) => {
          const mcPagination = $el.get(0);
          mcPagination.addEventListener('pagechange', pageChangeHandler);
          cy.get('@second-page-mc-button').realClick();
        });

        cy.get('@pageChangeHandler').its('callCount').should('eq', 1);
        cy.get('@pageChangeHandler').should('have.been.calledWithMatch', {
          detail: 2,
        });
      });

      it("enables the 'previous' nav button while the 'next' nav button is still enabled, when pressing the second page number", () => {
        cy.get('@second-page-mc-button').realClick();

        cy.get('@prev-mc-button').should('not.have.attr', 'disabled');
        cy.get('@next-mc-button').should('not.have.attr', 'disabled');
      });

      it("disables the 'next' nav button while the 'previous' nav button is still enabled, when pressing the last page number", () => {
        cy.get('@mc-pagination')
          .find('mc-button[id="pagination-button-10"]')
          .as('last-page-mc-button')
          .click({ force: true });

        cy.get('@prev-mc-button').should('not.have.attr', 'disabled');
        cy.get('@next-mc-button').should('have.attr', 'disabled');
      });

      it("goes to the second last page when pressing on the 'previous' button whilst the last page is selected", () => {
        cy.get('@mc-pagination').find('mc-button[id="pagination-button-10"]').click({ force: true });

        cy.get('@prev-mc-button').realClick();

        cy.get('@mc-pagination').find('mc-button[id="pagination-button-9"]').should('have.attr', 'variant', 'filled');
      });

      it('enables the next nav button when pressing on the previous button whilst the last page is selected', () => {
        cy.get('@mc-pagination').find('mc-button[id="pagination-button-10"]').realClick();

        cy.get('@prev-mc-button').realClick();

        cy.get('@next-mc-button').should('not.have.attr', 'disabled');
      });

      it("enables the 'next' and the 'previous' nav button when the currently active page is not at the end nor the beginning of the page list", () => {
        cy.get('@mc-pagination').find('mc-button[id="pagination-button-5"]').realClick();

        cy.get('@next-mc-button').should('not.have.attr', 'disabled');
        cy.get('@prev-mc-button').should('not.have.attr', 'disabled');
      });

      it('ceils the totalpages to handle inputs decimal/float inputs', () => {
        cy.get('mc-pagination').invoke('attr', 'totalpages', 10.5);

        cy.wait(100);
        cy.get('mc-button').then(($buttons) => {
          const lastPageButton = $buttons[$buttons.length - 2];
          expect(lastPageButton.label).to.equal('11');
        });
      });
    });
  });

  describe('when using key navigation', () => {
    beforeEach(() => {
      cy.mount<McPagination>(`<mc-pagination visiblepages="7"></mc-pagination>`).as('mc-pagination');
      cy.get('mc-pagination').as('mc-pagination').invoke('attr', 'totalpages', totalpages);
      cy.get('@mc-pagination').find('mc-button#pagination-button-1').as('first-page-mc-button');
      cy.get('@mc-pagination').find('ul li:first-child mc-button').as('prev-mc-button');
      cy.get('@mc-pagination').find('ul li:last-child mc-button').as('next-mc-button');
      cy.viewport(800, 500);
    });

    it('should focus on the second page number when pressing tab key whilst the first page number is focused', () => {
      cy.get('@first-page-mc-button').find('button').focus();

      cy.realPress('Tab');

      cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').should('have.focus');
    });

    it('should focus on the first page number when pressing shift + tab key whilst the second page number is focused', () => {
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').find('button').focus();

      cy.realPress(['Shift', 'Tab']);

      cy.get('@first-page-mc-button').find('button').should('have.focus');
    });

    it('should select a page number, if enter is pressed whilst that page number is focused', () => {
      cy.get('@first-page-mc-button').find('button').focus();

      cy.realPress('Tab').realPress('Enter');

      cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').should('have.attr', 'variant', 'filled');
    });

    it('should dispatch a `pagechange` event with the page number in the detail, if enter is pressed whilst that page number is focused', () => {
      cy.get('@first-page-mc-button').find('button').focus();
      const pageChangeHandler = cy.stub().as('pageChangeHandler');
      cy.get('@mc-pagination').then(($el) => {
        const mcPagination = $el.get(0);
        mcPagination.addEventListener('pagechange', pageChangeHandler);

        cy.realPress('Tab').realPress('Enter');
      });

      cy.get('@pageChangeHandler').its('callCount').should('eq', 1);
      cy.get('@pageChangeHandler').should('have.been.calledWithMatch', {
        detail: 2,
      });
    });

    it('should disable the next nav button when the last page number is selected by pressing enter on it', () => {
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-10"]').find('button').focus();
      cy.get('@mc-pagination')
        .find('mc-button[id="pagination-button-10"]')
        .find('button')
        .type('{enter}', { force: true });

      cy.get('@prev-mc-button').should('not.have.attr', 'disabled');
      cy.get('@next-mc-button').should('have.attr', 'disabled');
    });

    it('should disable the previous nav button when the first page number is selected by pressing enter on it', () => {
      cy.get('@first-page-mc-button').find('button').focus();
      cy.get('@first-page-mc-button').find('button').realPress('Enter');

      cy.get('@prev-mc-button').should('have.attr', 'disabled');
      cy.get('@next-mc-button').should('not.have.attr', 'disabled');
    });

    it('should focus the previous nav button when pressing shift + tab when first page is focused and first page is not active', () => {
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').find('button').realClick();

      cy.get('@first-page-mc-button').find('button').focus();
      cy.get('@first-page-mc-button').find('button').realPress(['Shift', 'Tab']);

      cy.get('@prev-mc-button').should('have.focus');
    });

    it('should not focus the previous nav button when pressing shift + tab when first page is focused and active', () => {
      cy.get('@first-page-mc-button').find('button').realClick().realPress(['Shift', 'Tab']);

      cy.get('@prev-mc-button').should('not.have.focus');
    });
  });

  describe('truncation logic', () => {
    beforeEach(() => {
      cy.mount<McPagination>(`<mc-pagination visiblepages="7" totalpages="10"></mc-pagination>`).as('mc-pagination');
      cy.get('mc-pagination').as('mc-pagination').invoke('attr', 'totalpages', totalpages);
      cy.get('@mc-pagination').find('mc-button#pagination-button-1').as('first-page-mc-button');
      cy.get('@mc-pagination').find('ul li:first-child mc-button').as('prev-mc-button');
      cy.get('@mc-pagination').find('ul li:last-child mc-button').as('next-mc-button');
      cy.viewport(800, 500);
    });

    it('should show the ellipsis next to the first page number, when the selected page number is in the end of the page numbers list', () => {
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-10"]').click({ force: true });

      cy.get('@mc-pagination').find('ul li:nth-child(3) span:contains("...")');
    });

    it('should show the ellipsis next to the last page number, when the selected page number is in the begining of the page numbers list', () => {
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').realClick();

      cy.get('@mc-pagination').find('ul li:nth-last-child(3) span:contains("...")');
    });

    it('should show two ellipsis in the beginning and end, when the selected page number is in the middle', () => {
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-5"]').realClick();

      cy.get('@mc-pagination').find('ul li:nth-child(3) span:contains("...")');

      cy.get('@mc-pagination').find('ul li:nth-last-child(3) span:contains("...")');
    });

    it("should not show elipsis if the 'visiblepages' property is bigger than 'totalpages' property", () => {
      cy.get('@mc-pagination').invoke('attr', 'visiblepages', 7).invoke('attr', 'totalpages', 6);

      cy.get('@mc-pagination').find('ul li span:contains("...")').should('have.length', 0);
    });

    it("should not show elipsis if the 'disabletruncation' is set to 'true'", () => {
      cy.get('@mc-pagination')
        .invoke('attr', 'visiblepages', 7)
        .invoke('attr', 'totalpages', 6)
        .invoke('attr', 'disabletruncation', true);

      cy.get('@mc-pagination').find('ul li span:contains("...")').should('have.length', 0);
    });
  });

  describe('with router links when interacting directly with mouse', () => {
    beforeEach(() => {
      cy.mount<McPagination>(
        `<mc-pagination totalpages="10">
          <a href="#1">1</a>
          <a href="#2">2</a>
          <a href="#3">3</a>
          <a href="#4">4</a>
          <a href="#5">5</a>
          <a href="#6">6</a>
          <a href="#7">7</a>
          <a href="#8">8</a>
          <a href="#9">9</a>
          <a href="#10">10</a>
        </mc-pagination>`,
      ).as('mc-pagination');
      cy.viewport(800, 500);
    });
    it('mounts', () => {
      cy.get('@mc-pagination').contains(totalpages);
    });
    it('renders span with link and page number', () => {
      cy.get('@mc-pagination').find('a').should('have.length', 10);
      cy.get('@mc-pagination').find('li').eq(1).find('a').should('have.attr', 'href', '#1');
      cy.get('@mc-pagination').find('li').eq(1).find('mc-button').find('span').contains('1');
      cy.get('@mc-pagination').find('li').eq(2).find('a').should('have.attr', 'href', '#2');
      cy.get('@mc-pagination').find('li').eq(2).find('mc-button').find('span').contains('2');
      cy.get('@mc-pagination').find('li').eq(3).find('a').should('have.attr', 'href', '#3');
      cy.get('@mc-pagination').find('li').eq(3).find('mc-button').find('span').contains('3');
      cy.get('@mc-pagination').find('li').eq(4).find('a').should('have.attr', 'href', '#4');
      cy.get('@mc-pagination').find('li').eq(4).find('mc-button').find('span').contains('4');
      cy.get('@mc-pagination').find('li').eq(5).find('a').should('have.attr', 'href', '#5');
      cy.get('@mc-pagination').find('li').eq(5).find('mc-button').find('span').contains('5');
      cy.get('@mc-pagination').find('li').eq(6).find('a').should('have.attr', 'href', '#6');
      cy.get('@mc-pagination').find('li').eq(6).find('mc-button').find('span').contains('6');
      cy.get('@mc-pagination').find('li').eq(7).find('a').should('have.attr', 'href', '#7');
      cy.get('@mc-pagination').find('li').eq(7).find('mc-button').find('span').contains('7');
      cy.get('@mc-pagination').find('li').eq(8).find('a').should('have.attr', 'href', '#8');
      cy.get('@mc-pagination').find('li').eq(8).find('mc-button').find('span').contains('8');
      cy.get('@mc-pagination').find('li').eq(9).find('a').should('have.attr', 'href', '#9');
      cy.get('@mc-pagination').find('li').eq(9).find('mc-button').find('span').contains('9');
      cy.get('@mc-pagination').find('li').eq(10).find('a').should('have.attr', 'href', '#10');
      cy.get('@mc-pagination').find('li').eq(10).find('mc-button').find('span').contains('10');
    });

    it('selects the pages, when clicking on page number', () => {
      cy.get('@mc-pagination').find('li').eq(2).find('mc-button').realClick();
      cy.get('@mc-pagination').find('mc-button[id="pagination-button-2"]').should('have.attr', 'variant', 'filled');
      cy.get('@mc-pagination').find('mc-button[variant="filled"]').should('have.length', 1);
    });

    it("dispatches a 'pagechange' event with '2' in the event detail, when pressing the second page number", () => {
      const pageChangeHandler = cy.stub().as('pageChangeHandler');
      cy.get('@mc-pagination').then(($el) => {
        const mcPagination = $el.get(0);
        mcPagination.addEventListener('pagechange', pageChangeHandler);
        cy.get('@mc-pagination').find('li').eq(2).realClick();
      });

      cy.get('@pageChangeHandler').its('callCount').should('eq', 1);
      cy.get('@pageChangeHandler').should('have.been.calledWithMatch', {
        detail: 2,
      });
    });
  });
});
