import React from 'react';

interface ButtonProps {
  /**
   * What variant of button to use?
   */
  variant?: 'filled' | 'outlined';
  /**
   * What background color to use
   */
  color?: 'default' | 'primary' | 'secondary';
  /**
   * How large should the button be?
   */
  size?: 'x-small' | 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Should the button be disabled?
   */
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: (event: any) => void,
  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  variant = 'filled',
  size = 'medium',
  color = 'primary',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        'nyx-button',
        `nyx-button__${size}`,
        `nyx-button__${color}`,
        variant === 'filled' ? 'nyx-button__filled ' : 'nyx-button__outlined',
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
