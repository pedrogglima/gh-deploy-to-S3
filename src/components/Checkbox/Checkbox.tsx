import React from 'react';

type Props = {
  /** Should this be checked ? */
  checked: boolean;

  indeterminate?: boolean;

  /** What name should this checkbox have? */
  name?: string;

  id?: string;

  /** What variant is this component? */
  variant?: 'checkbox' | 'radio' | 'toggle';

  /** What label should this checkbox have? */
  label?: string;

  /** The description of this component */
  description?: string;

  className?: string;

  /** What happens when you check this ? */
  onChange?: (event: any) => void;
};

const Checkbox = (props: Props): JSX.Element => {
  const id = props.id || 'xxx'; // FIXME Generate id randomnly

  let computedStyles: string[] = [];

  if (props.indeterminate) {
    computedStyles = computedStyles.concat(
      `nyx-${props.variant}__indeterminate`,
    );
  }

  if (props.className) {
    computedStyles = computedStyles.concat(props.className);
  }

  return (
    <span className="nyx-selectable-input">
      <label className={`nyx-${props.variant}`}>
        <input
          id={id}
          type={props.variant === 'toggle' ? 'checkbox' : props.variant}
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
          readOnly={!props.onChange}
          className={`nyx-${props.variant}--input ` + computedStyles.join(' ')}
        />
        {props.variant === 'toggle' && <span className="slider"></span>}
      </label>
      {props.label && (
        <label htmlFor={id} className={`nyx-${props.variant}--label`}>
          {props.label}
          {props.description && (
            <span className={`nyx-${props.variant}--description`}>
              {props.description}
            </span>
          )}
        </label>
      )}
    </span>
  );
};

export default Checkbox;
