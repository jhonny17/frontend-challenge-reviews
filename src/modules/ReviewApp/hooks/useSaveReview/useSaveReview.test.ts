import { renderHook, waitFor, act } from '@testing-library/react';
import { useSaveReview } from './useSaveReview';
import { Review } from '@/data/reviews';

const mockFetch = jest.fn();
const originalFetch = global.fetch;

const defaultReview: Omit<Review, 'id'> = {
  rating: 5,
  author: 'John Doe',
  review: 'Great!',
};

beforeAll(() => {
  global.fetch = mockFetch;
});

afterAll(() => {
  global.fetch = originalFetch;
});

beforeEach(() => {
  jest.clearAllMocks();

  mockFetch.mockResolvedValue({
    ok: true,
  });
});

it('saves review', async () => {
  const { result } = renderHook(() => useSaveReview());

  await act(async () => {
    await result.current.handleSaveReview(defaultReview);
  });

  expect(mockFetch).toHaveBeenCalledWith('/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(defaultReview),
  });
});

it('handles save review error', async () => {
  const mockedConsoleError = jest.spyOn(console, 'error');
  const { result } = renderHook(() => useSaveReview());

  mockFetch.mockResolvedValue({
    ok: false,
  });

  await act(async () => {
    await result.current.handleSaveReview(defaultReview);
  });

  expect(mockFetch).toHaveBeenCalledWith('/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(defaultReview),
  });
  expect(mockedConsoleError).toHaveBeenCalledWith(
    new Error('Failed to save review'),
  );
});
