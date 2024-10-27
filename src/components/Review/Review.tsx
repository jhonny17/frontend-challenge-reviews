import cx from 'classnames';

import { Review as ReviewType } from '@/data/reviews/types';

import StarRating from '../StarRating';
import Card from '../Card';

export type ReviewProps = {
  review: ReviewType;
};

const Review = ({ review }: ReviewProps) => {
  const { author, rating, review: reviewText } = review;

  return (
    <Card className={cx('grid', 'gap-2')} tabIndex={0}>
      <div className={cx('flex', 'gap-2', 'items-end')}>
        <StarRating rate={rating} readonly />
        <h3 className="text-lg">{author}</h3>
      </div>
      {reviewText && <p>{reviewText}</p>}
    </Card>
  );
};

Review.displayName = 'Review';
export default Review;
