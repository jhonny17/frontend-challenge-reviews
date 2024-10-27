import { HTMLAttributes } from 'react';
import cx from 'classnames';

export type CardProps = HTMLAttributes<HTMLElement>;

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <section
      {...props}
      className={cx(
        'p-6',
        'border',
        'border-gray-200',
        'outline-none',
        'rounded-lg',
        'transition-colors',
        'appearance-none',
        'ring-offset-2',
        'focus:ring-2',
        'focus:ring-primary-200',
        'focus-visible:ring-2',
        'focus-visible:ring-primary-200',
        'focus:border-primary-500',
        'focus-visible:border-primary-500',
        className,
      )}
    >
      {children}
    </section>
  );
};

Card.displayName = 'Card';
export default Card;
