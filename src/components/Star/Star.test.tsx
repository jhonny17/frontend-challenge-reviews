import { screen, render } from '@testing-library/react';

import Star, { StarProps } from './Star';

const defaultProps: StarProps = {
  marked: false,
  starId: 1,
};

it('renders an unmarked star', () => {
  render(<Star {...defaultProps} />);

  const button = screen.getByRole('presentation');
  expect(button).toBeInTheDocument();

  expect(button).toHaveTextContent('\u2606');
});

it('renders a marked star', () => {
  render(<Star {...defaultProps} marked />);

  const button = screen.getByRole('presentation');
  expect(button).toBeInTheDocument();

  expect(button).toHaveTextContent('\u2605');
});
