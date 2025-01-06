import React from 'react';
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
import { MdEditSquare, MdDownload } from 'react-icons/md';
import NavLink from 'components/link/NavLink';

type RowObj = {
  buyer: string;
  address: string;
  gstn: string;
  invoicenumber: string;
  invoicedate: string;
  batchnumber: string;
  statecode: number;
  Productname: string;
  price: number;
  quantity: [number, string];
  units: number;
  Totalamount: number;
};

function InventoryHistoryTable(props: {
  tableData: any;
  name: string;
  page: string;
}) {
  const { tableData, name, page } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('buyer', {
      id: 'buyer',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Buyer Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('address', {
      id: 'address',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Address
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('gstn', {
      id: 'gstn',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">GSTN</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('invoicenumber', {
      id: 'invoicenumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Invoice Number
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor('invoicedate', {
      id: 'invoicedate',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Invoice Date
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('batchnumber', {
      id: 'batchnumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Batch Number
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('statecode', {
      id: 'statecode',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          State Code
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('Productname', {
      id: 'Productname',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Product Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('price', {
      id: 'price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Price</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Quantity
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('units', {
      id: 'units',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Units</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('Totalamount', {
      id: 'Totalamount',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Total Amount
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    // columnHelper.accessor('id', {
    //   id: 'btn-edit',
    //   header: () => <p className=""></p>,

    //   cell: (info) => (
    //     <div className="flex items-center">
    //       <NavLink href={`${page}/edit/${123456}`}>
    //         <button className="p-1">
    //           <MdEditSquare className="m-2 text-green-500 dark:text-green-300" />
    //         </button>
    //       </NavLink>

    //       <NavLink href="generate-invoice">
    //         <button className="p-1">
    //           <MdDownload className="m-2 text-green-500 dark:text-green-300" />
    //         </button>
    //       </NavLink>
    //     </div>
    //   ),
    // }),
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
  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>

        {/* <CardMenu /> */}
      </header>

      <div className="mt-8 overflow-x-scroll">
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
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
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
                          className="min-w-[150px] border-white/0 py-3  pr-4"
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

export default InventoryHistoryTable;
const columnHelper = createColumnHelper<RowObj>();
