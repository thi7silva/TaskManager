import { tv } from 'tailwind-variants';

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: `flex items-center justify-center gap-2 rounded-md px-3 text-xs font-semibold transition hover:opacity-75`,
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        ghost: 'text-brand-dark-gray bg-transparent',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        danger: 'bg-brand-danger text-brand-white',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  });

  return (
    <button
      className={button({ color, size, className, disabled: rest.disabled })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
