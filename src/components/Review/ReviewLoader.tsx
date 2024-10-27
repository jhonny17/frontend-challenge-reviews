import cx from 'classnames';

import Card from '../Card';
import SkeletonLoader from '../SkeletonLoader';
import { StarRatingLoader } from '../StarRating';

export const ReviewLoader = () => (
  <Card className={cx('flex', 'flex-col', 'gap-2')}>
    <div className={cx('flex', 'gap-2')}>
      <StarRatingLoader />
      <SkeletonLoader className={cx('h-6', 'w-3/6')} />
    </div>

    <div className={cx('flex', 'flex-col', 'gap-1')}>
      <SkeletonLoader className={cx('h-4', 'w-full')} />
      <SkeletonLoader className={cx('h-4', 'w-full')} />
      <SkeletonLoader className={cx('h-4', 'w-full')} />
      <SkeletonLoader className={cx('h-4', 'w-full')} />
    </div>
  </Card>
);
