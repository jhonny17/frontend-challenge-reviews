import { render, screen, fireEvent } from '@testing-library/react';

import ReviewList, { ReviewListProps } from './ReviewList';
import { Review } from '@/data/reviews';

const mockedReviews: Review[] = [
  { id: 1, rating: 5, review: 'Great!', author: 'John Doe' },
  { id: 2, rating: 3, review: 'Good', author: 'Jane Doe' },
  { id: 3, rating: 4, review: 'Nice', author: 'John Smith' },
  { id: 4, rating: 2, review: 'Bad', author: 'Jane Smith' },
];

const defaultProps: ReviewListProps = {
  reviews: mockedReviews,
  total: mockedReviews.length,
  page: 1,
  pageSize: 2,
  loading: false,
  setPage: jest.fn(),
  setPageSize: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders the list of reviews', () => {
  render(<ReviewList {...defaultProps} />);

  const { reviews } = defaultProps;

  expect(
    screen.getByText(`Reviews (${defaultProps.total} total)`),
  ).toBeInTheDocument();

  reviews.forEach(({ author, rating, review: reviewText }) => {
    expect(
      screen.getByRole('heading', { level: 3, name: author }),
    ).toBeInTheDocument();

    const exists = screen
      .getAllByRole('radiogroup')
      .some(radioGroup => +radioGroup.dataset.ratingValue! === rating);
    expect(exists).toBe(true);

    expect(screen.getByText(reviewText!)).toBeInTheDocument();
  });
});

it('renders the pagination', () => {
  render(<ReviewList {...defaultProps} />);

  expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
});

it('calls setPage when clicking on a page button', () => {
  render(<ReviewList {...defaultProps} />);

  fireEvent.click(screen.getByRole('button', { name: '2' }));

  expect(defaultProps.setPage).toHaveBeenCalledWith(2);
});

it('calls setPageSize when changing the page size', () => {
  render(<ReviewList {...defaultProps} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: '3' } });

  expect(defaultProps.setPageSize).toHaveBeenCalledWith(3);
});

it('disables the page size select when loading', () => {
  render(<ReviewList {...defaultProps} loading />);

  expect(screen.getByRole('combobox')).toBeDisabled();
});
