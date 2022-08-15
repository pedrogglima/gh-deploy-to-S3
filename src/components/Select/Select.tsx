import React, { useState, useEffect, useRef } from 'react';
import Chip from 'components/Chip';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import Icon from 'components/Icon';
import Highlight from 'components/Highlight';

type Props = {
  value: any | any[];
  options: any[];
  placeholder?: string;
  label?: string;
  helpText?: string;
  multiple?: boolean;
  searchable?: boolean;
  error?: boolean;
  optionValue?: (option: any) => any;
  optionName?: (option: any) => any;
  onChange?: (event: any) => void;
  handleSearch?: (event: any) => void;
  className?: string;
  minWidth?: number;
};

const _filterOptions = (options: any[], filter: string) => {
  return options.filter(option => {
    // FIXME option value?
    return option.toString().includes(filter);
  });
};

const _convertValueToMap = (value: any, getValue?: Function) => {
  const map = new Map<any, any>();
  const values: any[] = Array.isArray(value) ? value : [value];

  values.forEach(v => {
    const key = getValue ? getValue(v) : v;
    map.set(key, v);
  });

  return map;
};

const Select = (props: Props): JSX.Element => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const rootElementRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState(false);
  const [internalValueMap, setInternalValueMap] = useState<Map<any, any>>(
    _convertValueToMap(props.value, props.optionValue),
  );
  const [searchTerm, setSearchTerm] = useState('');

  const options =
    props.searchable && !props.handleSearch
      ? _filterOptions(props.options, searchTerm)
      : props.options;

  const valueKeys = Array.from(internalValueMap.keys());

  const _hasBlankValue = () => {
    return Array.isArray(props.value) ? props.value.length === 0 : !props.value;
  };

  const _isSelected = (option: any) => {
    const key = props.optionValue ? props.optionValue(option) : option;
    return internalValueMap.has(key);
  };

  const _getOptionName = (option: any) => {
    return props.optionName ? props.optionName(option) : option;
  };

  const _selectOption = (option: any) => {
    const key = props.optionValue ? props.optionValue(option) : option;

    if (Array.isArray(props.value)) {
      if (internalValueMap.has(key)) {
        _removeValue(option);
      } else {
        const updatedMap = new Map(internalValueMap);
        updatedMap.set(key, option);

        setInternalValueMap(updatedMap);
      }
    } else {
      const updatedMap = new Map();
      updatedMap.set(key, option);

      setInternalValueMap(updatedMap);
      setShowOptions(false);
    }
  };

  const _removeValue = (valueToRemove: any, isKey: boolean = false) => {
    const key =
      props.optionValue && !isKey
        ? props.optionValue(valueToRemove)
        : valueToRemove;
    const updatedMap = new Map(internalValueMap);
    updatedMap.delete(key);

    setInternalValueMap(updatedMap);
  };

  const _handleSearchTerm = (event: any) => {
    if (props.handleSearch) {
      props.handleSearch(event);
    }

    setSearchTerm(event.target.value);
  };

  // Local implementation of click outside
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !rootElementRef.current ||
        rootElementRef.current.contains(event.target)
      ) {
        return;
      }

      // dismiss options
      setShowOptions(false);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [rootElementRef]);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, [internalValueMap]);

  // styles
  let rootStyles: string[] = [];

  if (props.helpText) {
    rootStyles = rootStyles.concat('nyx-select__with-help-text');
  }

  if (props.multiple) {
    rootStyles = rootStyles.concat('nyx-select__multiple');
  }

  if (props.error) {
    rootStyles = rootStyles.concat('nyx-select__error');
  }

  if (props.className) {
    rootStyles = rootStyles.concat(props.className);
  }

  return (
    <div
      className={'nyx-select ' + rootStyles.join(' ')}
      ref={rootElementRef}
      style={{ minWidth: `${props.minWidth}px` }}
    >
      {props.label && (
        <label className="nyx-select--label">{props.label}</label>
      )}

      <select
        ref={selectRef}
        value={Array.isArray(props.value) ? valueKeys : valueKeys[0]}
        multiple={props.multiple}
        onChange={props.onChange}
        style={{ display: 'none' }}
        size={100}
      >
        {valueKeys.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div
        role="listbox"
        className="nyx-select--select"
        onClick={() => setShowOptions(!showOptions)}
      >
        {_hasBlankValue() ? (
          <span className="nyx-select--placeholder">
            {props.placeholder || '\u00a0'}
          </span>
        ) : props.multiple && Array.isArray(props.value) ? (
          valueKeys.map((value, i) => (
            <Chip
              key={i}
              size="small"
              className="nyx-select--selected-chip"
              onDismiss={e => {
                e.stopPropagation();
                _removeValue(value, true);
              }}
            >
              {_getOptionName(internalValueMap.get(value))}
            </Chip>
          ))
        ) : (
          props.value
        )}
      </div>

      {showOptions && (
        <ul className="nyx-select--options">
          {props.searchable && (
            <Input
              value={searchTerm}
              autoFocus={true}
              onChange={_handleSearchTerm}
              startAdornment={<Icon icon="search" />}
              className="nyx-select--search"
            />
          )}
          {options.map((option, i) => (
            <li
              key={i}
              role="option"
              aria-selected={_isSelected(option)}
              className={
                'nyx-select--option ' +
                (_isSelected(option) ? 'nyx-select--option__selected' : '')
              }
              onClick={() => _selectOption(option)}
            >
              {props.multiple && (
                <Checkbox
                  variant="checkbox"
                  className="nyx-select--option-checkbox"
                  checked={_isSelected(option)}
                />
              )}
              {props.searchable ? (
                <Highlight text={_getOptionName(option)} match={searchTerm} />
              ) : (
                _getOptionName(option)
              )}
            </li>
          ))}
        </ul>
      )}

      {props.helpText && (
        <span className="nyx-select--help-text">{props.helpText}</span>
      )}
    </div>
  );
};

export default Select;
