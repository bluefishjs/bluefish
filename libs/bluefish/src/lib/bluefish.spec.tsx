import { render } from '@testing-library/react';

import Bluefish from './bluefish';

describe('Bluefish', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bluefish />);
    expect(baseElement).toBeTruthy();
  });
});
