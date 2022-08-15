import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

type GroupProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

type ItemProps = {
  onClick?: (event: any) => void;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

const Menu = (props: Props): JSX.Element => {
  return (
    <ul className={`nyx-menu ${props.className || ''}`}>{props.children}</ul>
  );
};

const MenuGroup = (props: GroupProps): JSX.Element => {
  return (
    <ul className={`nyx-menu--group ${props.className || ''}`}>
      {props.title && <li className="nyx-menu--title">{props.title}</li>}
      {props.children}
    </ul>
  );
};

const MenuItem = (props: ItemProps): JSX.Element => {
  return (
    <li
      className={`nyx-menu--item ${props.className || ''}`}
      onClick={props.onClick}
      data-testid={props['data-testid']}
    >
      {props.children}
    </li>
  );
};

export default Menu;

export { MenuGroup, MenuItem };
