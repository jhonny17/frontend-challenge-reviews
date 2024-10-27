import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';

import NewReview, { MAX_REVIEW_LENGTH, NewReviewProps } from './NewReview';
import { Review } from '@/data/reviews';

const defaultProps: NewReviewProps = {
  handleSaveReview: jest.fn(),
};

const mockReview: Omit<Review, 'id'> = {
  rating: 5,
  author: 'John Doe',
  review: 'Great!',
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders NewReview', () => {
  render(<NewReview {...defaultProps} />);

  expect(
    screen.getByRole('heading', { level: 2, name: 'Rate & Share' }),
  ).toBeInTheDocument();

  expect(screen.getByLabelText('Name *')).toBeInTheDocument();

  expect(screen.getByLabelText('Rating')).toBeInTheDocument();

  const stars = screen.getAllByRole('radio');
  expect(stars).toHaveLength(5);

  expect(screen.getByLabelText('Review')).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Submit review' }),
  ).toBeInTheDocument();
});

it('submits review', async () => {
  render(<NewReview {...defaultProps} />);

  const nameInput = screen.getByLabelText('Name *') as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: mockReview.author } });

  const reviewInput = screen.getByLabelText('Review') as HTMLTextAreaElement;
  fireEvent.change(reviewInput, { target: { value: mockReview.review } });

  const stars = screen.getAllByRole('radio');
  act(() => {
    fireEvent.click(stars[4]);
  });

  await waitFor(() => {
    stars.forEach((star, i) => {
      expect(star).toHaveAttribute('aria-checked', 'true');
    });
  });

  const submitButton = screen.getByRole('button', {
    name: 'Submit review',
  });

  act(() => {
    fireEvent.click(submitButton);
  });

  expect(defaultProps.handleSaveReview).toHaveBeenCalledWith(mockReview);
});

it('validates review', async () => {
  render(<NewReview {...defaultProps} />);

  const submitButton = screen.getByRole('button', {
    name: 'Submit review',
  });

  act(() => {
    fireEvent.click(submitButton);
  });

  expect(defaultProps.handleSaveReview).not.toHaveBeenCalled();

  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Rating is required')).toBeInTheDocument();
});

it('validates review length', async () => {
  render(<NewReview {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  act(() => {
    fireEvent.click(stars[4]);
  });

  await waitFor(() => {
    stars.forEach((star, i) => {
      expect(star).toHaveAttribute('aria-checked', 'true');
    });
  });

  const nameInput = screen.getByLabelText('Name *') as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: mockReview.author } });

  const reviewInput = screen.getByLabelText('Review') as HTMLTextAreaElement;
  fireEvent.change(reviewInput, {
    target: { value: 'a'.repeat(MAX_REVIEW_LENGTH + 1) },
  });

  const submitButton = screen.getByRole('button', {
    name: 'Submit review',
  });

  act(() => {
    fireEvent.click(submitButton);
  });

  expect(defaultProps.handleSaveReview).not.toHaveBeenCalled();

  expect(
    screen.getByText(`Review must of ${MAX_REVIEW_LENGTH} characters or less`),
  ).toBeInTheDocument();
});
