import { screen, render, act, fireEvent } from '@testing-library/react';

import { STAR_SIZES } from '@/components/Star';

import StarRating, {
  DEFAULT_NUMBER_STARS,
  StarRatingProps,
} from './StarRating';

const defaultProps: StarRatingProps = {
  rate: 0,
  size: 'large',
  readonly: false,
  maxStars: DEFAULT_NUMBER_STARS,
  onRatingChange: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders the default number of stars', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  expect(stars).toHaveLength(DEFAULT_NUMBER_STARS);
});

it('renders the correct number of stars', () => {
  const numberOfStars = 7;
  render(<StarRating {...defaultProps} maxStars={numberOfStars} />);

  const stars = screen.getAllByRole('radio');
  expect(stars).toHaveLength(numberOfStars);
});

it('renders the correct size of stars', () => {
  const size = 'small';
  render(<StarRating {...defaultProps} size={size} />);

  const stars = screen.getAllByRole('radio');
  stars.forEach(star => {
    // The stars are wrapped in a false radio
    expect(star.children[0]).toHaveClass(STAR_SIZES[size]);
  });
});

it('renders the correct rating', () => {
  const rate = 3;
  render(<StarRating {...defaultProps} rate={rate} />);

  const stars = screen.getAllByRole('radio');
  stars.forEach((star, index) => {
    if (index < rate) {
      expect(star).toBeChecked();
    } else {
      expect(star).not.toBeChecked();
    }
  });
});

it('calls onRatingChange when a star is clicked', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.click(star);

  const id = +star.dataset.starId!;
  expect(defaultProps.onRatingChange).toHaveBeenCalledTimes(1);
  expect(defaultProps.onRatingChange).toHaveBeenCalledWith(id);
});

it('does not call onRatingChange when the component is readonly', () => {
  render(<StarRating {...defaultProps} readonly />);

  const stars = screen.getAllByRole('radio');
  fireEvent.click(stars[2]);

  expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
});

it('marks the correct star when the mouse enters', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.mouseEnter(star);

  expect(star).toBeChecked();
  expect(star.children[0].textContent).toBe('\u2605');

  expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
});

it('unmarks a star when the mouse leaves', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.mouseEnter(star);

  expect(star).toBeChecked();
  expect(star.children[0].textContent).toBe('\u2605');
  expect(defaultProps.onRatingChange).not.toHaveBeenCalled();

  fireEvent.mouseLeave(star);

  expect(star).not.toBeChecked();
  expect(star.children[0].textContent).toBe('\u2606');
});

it('marks a star when the space key is pressed', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.focus(star);
  fireEvent.keyDown(star, { key: ' ' });

  expect(star).toBeChecked();
  expect(star.children[0].textContent).toBe('\u2605');

  const id = +star.dataset.starId!;
  expect(defaultProps.onRatingChange).toHaveBeenCalledTimes(1);
  expect(defaultProps.onRatingChange).toHaveBeenCalledWith(id);
});

const previousTestCases = ['Up', 'ArrowUp', 'Left', 'ArrowLeft'];

it('marks the previous star when the correct key is pressed', () => {
  previousTestCases.forEach(key => {
    render(<StarRating {...defaultProps} />);

    const stars = screen.getAllByRole('radio');
    const star = stars[2];

    fireEvent.focus(star);
    fireEvent.keyDown(star, { key });

    const previousStar = stars[1];
    expect(previousStar).toBeChecked();
    expect(previousStar.children[0].textContent).toBe('\u2605');

    const id = +previousStar.dataset.starId!;
    expect(defaultProps.onRatingChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onRatingChange).toHaveBeenCalledWith(id);

    expect(star).not.toBeChecked();
    expect(star.children[0].textContent).toBe('\u2606');
  });
});

it('does not mark the previous star when the first star is focused', () => {
  previousTestCases.forEach(key => {
    render(<StarRating {...defaultProps} rate={1} />);

    const stars = screen.getAllByRole('radio');
    const star = stars[0];

    fireEvent.focus(star);
    fireEvent.keyDown(star, { key });

    expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
  });
});

const nextTestCases = ['Down', 'ArrowDown', 'Right', 'ArrowRight'];

it('marks the next star when the correct key is pressed', () => {
  nextTestCases.forEach(key => {
    render(<StarRating {...defaultProps} />);

    const stars = screen.getAllByRole('radio');
    const star = stars[2];

    fireEvent.focus(star);
    fireEvent.keyDown(star, { key });

    const nextStar = stars[3];
    expect(nextStar).toBeChecked();
    expect(nextStar.children[0].textContent).toBe('\u2605');

    const id = +nextStar.dataset.starId!;
    expect(defaultProps.onRatingChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onRatingChange).toHaveBeenCalledWith(id);

    expect(star).toBeChecked();
    expect(star.children[0].textContent).toBe('\u2605');
  });
});

it('does not mark the next star when the last star is focused', () => {
  nextTestCases.forEach(key => {
    render(<StarRating {...defaultProps} rate={5} />);

    const stars = screen.getAllByRole('radio');
    const star = stars[stars.length - 1];

    fireEvent.focus(star);
    fireEvent.keyDown(star, { key });

    expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
  });
});

it('marks the current star when the space key is pressed', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.focus(star);
  fireEvent.keyDown(star, { key: ' ' });

  expect(star).toBeChecked();
  expect(star.children[0].textContent).toBe('\u2605');

  const id = +star.dataset.starId!;
  expect(defaultProps.onRatingChange).toHaveBeenCalledTimes(1);
  expect(defaultProps.onRatingChange).toHaveBeenCalledWith(id);
});

it('does not mark a star when the component is readonly', () => {
  render(<StarRating {...defaultProps} readonly />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.focus(star);
  fireEvent.keyDown(star, { key: ' ' });

  expect(star).not.toBeChecked();
  expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
});

it('does not mark a star when the component is readonly', () => {
  render(<StarRating {...defaultProps} readonly />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.mouseEnter(star);

  expect(star).not.toBeChecked();
  expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
});

it('does nothing when an invalid key is pressed', () => {
  render(<StarRating {...defaultProps} />);

  const stars = screen.getAllByRole('radio');
  const star = stars[2];

  fireEvent.focus(star);
  fireEvent.keyDown(star, { key: 'Enter' });

  expect(star).not.toBeChecked();
  expect(defaultProps.onRatingChange).not.toHaveBeenCalled();
});
