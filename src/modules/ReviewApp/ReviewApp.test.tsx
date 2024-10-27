import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ReviewApp from './ReviewApp';
import { Review } from '@/data/reviews';

const handleSaveReview = jest.fn();
const refreshReviews = jest.fn();

jest.mock('./hooks/useFetchReviews', () => ({
  useFetchReviews: () => ({
    reviews: [
      { id: 1, rating: 5, review: 'Great!', author: 'John Doe' },
      { id: 2, rating: 3, review: 'Good', author: 'Jane Doe' },
      { id: 3, rating: 4, review: 'Nice', author: 'John Smith' },
      { id: 4, rating: 2, review: 'Bad', author: 'Jane Smith' },
    ],
    total: 0,
    loading: false,
    refreshReviews,
  }),
}));

jest.mock('./hooks/useSaveReview', () => ({
  useSaveReview: () => ({
    handleSaveReview,
  }),
}));

it('renders the ReviewApp component with its two sections', () => {
  render(<ReviewApp />);

  expect(
    screen.getByRole('heading', { level: 2, name: 'Rate & Share' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 2, name: /^Reviews/i }),
  ).toBeInTheDocument();
});

it('calls handleSaveReview and refreshReviews when saving a review', async () => {
  render(<ReviewApp />);

  const review: Omit<Review, 'id'> = {
    rating: 5,
    review: 'Great!',
    author: 'John Doe',
  };

  const form = screen.getByRole('form');
  expect(form).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Review'), {
    target: { value: review.review },
  });

  fireEvent.change(screen.getByLabelText('Name *'), {
    target: { value: review.author },
  });

  const radios = screen.getAllByRole('radio');
  fireEvent.click(radios[4]);

  fireEvent.click(screen.getByRole('button', { name: 'Submit review' }));

  await waitFor(() => {
    expect(handleSaveReview).toHaveBeenCalledWith(review);
    expect(refreshReviews).toHaveBeenCalled();
  });
});
