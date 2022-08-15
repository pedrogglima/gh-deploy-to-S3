import React from 'react';

type Props = {
  /**
   * Label contents
   */
  label?: string;
  /**
   * Label placeholder
   */
  placeholder?: string;
  /**
   * Do you need to specify anything about this input?
   */
  helpText?: string;
  value: any;
  /**
   * What type of input is this?
   */
  type?: 'text' | 'text-area';
  /**
   * Optional click handler
   */
  onChange?: (event: any) => void;
  /**
   * Optional focus handler
   */
  onFocus?: (event: any) => void;
  /**
   * Input error validation
   */
  error?: boolean;
  /**
   * Should the input be disabled?
   */
  disabled?: boolean;
  theme?: string;
  /**
   * Should the input be read only?
   */
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  /**
   * Do you want to display an icon at the beginning of the text field?
   */
  startAdornment?: JSX.Element;
  /**
   * Do you want to display an icon at the end of the text field?
   */
  endAdornment?: JSX.Element;
  'data-testid'?: string;
};

const Input = (props: Props): JSX.Element => {
  let rootStyles: string[] = [];
  let inputStyles: string[] = [];

  if (props.theme) {
    rootStyles = rootStyles.concat(`nyx-input__${props.theme}`);
  }

  if (props.error) {
    rootStyles = rootStyles.concat('nyx-input__error');
  }

  if (props.disabled) {
    rootStyles = rootStyles.concat('nyx-input__disabled');
  }

  if (props.className) {
    rootStyles = rootStyles.concat(props.className);
  }

  if (props.startAdornment) {
    inputStyles = inputStyles.concat('nyx-input--input__with-start-adornment');
  }

  if (props.endAdornment) {
    inputStyles = inputStyles.concat('nyx-input--input__with-end-adornment');
  }

  if (props.helpText) {
    inputStyles = inputStyles.concat('nyx-input--input__with-help-text');
  }

  return (
    <div className={'nyx-input ' + rootStyles.join(' ')}>
      {props.startAdornment && (
        <div className="nyx-input--start-adornment">{props.startAdornment}</div>
      )}
      {props.label && <label className="nyx-input--label">{props.label}</label>}
      {props.type === 'text' &&
          <input
              type={'text'}
              value={props.value}
              disabled={props.disabled}
              placeholder={props.placeholder}
              onChange={props.onChange}
              onFocus={props.onFocus}
              readOnly={props.readOnly ? props.readOnly : !props.onChange}
              autoFocus={props.autoFocus}
              className={'nyx-input--input ' + inputStyles.join(' ')}
              data-testid={props['data-testid']}
          />
      }
      {props.type === 'text-area' &&
          <textarea
              value={props.value}
              disabled={props.disabled}
              placeholder={props.placeholder}
              onChange={props.onChange}
              onFocus={props.onFocus}
              readOnly={props.readOnly ? props.readOnly : !props.onChange}
              autoFocus={props.autoFocus}
              className={'nyx-input--input ' + inputStyles.join(' ')}
              data-testid={props['data-testid']}
          />
      }
      {props.endAdornment && (
        <div className="nyx-input--end-adornment">{props.endAdornment}</div>
      )}
      {props.helpText && (
        <span className="nyx-input--help-text">{props.helpText}</span>
      )}
    </div>
  );
};

export default Input;
