import { render } from '@testing-library/react';

import ScenegraphVisualizer from './scenegraph-visualizer';

describe('ScenegraphVisualizer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScenegraphVisualizer />);
    expect(baseElement).toBeTruthy();
  });
});
