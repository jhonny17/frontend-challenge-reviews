import { addReview, getReviews } from './reviews';
import { Review } from './types';

const mockedReviews: Review[] = [];
const mockedRead = jest.fn();
const mockedWrite = jest.fn();

jest.mock('lowdb/node', () => {
  return {
    JSONFilePreset: jest.fn().mockImplementation(() => {
      return {
        data: { reviews: mockedReviews },
        read: mockedRead,
        write: mockedWrite,
      };
    }),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getReviews', () => {
  it('returns the reviews from the database', async () => {
    const data = await getReviews(1, 2);

    expect(data).toStrictEqual({
      data: [],
      meta: { page: 1, pageSize: 2, total: 0 },
    });
  });

  it('returns an empty array when an error occurs', async () => {
    mockedRead.mockRejectedValueOnce(new Error('Failed to read'));

    const data = await getReviews(1, 2);

    expect(data).toStrictEqual({
      data: [],
      meta: { page: 1, pageSize: 2, total: 0 },
    });
  });
});

describe('addReview', () => {
  it('adds a review to the database', async () => {
    const review = { rating: 5, review: 'Great!', author: 'John Doe' };

    const data = await addReview(review);

    expect(data).toStrictEqual({ id: 1, ...review });
    expect(mockedWrite).toHaveBeenCalledTimes(1);
  });

  it('returns null when an error occurs', async () => {
    mockedWrite.mockRejectedValueOnce(new Error('Failed to write'));

    const data = await addReview({
      rating: 5,
      review: 'Great!',
      author: 'John Doe',
    });

    expect(mockedWrite).toHaveBeenCalledTimes(1);
    expect(data).toBeNull();
  });
});
