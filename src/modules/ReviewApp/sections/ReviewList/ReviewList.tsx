import { ChangeEvent } from 'react';
import cx from 'classnames';

import { Review as ReviewType } from '@/data/reviews';
import Review, { ReviewLoader } from '@/components/Review';
import Pagination, { PaginationLoader } from '@/components/Pagination';

import { PAGE_SIZE_OPTIONS } from '../../constants';

export type ReviewListProps = {
  reviews: ReviewType[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

const ReviewList = ({
  reviews,
  total,
  page,
  pageSize,
  loading,
  setPage,
  setPageSize,
}: ReviewListProps) => {
  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (loading) return;
    setPageSize(+event.target.value);
  };

  return (
    <section className={cx('w-full', 'flex', 'flex-col', 'gap-4')}>
      <h2>Reviews ({total} total)</h2>

      <div className={cx('flex', 'justify-between', 'items-center')}>
        <div className={cx('flex', 'justify-between', 'items-center', 'gap-2')}>
          <label htmlFor="pageSize">Items per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            disabled={loading}
            onChange={handlePageSizeChange}
            className={cx('p-2', 'border', 'border-gray-200', 'rounded', {
              'cursor-not-allowed': loading,
            })}
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <PaginationLoader />
        ) : (
          <Pagination
            currentPage={page}
            pageSize={pageSize}
            totalElements={total}
            onPageChange={setPage}
          />
        )}
      </div>

      <div className={cx('flex', 'flex-col', 'gap-2', 'md:min-h-96')}>
        {loading
          ? Array.from({ length: pageSize }).map((_, index) => (
              <ReviewLoader key={index} />
            ))
          : reviews.map(review => <Review key={review.id} review={review} />)}
      </div>
    </section>
  );
};

ReviewList.displayName = 'ReviewList';
export default ReviewList;
