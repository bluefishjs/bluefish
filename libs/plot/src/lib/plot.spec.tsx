import { render } from '@testing-library/react';

import Plot from './plot';

describe('Plot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Plot />);
    expect(baseElement).toBeTruthy();
  });
});
