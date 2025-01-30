import React, { useEffect } from 'react';
import CardMenu from 'components/card/CardMenu';
import Checkbox from 'components/checkbox';
import Card from 'components/card';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { MdDelete, MdEditSquare } from 'react-icons/md';

type RowObj = {
  id: any;
  product_id: number;
  product_name: string;
  index: number;
  units: number;
  price: number;
  batch_number: number;
  created_at: string;
  updated_at: string;
  packing: string;
};

function InventoryTable(props: {
  tableData: any;
  name: string;
  page: string;
  deleteFromTable: (id: number) => {};
}) {
  const { tableData, name, page, deleteFromTable } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('index', {
      id: 'index',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">S/N</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()})
        </p>
      ),
    }),
    columnHelper.accessor('packing', {
      id: 'packing',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Varient
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('units', {
      id: 'total_units',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Units</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('price', {
      id: 'total_price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Price</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('batch_number', {
      id: 'batch_number',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Batch No
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Created At
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor('id', {
      id: 'btn-edit',
      header: () => <p className=""></p>,

      cell: (info) => (
        <div className="flex items-center ">
          {/* <NavLink href={`${page}/edit/${info.getValue()}`}>
            <button className="p-1">
              <MdEditSquare className="m-2 text-green-500 dark:text-green-300" />
            </button>
          </NavLink> */}

          <button
            onClick={() => deleteFromTable(info.getValue())}
            className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-gray-200 p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80"
          >
            <span className="text-brand-500 dark:text-white">
              <MdDelete style={{ color: 'red' }} />
            </span>
            <span className="text-md font-bold ">Delete</span>
          </button>
        </div>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    if (tableData.length > 0) {
      setData(
        tableData.map((data, index) => ({
          ...data,
          index: index + 1,
          created_at: data.created_at.split('T')[0],
          updated_at: data.updated_at.split('T')[0],
        })),
      );
    }
  }, [tableData]);
  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>

        {/* <CardMenu /> */}
      </header>

      <div className="xl:overflow-x mt-8 overflow-x-scroll">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-2 pt-4 text-start dark:border-white/30"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[100px] border-white/0 py-3  pr-2"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default InventoryTable;
const columnHelper = createColumnHelper<RowObj>();
