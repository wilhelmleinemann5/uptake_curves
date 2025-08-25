import { McTag } from '../src/index';
import '../src/index';

const label = 'Tag';

describe('mc-tag', () => {
  beforeEach(() => {
    cy.mount<McTag>(`<mc-tag label="${label}"></mc-tag>`).as('mc-tag');
  });
  it('mounts', () => {
    cy.get('@mc-tag').contains(label);
  });

  it('should dispatch a dismiss event when the dismiss button is clicked', () => {
    cy.get('@mc-tag').invoke('attr', 'withaction', 'true');
    const dismissHandler = cy.stub().as('dismissHandler');
    cy.get('@mc-tag').then(($el) => {
      const mcTag = $el.get(0);
      mcTag.addEventListener('dismiss', dismissHandler);
    });
    cy.get('@mc-tag').find('button').click();
    cy.get('@dismissHandler').its('callCount').should('eq', 1);
  });

  it('should dispatch a dismiss event when Enter is pressed on the dismiss button', () => {
    cy.get('@mc-tag').invoke('attr', 'withaction', 'true');
    const dismissHandler = cy.stub().as('dismissHandler');
    cy.get('@mc-tag').then(($el) => {
      const mcTag = $el.get(0);
      mcTag.addEventListener('dismiss', dismissHandler);
    });

    cy.get('@mc-tag').find('button').as('tag-button');
    cy.get('@tag-button').focus();
    cy.get('@tag-button').realPress('Enter');
    cy.get('@dismissHandler').its('callCount').should('eq', 1);
  });
});
