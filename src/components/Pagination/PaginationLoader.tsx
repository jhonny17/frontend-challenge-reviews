import cx from 'classnames';
import SkeletonLoader from '../SkeletonLoader';

export const PaginationLoader = () => (
  <div className={cx('flex', 'gap-2', 'justify-end')}>
    <SkeletonLoader className={cx('w-8', 'h-8')} />
    <SkeletonLoader className={cx('w-8', 'h-8')} />
    <SkeletonLoader className={cx('w-8', 'h-8')} />
    <SkeletonLoader className={cx('w-8', 'h-8')} />
  </div>
);
