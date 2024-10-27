import type { NextApiRequest, NextApiResponse } from 'next';

import { Review } from '@/data/reviews/types';
import { getReviews } from '@/data/reviews';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 2;
const MAX_PAGE_SIZE = 5;

const setPageSize = (input: number | null | undefined) => {
  if (!input) {
    return DEFAULT_PAGE_SIZE;
  }

  if (input > MAX_PAGE_SIZE) {
    return MAX_PAGE_SIZE;
  }

  return input;
};

const parseNumberInput = (input: any) => {
  if (!input) return null;

  try {
    return parseInt(input);
  } catch {
    return null;
  }
};

type Meta = {
  page: number;
  pageSize: number;
  total: number;
};

type ReviewResponse = {
  data: Review[];
  meta: Meta;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewResponse>,
) {
  if (req.method === 'GET') {
    const page = parseNumberInput(req.query.page) || DEFAULT_PAGE_NUMBER;
    const pageSize = setPageSize(parseNumberInput(req.query.pageSize));

    const dataset = await getReviews(page, pageSize);

    res.status(200).json(dataset);
  } else {
    res.status(404);
  }
}
