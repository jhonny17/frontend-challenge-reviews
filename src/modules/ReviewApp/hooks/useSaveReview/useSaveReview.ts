import { Review } from '@/data/reviews/types';

export const useSaveReview = () => {
  const handleSaveReview = async (review: Omit<Review, 'id'>) => {
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });

      if (!res.ok) {
        throw new Error('Failed to save review');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSaveReview };
};
