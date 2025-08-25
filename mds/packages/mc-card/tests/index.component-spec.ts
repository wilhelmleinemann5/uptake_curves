import { McCard } from '../src';
import '../src';

const image = 'https://designsystem.maersk.com/assets/hero.2d6842fe.svg';
const imagebackgroundcolor = 'rgb(248, 248, 248)';
const imagepercent = '100';
const heading = 'Heading';
const subheading = 'Sub heading';
const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const footer = 'Footer';
const href = 'https://designsystem.maersk.com';
const target = '_blank';
const rel = 'external';
const padding = '24px';

describe('mc-card', () => {
  beforeEach(() => {
    cy.mount<McCard>(
      `<mc-card heading="${heading}" subheading="${subheading}" body="${body}" footer="${footer}" image="${image}"></mc-card>`,
    ).as('mc-card');
  });
  it('mounts', () => {
    cy.get('@mc-card');
  });
  it('image', () => {
    cy.get('@mc-card')
      .find('.image-as-background .image-inner')
      .should('have.attr', 'style', `background-image:url(${image});padding-top:56.25%;`);
    cy.get('@mc-card').invoke('attr', 'imagebackgroundcolor', imagebackgroundcolor);
    cy.get('@mc-card')
      .find('.image-as-background .image-inner')
      .should(
        'have.attr',
        'style',
        `background-image: url("${image}"); padding-top: 56.25%; background-color: ${imagebackgroundcolor};`,
      );

    cy.get('@mc-card').invoke('attr', 'imagepercent', imagepercent);
    cy.get('@mc-card')
      .find('.image-as-background .image-inner')
      .should(
        'have.attr',
        'style',
        `background-image: url("${image}"); padding-top: ${imagepercent}%; background-color: ${imagebackgroundcolor};`,
      );

    cy.get('@mc-card').find('> div').should('have.class', 'image-scale-strength-light');
    cy.get('@mc-card').invoke('attr', 'imagescalestrength', 'medium');
    cy.get('@mc-card').find('> div').should('have.class', 'image-scale-strength-medium');
    cy.get('@mc-card').invoke('attr', 'imagescalestrength', 'prominent');
    cy.get('@mc-card').find('> div').should('have.class', 'image-scale-strength-prominent');
    cy.get('@mc-card').invoke('attr', 'imagescalestrength', 'none');
    cy.get('@mc-card').find('> div').should('have.class', 'image-scale-strength-none');
  });

  it('content ', () => {
    cy.get('@mc-card').find('.heading').contains(heading);
    cy.get('@mc-card').find('.sub-heading').contains(subheading);
    cy.get('@mc-card').find('slot').contains(body);
    cy.get('@mc-card').find('.footer').contains(footer);
    cy.get('@mc-card').find('> div').should('have.class', 'content-top');
    cy.get('@mc-card').invoke('attr', 'contentalignment', 'middle');
    cy.get('@mc-card').find('> div').should('have.class', 'content-middle');
    cy.get('@mc-card').invoke('attr', 'contentalignment', 'bottom');
    cy.get('@mc-card').find('> div').should('have.class', 'content-bottom');
  });

  it('fit', () => {
    cy.get('@mc-card').find('> div').should('have.class', 'medium');
    cy.get('@mc-card').invoke('attr', 'fit', 'small');
    cy.get('@mc-card').find('> div').should('have.class', 'small');
    cy.get('@mc-card').invoke('attr', 'fit', 'large');
    cy.get('@mc-card').find('> div').should('have.class', 'large');
  });

  it('variant', () => {
    cy.get('@mc-card').find('> div').should('have.class', 'bordered');
    cy.get('@mc-card').invoke('attr', 'variant', 'borderless');
    cy.get('@mc-card').find('> div').should('have.class', 'borderless');
  });

  it('orientation', () => {
    cy.get('@mc-card').find('> div').should('have.class', 'vertical');
    cy.get('@mc-card').invoke('attr', 'orientation', 'horizontal');
    cy.get('@mc-card').find('> div').should('have.class', 'horizontal');
  });

  it('padding', () => {
    cy.get('@mc-card').invoke('attr', 'padding', padding);
    cy.get('@mc-card').find('> div').should('have.attr', 'style', `padding: ${padding};`);
  });

  it('actions and href', () => {
    cy.get('@mc-card').find('.actions').should('have.length', 1);
    cy.get('@mc-card').invoke('attr', 'href', href);
    cy.get('@mc-card').invoke('attr', 'target', target);
    cy.get('@mc-card').invoke('attr', 'rel', rel);
    cy.get('@mc-card').find('.actions.hidden').should('have.length', 1);
    cy.get('@mc-card').find('> a').invoke('attr', 'href').should('eq', href);
    cy.get('@mc-card').find('> a').invoke('attr', 'target').should('eq', target);
    cy.get('@mc-card').find('> a').invoke('attr', 'rel').should('eq', rel);
  });

  it('clearing values', () => {
    cy.get('@mc-card').find('.image-as-background').should('have.length', 1);
    cy.get('@mc-card').find('.header').should('have.length', 1);
    cy.get('@mc-card').find('.heading').should('have.length', 1);
    cy.get('@mc-card').find('.sub-heading').should('have.length', 1);
    cy.get('@mc-card').find('.body').should('have.length', 1);
    cy.get('@mc-card').find('.footer').should('have.length', 1);
    cy.get('@mc-card').invoke('attr', 'image', '');
    cy.get('@mc-card').find('.image-as-background').should('have.length', 0);
    cy.get('@mc-card').invoke('attr', 'heading', '');
    cy.get('@mc-card').find('.heading').should('have.length', 0);
    cy.get('@mc-card').invoke('attr', 'subheading', '');
    cy.get('@mc-card').find('.sub-heading').should('have.length', 0);
    cy.get('@mc-card').find('.header').should('have.length', 0);
    cy.get('@mc-card').invoke('attr', 'body', '');
    cy.get('@mc-card').find('.body.hidden').should('have.length', 1);
    cy.get('@mc-card').invoke('attr', 'footer', '');
    cy.get('@mc-card').find('.body.hidden').should('have.length', 1);
  });

  it('card is clickable', () => {
    const clickSpy = cy.spy().as('clickSpy');
    cy.get('@mc-card').find('.clickable').should('have.length', 0);
    cy.get('@mc-card').invoke('attr', 'clickable', 'true');
    cy.get('@mc-card').find('.clickable').should('have.length', 1);
    cy.get('@mc-card').then((card) => {
      card.on('click', clickSpy);
    });
    cy.get('@mc-card').click();
    cy.get('@clickSpy').should('have.been.calledOnce');
    cy.get('@mc-card').find('.mc-card').trigger('mouseover', 'bottom', { force: true });
    cy.get('@mc-card').find('.mc-card').should('have.css', 'cursor', 'pointer');
  });
});
