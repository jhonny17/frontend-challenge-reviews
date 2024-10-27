import { FormEventHandler, useRef, useState } from 'react';
import cx from 'classnames';

import Card from '@/components/Card';
import Button from '@/components/Button';
import StarRating from '@/components/StarRating';

import { Review as ReviewType } from '@/data/reviews';

export const REVIEW_ROWS = 3;
export const MAX_REVIEW_LENGTH = 2000;

export const INPUT_NAMES = ['author', 'review', 'rating'] as const;

export type ErrorDictionary = Partial<
  Record<(typeof INPUT_NAMES)[number], string>
>;

export type NewReviewProps = {
  handleSaveReview: (review: Omit<ReviewType, 'id'>) => void;
};

const NewReview = ({ handleSaveReview }: NewReviewProps) => {
  const [rating, setRating] = useState<number>(0);
  const authorRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);

  const [errors, setErrors] = useState<ErrorDictionary>({});

  const updateStarRating = (rating: number) => {
    setRating(rating);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setErrors({});

    const author = authorRef.current?.value;
    const review = reviewRef.current?.value || null;

    let errors = false;

    if (!author) {
      errors = true;
      setErrors(prev => ({ ...prev, author: 'Name is required' }));
    }

    if (!rating || rating === 0) {
      errors = true;
      setErrors(prev => ({
        ...prev,
        rating: 'Rating is required',
      }));
      return;
    }

    if (review && review.length > MAX_REVIEW_LENGTH) {
      errors = true;
      setErrors(prev => ({
        ...prev,
        review: `Review must of ${MAX_REVIEW_LENGTH} characters or less`,
      }));
      return;
    }

    if (errors) return;

    handleSaveReview({ author: author!, review, rating });

    authorRef.current!.value = '';
    reviewRef.current!.value = '';
    setRating(0);
    setErrors({});
  };

  return (
    <Card
      className={cx(
        'flex',
        'flex-col',
        'gap-2',
        'md:gap-4',
        'w-full',
        'md:max-w-xs',
      )}
    >
      <h2>Rate & Share</h2>

      <form
        noValidate
        name="New Review"
        onSubmit={handleSubmit}
        className={cx('flex', 'flex-col', 'gap-2', 'md:gap-4', 'w-full')}
      >
        <div className="self-center">
          <StarRating
            size="large"
            rate={rating}
            onRatingChange={updateStarRating}
          />
          {errors.rating && (
            <div
              id="review-error"
              role="alert"
              className={cx('text-red-500', 'text-sm', 'text-center')}
            >
              {errors.rating}
            </div>
          )}
        </div>

        <div className="grid">
          <label htmlFor="name" className="mb-3">
            Name *
          </label>
          <input
            required
            type="text"
            id="name"
            name="author"
            aria-describedby="author-error"
            ref={authorRef}
          />
          {errors.author && (
            <div
              id="author-error"
              role="alert"
              className={cx('text-red-500', 'text-sm')}
            >
              {errors.author}
            </div>
          )}
        </div>

        <div className="grid">
          <label htmlFor="review" className="mb-3">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            ref={reviewRef}
            rows={REVIEW_ROWS}
            className="resize-none"
            aria-describedby="review-error"
            maxLength={MAX_REVIEW_LENGTH}
          ></textarea>
          {errors.review && (
            <div
              id="review-error"
              role="alert"
              className={cx('text-red-500', 'text-sm')}
            >
              {errors.review}
            </div>
          )}
        </div>

        <Button type="submit">Submit review</Button>
      </form>
    </Card>
  );
};

NewReview.displayName = 'NewReview';
export default NewReview;
