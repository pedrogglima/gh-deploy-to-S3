import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Cell = (props: Props) => {
  return (
    <td className={`nyx-table--cell ${props.className}`}>{props.children}</td>
  );
};

export default Cell;
