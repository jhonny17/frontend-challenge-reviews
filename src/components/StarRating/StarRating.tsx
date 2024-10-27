import {
  KeyboardEventHandler,
  KeyboardEvent,
  useState,
  useEffect,
} from 'react';
import cx from 'classnames';

import Star, { STAR_SIZES } from '@/components/Star';
import { getRadioButtons } from '@/utils/getRadioButtons';

export const DEFAULT_NUMBER_STARS = 5;

export type StarRatingProps = {
  rate: number;
  readonly?: boolean;
  maxStars?: number;
  size?: keyof typeof STAR_SIZES;
  onRatingChange?: (rating: number) => void;
};

const StarRating = ({
  rate = 0,
  readonly = false,
  size = 'medium',
  maxStars = DEFAULT_NUMBER_STARS,
  onRatingChange,
}: StarRatingProps) => {
  const [rating, setRating] = useState<number>(rate);
  const [hoveredStarId, setHoveredStarId] = useState<number | null>(null);

  const handleRatingChange = (newRating: number) => {
    if (readonly || rating === newRating) return;
    setRating(newRating);
    onRatingChange?.(newRating);
  };

  useEffect(() => {
    handleRatingChange(rate);
  }, [rate]);

  const markNextStar = (
    starId: number,
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    const nextStarId = starId < maxStars ? starId + 1 : maxStars;

    const ratios = getRadioButtons(event);
    ratios[nextStarId - 1]?.focus();

    handleRatingChange(nextStarId);
  };

  const markPreviousStar = (
    starId: number,
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    const nextStarId = starId > 1 ? starId - 1 : 1;

    const ratios = getRadioButtons(event);
    ratios[nextStarId - 1]?.focus();

    handleRatingChange(nextStarId);
  };

  const handleKeydown =
    (starId: number): KeyboardEventHandler<HTMLDivElement> =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (readonly) return;

      switch (event.key) {
        case ' ':
          handleRatingChange(starId);
          break;

        case 'Up':
        case 'ArrowUp':
        case 'Left':
        case 'ArrowLeft':
          markPreviousStar(starId, event);
          break;

        case 'Down':
        case 'ArrowDown':
        case 'Right':
        case 'ArrowRight':
          markNextStar(starId, event);
          break;

        default:
          break;
      }
    };

  const handleMouseEnter = (starId: number) => {
    if (readonly) return;
    setHoveredStarId(starId);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoveredStarId(null);
  };

  return (
    <div
      role="radiogroup"
      data-rating-value={rating}
      aria-labelledby="rating-label"
      className={cx('flex', 'text-secondary-900')}
    >
      <div id="rating-label" className="hidden">
        Rating
      </div>

      {[...Array(maxStars)].map((_, i) => {
        const starId = i + 1;

        const isMarked = hoveredStarId
          ? starId <= hoveredStarId
          : starId <= rating;

        const tabIndex = (() => {
          if (readonly) return -1;
          if (rating === 0 && i === 0) return 0;
          if (starId === rating) return 0;
          return -1;
        })();

        return (
          <span
            role="radio"
            key={starId}
            tabIndex={tabIndex}
            aria-checked={isMarked}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeydown(starId)}
            onClick={() => handleRatingChange(starId)}
            onMouseEnter={() => handleMouseEnter(starId)}
            data-star-id={starId}
            aria-label={`${starId} star${starId > 1 ? 's' : ''}`}
            className={cx(
              'h-full',
              'rounded-md',
              'flex',
              'items-center',
              'justify-center',
              'outline-none',
              'focus:ring-2',
              'focus:ring-secondary-500',
              'focus-visible:ring-2',
              'focus-visible:ring-secondary-500',
              { 'pointer-events-none': readonly },
            )}
          >
            <Star starId={starId} size={size} marked={isMarked} />
          </span>
        );
      })}
    </div>
  );
};

StarRating.displayName = 'StarRating';
export default StarRating;
