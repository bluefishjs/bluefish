import { render } from '@testing-library/react';

import Ref from './ref';

describe('Ref', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ref />);
    expect(baseElement).toBeTruthy();
  });
});
