import React, { useState } from 'react';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import Cell from './Cell';

export type SortBy<T> = {
  field?: keyof T;
  asc: boolean;
};

export type Column<T> = {
  field?: keyof T;
  name?: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => JSX.Element;
};

type Props<T> = {
  /**
   * Provide the column names for the table
   */
  columns: Column<T>[];
  /**
   * Provide the row data to populate the table
   */
  rows: T[];
  /**
   * What page should the table be on?
   */
  page?: number;
  /**
   * How many rows per page?
   */
  pageSize?: number;
  /**
   * Total number of rows?
   */
  totalRows?: number;
  /**
   * What happens when you change the page?
   */
  handlePageChange?: (page: number) => void;
  /**
   * Do you want to select rows?
   */
  bulkSelect?: boolean;

  isSelectedField?: keyof T;

  selectedRows?: T[];

  handleSelectRows?: (rows: T[]) => void;

  handleSelectAll?: (all: boolean) => void;

  sortBy?: SortBy<T>;
  /**
   * How do you want to sort your column?
   */
  handleColumnSort?: (sortedBy: SortBy<T>) => void;
};

const FIRST_PAGE = 1;

const _sortRows = <T,>(rows: T[], sortBy: SortBy<T>): T[] => {
  const { field, asc } = sortBy;

  if (field === undefined) {
    return rows;
  }

  return rows.sort((rowA, rowB) => {
    const termA = rowA[field];
    const termB = rowB[field];
    const orderFactor = asc ? 1 : -1;

    return termA === termB ? 0 : (termA > termB ? -1 : 1) * orderFactor;
  });
};

const _sortAndPaginateRows = <T,>(
  rows: T[],
  sortBy: SortBy<T>,
  page: number,
  pageSize: number,
): T[] => {
  const sortedRows = _sortRows(rows, sortBy);

  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  return sortedRows.slice(start, end);
};

const _convertSelectedToMap = <T,>(rows?: T[], field?: keyof T) => {
  const map = new Map<any, T>();

  if (!rows) {
    return map;
  }

  rows.forEach(row => {
    const key = field ? row[field] : row;

    map.set(key, row);
  });

  return map;
};

