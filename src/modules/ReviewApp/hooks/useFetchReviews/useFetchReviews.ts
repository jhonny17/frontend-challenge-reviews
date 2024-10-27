import { useEffect, useState, useMemo, useCallback } from 'react';

import { Review } from '@/data/reviews/types';

export type FetchReviewsProps = {
  page: number;
  pageSize?: number;
};

export const useFetchReviews = ({
  page = 1,
  pageSize = 5,
}: FetchReviewsProps) => {
  const [total, setTotal] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const fetchUrl = useMemo(() => {
    return `/api/reviews?page=${page}&pageSize=${pageSize}`;
  }, [page, pageSize]);

  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);

      try {
        const res = await fetch(fetchUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal,
        });
        const { data: fetchedReviews, meta } = await res.json();

        setTotal(prevTotal =>
          meta.total !== prevTotal ? meta.total : prevTotal,
        );

        setReviews(fetchedReviews);
      } catch (error: unknown) {
        // In a real-world application, we would handle the error
        // and provide feedback to the user. For this challenge,
        // we will simply ignore the error for simplicity.
      } finally {
        setLoading(false);
      }
    },
    [fetchUrl],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchUrl, fetchData, refreshIndex]);

  const refreshReviews = () => {
    setRefreshIndex(prevIndex => prevIndex + 1);
  };

  return { reviews, total, loading, refreshReviews };
};
