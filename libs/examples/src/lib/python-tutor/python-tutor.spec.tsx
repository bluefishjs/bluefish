import { render } from '@testing-library/react';

import PythonTutor from './python-tutor';

describe('PythonTutor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PythonTutor />);
    expect(baseElement).toBeTruthy();
  });
});
