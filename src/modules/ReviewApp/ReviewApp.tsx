import { useState } from 'react';
import cx from 'classnames';

import NewReview from './sections/NewReview';
import ReviewList from './sections/ReviewList';

import { useSaveReview } from './hooks/useSaveReview';
import { useFetchReviews } from './hooks/useFetchReviews';

import { Review as ReviewType } from '@/data/reviews';

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from './constants';

const ReviewApp = () => {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { handleSaveReview } = useSaveReview();
  const { reviews, total, loading, refreshReviews } = useFetchReviews({
    page,
    pageSize,
  });

  const saveReview = async (review: Omit<ReviewType, 'id'>) => {
    await handleSaveReview(review);
    refreshReviews();
  };

  return (
    <div
      className={cx(
        'p-4',
        'md:p-8',
        'max-w-[1440px]',
        'self-center',
        'w-full',
        'flex',
        'flex-col',
        'items-start',
        'md:flex-row',
        'gap-8',
        'md:gap-4',
      )}
    >
      <NewReview handleSaveReview={saveReview} />
      <ReviewList
        page={page}
        total={total}
        loading={loading}
        reviews={reviews}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
