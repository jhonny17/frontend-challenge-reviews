import { render, screen } from '@testing-library/react';

import Review, { ReviewProps } from './Review';
import { DEFAULT_NUMBER_STARS } from '../StarRating';

const defaultProps: ReviewProps = {
  review: {
    author: 'John Doe',
    rating: 3,
    review: 'Great product!',
    id: 1,
  },
};

it('renders review', () => {
  render(<Review {...defaultProps} />);

  const { review, author, rating } = defaultProps.review;

  const heading = screen.getByRole('heading', { level: 3, name: author });
  expect(heading).toBeInTheDocument();
  expect(screen.getByText(review ?? '')).toBeInTheDocument();

  const stars = screen.getAllByRole('radio');
  expect(stars).toHaveLength(DEFAULT_NUMBER_STARS);
  stars.forEach((star, index) => {
    if (index < rating) {
      expect(star).toBeChecked();
    } else {
      expect(star).not.toBeChecked();
    }
  });
});

it('renders review without review text', () => {
  const props = {
    ...defaultProps,
    review: { ...defaultProps.review, review: null },
  };

  render(<Review {...props} />);

  expect(
    screen.queryByText(defaultProps.review.review ?? ''),
  ).not.toBeInTheDocument();
});
