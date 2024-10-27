import { render, screen, fireEvent } from '@testing-library/react';

import Pagination, { PaginationProps } from './Pagination';

const defaultProps: PaginationProps = {
  currentPage: 1,
  pageSize: 10,
  totalElements: 50,
  onPageChange: jest.fn(),
};

const largeNumberPageProps: PaginationProps = {
  currentPage: 1,
  pageSize: 10,
  totalElements: 500,
  onPageChange: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders correctly', () => {
  render(<Pagination {...defaultProps} />);
  for (let i = 1; i <= 5; i++) {
    expect(screen.getByText(i)).toBeInTheDocument();
  }
});

it('calls onPageChange with the correct page number', () => {
  const pageNumber = 2;
  render(<Pagination {...defaultProps} />);

  const page = screen.getByRole('button', { name: pageNumber.toString() });

  fireEvent.click(page);

  expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
  expect(defaultProps.onPageChange).toHaveBeenCalledWith(pageNumber);
});

it('does not call onPageChange if the page is the same', () => {
  render(<Pagination {...defaultProps} />);

  const page = screen.getByRole('button', {
    name: defaultProps.currentPage.toString(),
  });

  fireEvent.click(page);

  expect(defaultProps.onPageChange).not.toHaveBeenCalled();
});

it('calls onPageChange with the last element if the page is out of bounds', () => {
  render(<Pagination {...defaultProps} currentPage={6} />);

  expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
  expect(defaultProps.onPageChange).toHaveBeenCalledWith(5);
});

it('calls onPageChange with the first element if the page is out of bounds', () => {
  render(<Pagination {...defaultProps} currentPage={0} />);

  expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
  expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
});

it('renders ellipsis when there are more than 5 pages', () => {
  render(<Pagination {...largeNumberPageProps} />);
  const ellipsis = screen.getByText('...');
  expect(ellipsis).toBeInTheDocument();
});

it('renders two ellipsis when the current page is in the middle', () => {
  render(<Pagination {...largeNumberPageProps} currentPage={25} />);
  const ellipsis = screen.getAllByText('...');
  expect(ellipsis).toHaveLength(2);
});

it('renders the first page when the current page is the last page', () => {
  render(<Pagination {...largeNumberPageProps} currentPage={50} />);
  const lastPage = screen.getByText('1');
  expect(lastPage).toBeInTheDocument();
});

it('renders the last page when the current page is the first page', () => {
  render(<Pagination {...largeNumberPageProps} currentPage={1} />);
  const firstPage = screen.getByText('50');
  expect(firstPage).toBeInTheDocument();
});
