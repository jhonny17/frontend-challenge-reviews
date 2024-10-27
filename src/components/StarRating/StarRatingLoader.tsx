import cx from 'classnames';

import SkeletonLoader from '../SkeletonLoader';
import { DEFAULT_NUMBER_STARS } from './StarRating';

export const StarRatingLoader = () => (
  <div className={cx('flex', 'gap-1')}>
    {Array.from({ length: DEFAULT_NUMBER_STARS }).map((_, index) => (
      <SkeletonLoader key={index} className={cx('w-6', 'h-6')} />
    ))}
  </div>
);
