import type { NextApiRequest, NextApiResponse } from 'next';

import { Review } from '@/data/reviews/types';
import { addReview } from '@/data/reviews';

export const MAX_REVIEW_LENGTH = 2000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review>,
) {
  if (req.method === 'POST') {
    const { author, rating, review: reviewText } = req.body;

    if (!author || !rating) {
      res.status(400).end();
      return;
    }

    const reviewLength = reviewText?.length ?? 0;
    if (reviewLength > MAX_REVIEW_LENGTH) {
      res.status(400).end();
      return;
    }

    const review = await addReview({ author, rating, review: reviewText });

    if (!review) {
      res.status(500).end();
      return;
    }

    res.status(200).json(review);
  } else {
    res.status(404).end();
  }
}
