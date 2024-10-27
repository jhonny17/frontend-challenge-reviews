import { render, screen } from '@testing-library/react';

import Button from './Button';

it('matches snapshot', () => {
  const { container } = render(<Button>This is my custom button</Button>);
  expect(container).toMatchSnapshot();
});