const Table = <T,>(props: Props<T>): JSX.Element => {
  // destructure props
  const {
    handleSelectAll,
    handleSelectRows,
    handleColumnSort,
    handlePageChange,
    isSelectedField,
  } = props;

  // for client side state
  const [localPage, setLocalPage] = useState(1);
  const [localSelectedRows, setLocalSelectedRows] = useState<Map<any, T>>(
    _convertSelectedToMap(props.selectedRows, isSelectedField),
  );
  const [localSortBy, setLocalSortBy] = useState<SortBy<T>>({
    field: undefined,
    asc: false,
  });
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // decide which state to use [props / local]
  const totalRows = props.totalRows || props.rows.length;
  const pageSize = props.pageSize || rowsPerPage;
  const LAST_PAGE =
    totalRows === 0 ? FIRST_PAGE : Math.ceil(totalRows / pageSize);
  const selectedRows = props.selectedRows
    ? _convertSelectedToMap(props.selectedRows, isSelectedField)
    : localSelectedRows;
  const page = props.page || localPage;
  const sortBy = props.sortBy || localSortBy;
  const rows =
    props.handlePageChange || !props.pageSize
      ? props.rows
      : _sortAndPaginateRows(props.rows, sortBy, page, pageSize);

  const _defaultRender = (value: any, _row: T) => <Cell>{value}</Cell>;

  const _toggleAll = () => {
    let updatedMap = new Map();

    if (selectedRows.size === 0) {
      updatedMap = _convertSelectedToMap(rows, isSelectedField);
    }

    if (handleSelectAll) {
      handleSelectAll(selectedRows.size > 0);
    } else if (handleSelectRows) {
      const selectedRowsArray = Array.from(
        isSelectedField ? updatedMap.values() : updatedMap.keys(),
      );

      handleSelectRows(selectedRowsArray);
    } else {
      setLocalSelectedRows(updatedMap);
    }
  };

  const _toggleRow = (row: T) => {
    const rowKey = props.isSelectedField ? row[props.isSelectedField] : row;
    const updatedMap = new Map(selectedRows);

    if (selectedRows.has(rowKey)) {
      updatedMap.delete(rowKey);
    } else {
      updatedMap.set(rowKey, row);
    }

    if (handleSelectRows) {
      const selectedRowsArray = Array.from(
        isSelectedField ? updatedMap.values() : updatedMap.keys(),
      );

      handleSelectRows(selectedRowsArray);
    } else {
      setLocalSelectedRows(updatedMap);
    }
  };

  const _sortColumn = (column: Column<T>) => {
    const updatedSortBy = {
      field: column.field,
      asc: sortBy.field === column.field ? !sortBy.asc : false,
    };

    if (handleColumnSort) {
      handleColumnSort(updatedSortBy);
    } else {
      setLocalSortBy(updatedSortBy);
    }
  };

  const _changePage = (page: number) => {
    if (handlePageChange) {
      handlePageChange(page);
    } else {
      setLocalPage(page);
    }
  };

  return (
    <div className="nyx-table">
      <table className="nyx-table--table">
        <thead>
          <tr className="nyx-table--header">
            {props.bulkSelect && (
              <th className="nyx-table--cell nyx-table--cell__selectable">
                <Checkbox
                  checked={selectedRows.size > 0}
                  variant="checkbox"
                  indeterminate={selectedRows.size !== rows.length}
                  onChange={() => _toggleAll()}
                />
              </th>
            )}
            {props.columns.map((column, i) => (
              <th
                key={`th-${i}`}
                style={{ width: column.width }}
                className={
                  'nyx-table--cell ' +
                  (column.sortable ? 'nyx-table--cell__sortable' : '')
                }
                onClick={
                  column.sortable ? () => _sortColumn(column) : undefined
                }
              >
                <>
                  {column.name || column.field}
                  {sortBy.field === column.field && (
                    <Icon
                      icon={sortBy.asc ? 'arrow-up' : 'arrow-down'}
                      className="nyx-table--sort"
                    />
                  )}
                </>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`tr-${i}`} className="nyx-table--row">
              {props.bulkSelect && (
                <Cell className="nyx-table--cell__selectable">
                  <Checkbox
                    checked={selectedRows.has(
                      isSelectedField ? row[isSelectedField] : row,
                    )}
                    variant="checkbox"
                    onChange={() => _toggleRow(row)}
                  />
                </Cell>
              )}
              {props.columns.map((column, j) => {
                const cellRenderer = column.render || _defaultRender;
                const value = column.field ? row[column.field] : undefined;

                return (
                  <React.Fragment key={`td-${j}`}>
                    {cellRenderer(value, row)}
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="nyx-table--pagination">
        <span>
          Rows per page:{' '}
          <Select
            options={[25, 50, 75, 100]}
            value={rowsPerPage}
            onChange={e => {
              setRowsPerPage(e.target.value);
            }}
            minWidth={75}
          />
        </span>
        <span className="nyx-table--page-display">
          {rows.length > 0 ? (page - 1) * pageSize + 1 : 0} -{' '}
          {Math.min(page * pageSize, totalRows)} of {totalRows}
        </span>
        <Icon
          icon="chevron-left-stop"
          onClick={() => _changePage(FIRST_PAGE)}
          color={page === FIRST_PAGE ? 'secondary' : undefined}
          className={
            'nyx-table--page-controls ' +
            (page === FIRST_PAGE ? 'nyx-table--page-controls__disabled' : '')
          }
        />
        <Icon
          icon="chevron-left"
          onClick={() => _changePage(page - 1)}
          color={page === FIRST_PAGE ? 'secondary' : undefined}
          className={
            'nyx-table--page-controls ' +
            (page === FIRST_PAGE ? 'nyx-table--page-controls__disabled' : '')
          }
        />
        <Icon
          icon="chevron-right"
          onClick={() => _changePage(page + 1)}
          color={page === LAST_PAGE ? 'secondary' : undefined}
          className={
            'nyx-table--page-controls ' +
            (page === LAST_PAGE ? 'nyx-table--page-controls__disabled' : '')
          }
        />
        <Icon
          icon="chevron-right-stop"
          onClick={() => _changePage(LAST_PAGE)}
          color={page === LAST_PAGE ? 'secondary' : undefined}
          className={
            'nyx-table--page-controls ' +
            (page === LAST_PAGE ? 'nyx-table--page-controls__disabled' : '')
          }
        />
      </div>
    </div>
  );
};

export default Table;
