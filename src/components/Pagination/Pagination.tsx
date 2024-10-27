import cx from 'classnames';
import { useEffect } from 'react';

export type PaginationProps = {
  pageSize: number;
  totalElements: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const ELLIPSIS_BUFFER = 2;
export const MAX_PAGES_TO_SHOW = 7;

const Pagination = ({
  pageSize,
  currentPage,
  onPageChange,
  totalElements,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));
  const selectedPage = Math.min(Math.max(currentPage, 1), totalPages);

  useEffect(() => {
    if (currentPage === selectedPage) return;
    onPageChange(selectedPage);
  }, [selectedPage, currentPage, onPageChange]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === selectedPage) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const addPageButton = (page: number) => (
      <button
        key={page}
        className={cx(
          'px-2',
          'py-1',
          'border',
          'border-gray-300',
          'rounded',
          'hover:bg-primary-100',
          'transition-colors',
          'appearance-none',
          'outline-none',
          'ring-offset-2',
          'focus:ring-2',
          'focus:ring-primary-200',
          'focus:border-primary-500',
          'focus-visible:ring-2',
          'focus-visible:ring-primary-200',
          'focus-visible:border-primary-500',
          'transition',
          'duration-200',
          {
            'bg-primary-500 text-white': page === selectedPage,
          },
        )}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );

    const addEllipsis = (key: string) => (
      <span key={key} className="px-2 py-1 text-gray-500">
        ...
      </span>
    );

    if (totalPages <= MAX_PAGES_TO_SHOW) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(addPageButton(i));
      }
    } else {
      const start = Math.max(2, selectedPage - ELLIPSIS_BUFFER);
      const end = Math.min(totalPages - 1, selectedPage + ELLIPSIS_BUFFER);

      pageNumbers.push(addPageButton(1));

      if (start > 2) pageNumbers.push(addEllipsis('start-ellipsis'));

      for (let i = start; i <= end; i++) {
        pageNumbers.push(addPageButton(i));
      }

      if (end < totalPages - 1) pageNumbers.push(addEllipsis('end-ellipsis'));

      pageNumbers.push(addPageButton(totalPages));
    }

    return pageNumbers;
  };

  return (
    <div className={cx('flex', 'gap-2', 'justify-end')}>
      {renderPageNumbers()}
    </div>
  );
};

Pagination.displayName = 'Pagination';
export default Pagination;
