import { McAvatar } from '../src';
import '../src';

const imgSrc = 'https://avatars.githubusercontent.com/u/70194550?v=4';
const info = 'Jane Doe';
const initials = 'JAD';
const emptyImage =
  'data:image/png;base64,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';

context('mc-avatar', () => {
  beforeEach(() => {
    cy.mount<McAvatar>(`<mc-avatar info="${info}"></mc-avatar>`).as('mc-avatar');
    cy.get('@mc-avatar').find('img').as('mc-avatar-image');
    cy.get('@mc-avatar').find('#avatar-info').as('mc-avatar-info');
    cy.get('@mc-avatar').invoke('attr', 'info', info);
  });
  it('mounts', () => {
    cy.get('@mc-avatar');
  });
  it('sets default props correctly', () => {
    const hasAtLeastOneClass = (expectedClasses: string[]) => {
      return ($el: { classList: Iterable<unknown> | ArrayLike<unknown> }[]) => {
        const classList = Array.from($el[0].classList);
        return expectedClasses.some((expectedClass) => classList.includes(expectedClass));
      };
    };

    cy.get('@mc-avatar-image').should('have.attr', 'src', emptyImage);
    cy.get('@mc-avatar')
      .find('.mc-avatar')
      .should('satisfy', hasAtLeastOneClass(['mc-avatar--medium', 'mc-avatar--color1']));
  });

  it('sets info prop correctly', () => {
    cy.get('@mc-avatar-info').contains(info);
  });

  it('sets imagesrc prop correctly', () => {
    cy.get('@mc-avatar').invoke('attr', 'imagesrc', imgSrc);
    cy.get('@mc-avatar-image').should('have.attr', 'src', imgSrc);
  });

  it('sets initials prop correctly', () => {
    cy.get('@mc-avatar').invoke('attr', 'initials', initials);
    cy.get('@mc-avatar').find('.mc-avatar--element').should('have.text', initials);
  });

  it('trims initials prop to max 3 char.', () => {
    cy.get('@mc-avatar').invoke('attr', 'initials', 'JADO');
    cy.get('@mc-avatar').find('.mc-avatar--element').should('have.text', initials);
  });

  it('sets appearance to color2', () => {
    cy.get('@mc-avatar').invoke('attr', 'initials', 'JAD');
    cy.get('@mc-avatar').invoke('attr', 'appearance', 'color2');
    cy.get('@mc-avatar').find('.mc-avatar').should('have.class', 'mc-avatar--color2');
  });

  it('sets fit to large', () => {
    cy.get('@mc-avatar').invoke('attr', 'initials', 'JAD');
    cy.get('@mc-avatar').invoke('attr', 'fit', 'large');
    cy.get('@mc-avatar').find('.mc-avatar').should('have.class', 'mc-avatar--large');
  });

  describe('hiddentooltip prop', () => {
    it('default', () => {
      cy.get('mc-tooltip').should('exist');
    });
    it('hiddentootlip = true', () => {
      cy.get('@mc-avatar').invoke('attr', 'hiddentooltip', true);
      cy.get('mc-tooltip').should('not.exist');
    });
  });
});
