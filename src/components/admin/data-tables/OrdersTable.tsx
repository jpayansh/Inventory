import React, { useEffect } from 'react';

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
import { FaRegCheckCircle } from 'react-icons/fa';
import ApiFunction from 'utils/useApi';
import { useRouter } from 'next/navigation';

type RowObj = {
  id: any;
  index: number;
  created_at: string;
  updated_at: string;
  total_price: number;
  total_units: number;

  company_name: string;
};

function OrdersTable(props: { tableData: any; name: string; page: string }) {
  const { tableData, name, page } = props;
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const createInvoiceFunction = async (id) => {
    const body = {
      orderId: id,
    };

    try {
      const response = await ApiFunction({
        method: 'post',
        url: 'invoice',
        body: { ...body },
      });

      if (!response.success) {
        throw Error(response.message);
      }
      router.replace('/inventory/invoices');
    } catch (error) {
      console.log('error in create invoice api in edit order page --> ', error);
    }
  };
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
    columnHelper.accessor('total_price', {
      id: 'total_price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Total Price
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('total_units', {
      id: 'total_units',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Total Units
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('company_name', {
      id: 'company_name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Company Name
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
    columnHelper.accessor('updated_at', {
      id: 'updated_at',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Updated At
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
        <div className="mb-1 flex items-center justify-center">
          <NavLink href={`${page}/edit/${info.getValue()}`}>
            <button className="linear mr-2 flex items-center justify-center rounded-lg bg-gray-200 p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
              <span className="mr-1 text-brand-500 dark:text-white">
                <MdEditSquare />
              </span>
              <span className="text-sm font-bold ">Edit</span>
            </button>
          </NavLink>

          <button
            onClick={() => createInvoiceFunction(info.getValue())}
            className="linear flex items-center justify-center rounded-lg bg-gray-200 p-1 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80"
          >
            <span className="mr-1 text-brand-500 dark:text-white">
              <FaRegCheckCircle />
            </span>
            <span className="text-md font-bold">Completed</span>
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
              .map((row, index) => {
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

export default OrdersTable;
const columnHelper = createColumnHelper<RowObj>();
