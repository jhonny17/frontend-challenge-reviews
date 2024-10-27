import cx from 'classnames';

export type SkeletonLoaderProps = {
  className?: string;
};

const SkeletonLoader = ({ className }: SkeletonLoaderProps) => (
  <div
    className={cx('bg-neutral-200', 'animate-pulse', 'rounded-sm', className)}
  />
);

SkeletonLoader.displayName = 'SkeletonLoader';
export default SkeletonLoader;
