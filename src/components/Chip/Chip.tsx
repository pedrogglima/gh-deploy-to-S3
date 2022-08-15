import React from 'react';
import Icon from 'components/Icon';

interface ChipProps {
  /**
   * What background color to use
   */
  color?: 'success' | 'error' | 'warning';
  /**
   * Chip size
   */
  size: 'small' | string;
  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Optional delete handler
   */
  onDismiss?: (e: any) => void;
  /**
   * Should this chip be disabled?
   */
  disabled?: boolean;

  children: React.ReactNode;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
const Chip = ({ color, size, className, onDismiss, disabled, ...props }: ChipProps) => {
  let computedStyles: string[] = [];

  if (color) {
    computedStyles = computedStyles.concat(`nyx-chip__${color}`);
  }

  if (size) {
    computedStyles = computedStyles.concat(`nyx-chip__${size}`);
  }

  if (disabled) {
    computedStyles = computedStyles.concat('nyx-chip__disabled');
  }

  if (className) {
    computedStyles = computedStyles.concat(className);
  }
  return (
    <span className={'nyx-chip ' + computedStyles.join(' ')} {...props}>
      {props.children}
      {onDismiss && (
        <Icon
          icon="close"
          className="nyx-chip--icon"
          onClick={onDismiss}
          color={color}
        />
      )}
    </span>
  );
};

export default Chip;
