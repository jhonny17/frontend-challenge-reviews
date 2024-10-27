import { createMocks } from 'node-mocks-http';

import { Review } from '@/data/reviews/types';

import handler, { MAX_REVIEW_LENGTH } from './review';

const mockedReviews: Review[] = [];
const mockedRead = jest.fn();
const mockedWrite = jest.fn();

const review: Omit<Review, 'id'> = {
  author: 'John Doe',
  rating: 5,
  review: 'Great!',
};

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

it('returns 404 for unsupported methods', async () => {
  const { req, res } = createMocks({
    method: 'PATCH',
  });

  await handler(req, res);
});

it('returns 400 for missing author or rating', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {},
  });

  await handler(req, res);

  expect(res.statusCode).toBe(400);
});

it('returns 400 for review text exceeding the limit', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      ...review,
      review: 'a'.repeat(MAX_REVIEW_LENGTH + 1),
    },
  });

  await handler(req, res);

  expect(res.statusCode).toBe(400);
});

it('returns 500 when review cannot be added', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: review,
  });

  mockedWrite.mockRejectedValueOnce(new Error('Failed to write'));

  await handler(req, res);

  expect(res.statusCode).toBe(500);
});

it('adds a review', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: review,
  });

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual(expect.objectContaining(review));
});

it('adds a review with an empty review text', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      ...review,
      review: null,
    },
  });

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual(
    expect.objectContaining({
      ...review,
      review: null,
    }),
  );
});
