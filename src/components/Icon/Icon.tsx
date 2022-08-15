import React from 'react';

type Props = {
  /** What icon are you looking for ? */
  icon: string;

  /** What theme do you want for your icon ? */
  theme?: 'dark';

  /** What color do you want for your icon ? */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  /** The size of your icon */
  size?: 'small' | 'medium' | 'large';

  className?: string;
  onClick?: (event: any) => void;
};

const Icon = (props: Props): JSX.Element => {
  let computedStyles: string[] = [`nyx-icon--${props.icon}`];

  if (props.size) {
    computedStyles = computedStyles.concat(`nyx-icon__${props.size}`);
  }

  if (props.theme) {
    computedStyles = computedStyles.concat(`nyx-icon__${props.theme}`);
  }

  if (props.color) {
    computedStyles = computedStyles.concat(`nyx-icon__${props.color}`);
  }

  if (props.className) {
    computedStyles = computedStyles.concat(props.className);
  }

  return (
    <i
      onClick={props.onClick}
      className={'nyx-icon ' + computedStyles.join(' ')}
    />
  );
};

export default Icon;
