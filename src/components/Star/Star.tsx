import cx from 'classnames';

export const STAR_SIZES = {
  small: 'text-base',
  medium: 'text-2xl',
  large: 'text-4xl',
} as const;

export type StarProps = {
  marked: boolean;
  starId: number;
  size?: keyof typeof STAR_SIZES;
};

const Star = ({ marked, starId, size = 'medium' }: StarProps) => {
  return (
    <span
      role="presentation"
      data-star-id={starId}
      className={cx(
        'cursor-pointer',
        'px-1',
        'm-0',
        'aspect-square',
        'select-none',
        STAR_SIZES[size],
      )}
    >
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};

Star.displayName = 'Star';
export default Star;
