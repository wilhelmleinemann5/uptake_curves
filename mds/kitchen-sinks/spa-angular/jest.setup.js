import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

jest.spyOn(global.console, 'debug').mockImplementation(() => jest.fn());
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

HTMLDialogElement.prototype.show = jest.fn(function () {
  this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn(function () {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function () {
  this.open = false;
});
