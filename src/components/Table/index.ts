import { default as Table, Column as ColumnEx, SortBy as SortByEx } from './Table';
import Cell from './Cell';

export default Table;
export type Column<T> = ColumnEx<T>;
export type SortBy<T> = SortByEx<T>;
export {
  Cell
};
