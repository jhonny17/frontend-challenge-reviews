import cx from 'classnames';

const ReviewApp = () => {
  return (
    <div
      className={cx(
        'p-4',
        'md:p-8',
        'max-w-[1440px]',
        'self-center',
        'w-full',
        'flex',
        'flex-col',
        'items-start',
        'md:flex-row',
        'gap-8',
        'md:gap-4',
      )}
    >
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
