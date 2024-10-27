import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetchReviews } from './useFetchReviews';

const mockFetch = jest.fn();
const abortedFetch = jest.fn();
const originalFetch = global.fetch;

const mockedData = {
  data: [
    { id: 1, rating: 5, comment: 'Great!' },
    { id: 2, rating: 3, comment: 'Good' },
  ],
  meta: { total: 2 },
};

beforeAll(() => {
  global.fetch = mockFetch;
});

afterAll(() => {
  global.fetch = originalFetch;
});

beforeEach(() => {
  jest.clearAllMocks();

  mockFetch.mockImplementation((url: string, options: RequestInit) => {
    options.signal?.addEventListener('abort', () => {
      const message = 'Fetch was aborted';
      abortedFetch(message);
    });

    return Promise.resolve({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedData),
    });
  });
});

it('fetches reviews', async () => {
  const { result } = renderHook(() => useFetchReviews({ page: 1 }));

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.reviews).toEqual(mockedData.data);
  expect(result.current.total).toBe(mockedData.meta.total);
});

it('aborts fetch on unmount', async () => {
  const { unmount } = renderHook(() => useFetchReviews({ page: 1 }));

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalled();
  });

  unmount();

  expect(abortedFetch).toHaveBeenCalled();
});

it('fetches reviews with custom page size', async () => {
  const { result } = renderHook(() =>
    useFetchReviews({ page: 1, pageSize: 10 }),
  );

  await waitFor(() => {
    expect(result.current.reviews).toEqual(mockedData.data);
    expect(result.current.total).toBe(mockedData.meta.total);
  });
});

it('fetches reviews on page change', async () => {
  const { result, rerender } = renderHook(
    ({ page }) => useFetchReviews({ page }),
    { initialProps: { page: 1 } },
  );

  await waitFor(() => {
    expect(result.current.reviews).toEqual(mockedData.data);
    expect(result.current.total).toBe(mockedData.meta.total);
  });

  const newMockedData = {
    data: [
      { id: 3, rating: 4, comment: 'Not bad' },
      { id: 4, rating: 2, comment: 'Bad' },
    ],
    meta: { total: 4 },
  };

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValue(newMockedData),
  });

  rerender({ page: 2 });

  await waitFor(() => {
    expect(result.current.reviews).toEqual(newMockedData.data);
    expect(result.current.total).toBe(newMockedData.meta.total);
  });
});

it('fetches reviews on refresh', async () => {
  const { result } = renderHook(() => useFetchReviews({ page: 1 }));

  await waitFor(() => {
    expect(result.current.reviews).toEqual(mockedData.data);
    expect(result.current.total).toBe(mockedData.meta.total);
  });

  const newMockedData = {
    data: [
      { id: 5, rating: 1, comment: 'Terrible' },
      { id: 6, rating: 3, comment: 'Not good' },
    ],
    meta: { total: 6 },
  };

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValue(newMockedData),
  });

  act(() => {
    result.current.refreshReviews();
  });

  await waitFor(() => {
    expect(result.current.reviews).toEqual(newMockedData.data);
    expect(result.current.total).toBe(newMockedData.meta.total);
  });
});

it('does not fetch reviews on refresh if loading', async () => {
  const { result } = renderHook(() => useFetchReviews({ page: 1 }));

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.reviews).toEqual(mockedData.data);
    expect(result.current.total).toBe(mockedData.meta.total);
  });

  expect(mockFetch).toHaveBeenCalledTimes(1);

  act(() => {
    result.current.refreshReviews();
  });

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
