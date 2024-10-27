import { render } from '@testing-library/react';

import Card, { CardProps } from './Card';

const defaultProps: CardProps = {
  children: 'Card content',
};

it('matches snapshot', () => {
  const { container } = render(<Card {...defaultProps} />);
  expect(container).toMatchSnapshot();
});
