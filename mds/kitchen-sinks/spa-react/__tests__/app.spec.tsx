import { fireEvent, render, screen } from '@testing-library/react';
import App from '../src/app/app';
import { IMcButton } from '@maersk-global/mds-components-core-button/types';

describe('App', () => {
  it('should render successfully', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should have a Avatar in the text', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Avatar/)).toBeTruthy();
  });

  it('should be able to click on mc-button using getByTestId selector', () => {
    render(<App />);
    const button = screen.getByTestId('mcButton') as IMcButton & HTMLElement;
    fireEvent.click(button);
    expect(button.label).toBe('Another Test');
  });

  it('should be able to click on mc-button using querySelector', () => {
    const { container } = render(<App />);
    const button = container.querySelector('mc-button') as IMcButton & HTMLElement;
    fireEvent.click(button);
    expect(button.label).toBe('Another Test');
  });
});
