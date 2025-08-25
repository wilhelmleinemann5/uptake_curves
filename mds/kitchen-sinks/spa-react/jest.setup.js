import '@testing-library/jest-dom';

jest.spyOn(global.console, 'debug').mockImplementation(() => jest.fn());
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

HTMLDialogElement.prototype.show = jest.fn(function () {
  this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn(function () {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function () {
  this.open = false;
});
