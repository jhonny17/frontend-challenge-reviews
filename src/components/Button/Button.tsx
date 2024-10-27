import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ type = 'button', className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx(
        'rounded',
        'transition-colors',
        'appearance-none',
        'ring-offset-2',
        'focus:ring-2',
        'focus:ring-primary-200',
        'focus-visible:ring-2',
        'focus-visible:ring-primary-200',
        'text-center',
        'w-full',
        'px-4',
        'py-3',
        'text-center',
        'outline-none',
        'border-0',
        'text-white',
        'bg-primary-700',
        'hover:bg-primary-900',
        'cursor-pointer',
        'text-base',
        'font-bold',
      )}
    />
  );
};

Button.displayName = 'Button';
export default Button;
