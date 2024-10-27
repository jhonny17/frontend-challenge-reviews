import { JSONFilePreset } from 'lowdb/node';

import { Review, ReviewData } from './types';

export const filePath = './src/data/reviews/reviews.json';

const getDatabase = async () => {
  const defaultData: ReviewData = { reviews: [] };
  return await JSONFilePreset<ReviewData>(filePath, defaultData);
};

export const getReviews = async (page: number, pageSize: number) => {
  try {
    const db = await getDatabase();

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const total = db.data.reviews.length;
    const reviews = db.data.reviews.slice(start, end);

    return { data: reviews, meta: { page, pageSize, total } };
  } catch (error) {
    return { data: [], meta: { page, pageSize, total: 0 } };
  }
};

export const addReview = async (review: Omit<Review, 'id'>) => {
  try {
    const db = await getDatabase();
    const lastId = db.data.reviews[db.data.reviews.length - 1]?.id || 0;

    const data: Review = {
      id: lastId + 1,
      ...review,
    };

    db.data.reviews.push(data);
    await db.write();

    return data;
  } catch (error) {
    return null;
  }
};
