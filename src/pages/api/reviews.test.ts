import { createMocks } from 'node-mocks-http';

import { Review } from '@/data/reviews/types';

import handler from './reviews';

const mockedReviews: Review[] = [
  { id: 1, rating: 5, review: 'Great!', author: 'John Doe' },
  { id: 2, rating: 3, review: 'Good', author: 'Jane Doe' },
  { id: 3, rating: 4, review: 'Nice', author: 'John Smith' },
  { id: 4, rating: 2, review: 'Bad', author: 'Jane Smith' },
];
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

it('returns 404 for unsupported methods', async () => {
  const { req, res } = createMocks({
    method: 'PATCH',
  });

  await handler(req, res);
});

it('returns default page size if not provided', async () => {
  const { req, res } = createMocks({
    method: 'GET',
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);

  expect(res._getJSONData()).toEqual({
    data: mockedReviews.slice(0, 2),
    meta: {
      page: 1,
      pageSize: 2,
      total: 4,
    },
  });
});

it('returns custom page size if provided', async () => {
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      pageSize: '3',
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    data: mockedReviews.slice(0, 3),
    meta: {
      page: 1,
      pageSize: 3,
      total: 4,
    },
  });
});

it('returns 200 and the max page size for outbound page size', async () => {
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      pageSize: '6',
    },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    data: mockedReviews,
    meta: {
      page: 1,
      pageSize: 5,
      total: 4,
    },
  });
});

it('returns 200 and the reviews', async () => {
  const { req, res } = createMocks({
    method: 'GET',
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toEqual({
    data: mockedReviews.slice(0, 2),
    meta: {
      page: 1,
      pageSize: 2,
      total: 4,
    },
  });
});
