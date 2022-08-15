import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table, { Column } from './Table';
import { SortBy } from '.';

const _amountFormatter = (amount: number) => {
  return amount < 0 ? `-$${amount * -1}` : `+$${amount}`;
};

const rows = [
  {
    name: 'Airbnb ABC',
    seat_key: '373389',
    dsp_name: 'Verizon Media',
    dsp_code: 'verizon_media',
    last_week: 458.0,
    prev_week: 145.0,
  },
  {
    name: 'Allstats - NP',
    seat_key: '5239',
    dsp_name: 'Mediamat',
    dsp_code: 'mediamat',
    last_week: 412.0,
    prev_week: 548.0,
  },
  {
    name: 'BP Bully Pulpit',
    seat_key: '851245',
    dsp_name: 'DV360',
    dsp_code: 'dv360',
    last_week: 41.0,
    prev_week: 42.0,
  },
  {
    name: 'Canadian Tire - CT - Canada',
    seat_key: '851245',
    dsp_name: 'DV360',
    dsp_code: 'dv360',
    last_week: 51.0,
    prev_week: 50.0,
  },
  {
    name: 'Cossete Media CM',
    seat_key: '851245',
    dsp_name: 'DV360',
    dsp_code: 'dv360',
    last_week: 41.0,
    prev_week: 41.0,
  },
];

const columns: Column<any>[] = [
  {
    field: 'name',
    name: 'Name',
    width: '20%',
    sortable: true,
  },
  {
    field: 'seat_key',
    name: 'Seat ID',
    width: '15%',
    render: (value, _) => {
      return <td className="nyx-table--cell seats-table--seat-key">{value}</td>;
    },
  },
  {
    field: 'dsp_name',
    name: 'DSP',
    width: '20%',
  },
  {
    field: 'last_week',
    name: 'Last 7 Days of Spend',
    width: '15%',
    render: (value, _) => {
      return <td className="nyx-table--cell">${value}</td>;
    },
  },
  {
    field: 'prev_week',
    name: 'Previous 7 Days of Spend',
    width: '15%',
    render: (value, _) => {
      return <td className="nyx-table--cell">${value}</td>;
    },
  },
  {
    field: 'change',
    name: 'Change in Spend',
    width: '15%',
    render: (_, row) => {
      const change = row.last_week - row.prev_week;
      const changeClass =
        change === 0
          ? ''
          : change > 0
          ? 'seats-table__positive'
          : 'seats-table__negative';

      return (
        <td className={`nyx-table--cell ${changeClass}`}>
          {_amountFormatter(change)}
        </td>
      );
    },
  },
];

export default {
  title: 'Example/Table',
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const TableExample = Template.bind({});
TableExample.args = {
  rows,
  columns,
};

const ServerTemplate: ComponentStory<typeof Table> = args => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<SortBy<any>>({ field: 'name', asc: false });
  const [page, setPage] = useState(1);

  const start = (page - 1) * (args.pageSize || 2);
  const end = page * (args.pageSize || 2);

  const filteredRows = rows.sort((rowA, rowB) => {
    const termA = sortBy.field ? rowA[sortBy.field] : rowA;
    const termB = sortBy.field ? rowB[sortBy.field] : rowB;
    const orderFactor = sortBy.asc ? 1 : -1;

    return termA === termB ? 0 : (termA > termB ? -1 : 1) * orderFactor;
  }).slice(start, end);

  return (
    <Table
      {...args}
      rows={filteredRows}
      selectedRows={selectedRows}
      handleSelectRows={rows => setSelectedRows(rows)}
      sortBy={sortBy}
      handleColumnSort={sort => setSortBy(sort)}
      page={page}
      handlePageChange={page => setPage(page)}
      totalRows={rows.length}
    />
  )
};

export const ServerSideTable = ServerTemplate.bind({});
ServerSideTable.args = {
  columns,
  bulkSelect: true,
};
