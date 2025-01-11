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
import { MdEditSquare, MdDownload } from 'react-icons/md';
import NavLink from 'components/link/NavLink';
import { type } from 'os';

type product = {
  name: string;
  units: number;
  quantity: string;
  code: string;
  price: number;
  batchNumber: number;
 
};

type RowObj = {
  companyName: string;
  buyerAddress: string;
  mobileNumber: number;
  email: string;
  gstNumber: string;
  products: product[];
  totalPrice: number;
  totalQuantity: number;
  date: string;
};

function InventoryHistoryTable(props: {
  tableData: RowObj[];
  name: string;
  page: string;
}) {
  const { tableData, name, page } = props;
  console.log(tableData, 'llklk');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('companyName', {
      id: 'companyName',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Vender Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('buyerAddress', {
      id: 'buyerAddress',
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
    columnHelper.accessor('mobileNumber', {
      id: 'mobileNumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Number
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Email</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor('gstNumber', {
      id: 'gstNumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          GST No.
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('products', {
      id: 'product.name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Product Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.name}
            </p>
          ))}
        </p>
      ),
    }),
    columnHelper.accessor('products', {
      id: 'product.units',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Units</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.units}
            </p>
          ))}
        </p>
      ),
    }),
    columnHelper.accessor('products', {
      id: 'product.quantity',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Quantity
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.quantity}
            </p>
          ))}
        </p>
      ),
    }),
    columnHelper.accessor('products', {
      id: 'product.code',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Code</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.code}
            </p>
          ))}
        </p>
      ),
    }),

    columnHelper.accessor('products', {
      id: 'product.code',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Code</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.code}
            </p>
          ))}
        </p>
      ),
    }),

    columnHelper.accessor('products', {
      id: 'product.price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">price</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.price}
            </p>
          ))}
        </p>
      ),
    }),
    columnHelper.accessor('products', {
      id: 'product.batchNumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Batch Number
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()?.map((product, index) => (
            <p
              key={index}
              className="text-sm font-bold text-navy-700 dark:text-white"
            >
              {product.batchNumber}
            </p>
          ))}
        </p>
      ),
    }),
  
    columnHelper.accessor('totalPrice', {
      id: 'totalPrice',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Total
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('totalQuantity', {
      id: 'totalQuantity',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Total Qyt
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Date
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
  useEffect(() => {
    if (tableData) {
      setData(tableData);
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
