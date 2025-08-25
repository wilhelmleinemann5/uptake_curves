import React from 'react';
import { render } from '@testing-library/react';
import { screen, findByShadowLabelText } from 'shadow-dom-testing-library';
import { Button } from '../src/app/components/Button';
import { IMcButton } from '@maersk-global/mds-components-core-button/types';

describe('Button', () => {
  it('can test elements in shadowDOM in mc-button using findByShadowText', async () => {
    render(<Button />);
    const button = screen.findByShadowText('Test') as unknown as IMcButton & HTMLElement;
    expect(await button).toBeInTheDocument();
  });

  it('can test elements in shadowDOM in mc-button using findByShadowLabelText', async () => {
    const { container } = render(<Button />);
    const mcButton = container.querySelector('mc-button') as unknown as IMcButton & HTMLElement;
    const button = await findByShadowLabelText(mcButton, 'Test');
    expect(await button).toBeInTheDocument();
  });
});
