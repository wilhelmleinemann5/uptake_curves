import { McTab } from '../src';
import '../src';

context('mc-tab', () => {
  describe('shows tab content', () => {
    beforeEach(() => {
      cy.mount<McTab>(`<mc-tab label="Info" icon="info-circle"></mc-tab>`).as('mc-tab');
    });
    it('mounts', () => {
      cy.get('@mc-tab');
    });
    it('renders label and icon', () => {
      cy.get('@mc-tab').find('.slots-container').should('contain.text', 'Info');
    });
  });
});
