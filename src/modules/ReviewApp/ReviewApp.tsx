import cx from 'classnames';

import NewReview from './sections/NewReview';

import { useSaveReview } from './hooks/useSaveReview';

import { Review as ReviewType } from '@/data/reviews';

const ReviewApp = () => {
  const { handleSaveReview } = useSaveReview();
  const saveReview = async (review: Omit<ReviewType, 'id'>) => {
    await handleSaveReview(review);
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
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
