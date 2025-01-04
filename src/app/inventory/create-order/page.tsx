'use client';
import InputField from 'components/fields/InputField';

import Checkbox from 'components/checkbox';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import ApiFunction from 'utils/useApi';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
let ProductId = 1;
export default function SignInDefault() {
  const [products, setProducts] = useState([
    {
      id: ProductId,
      name: '',
      quantity: '',
    },
  ]);

  const editProducts = (operation, prodId = null) => {
    if (operation == 'delete') {
      setProducts((prv) => {
        return prv.filter((item) => item.id != prodId);
      });
      return;
    }
    setProducts((prv) => [
      ...prv,
      {
        id: ++ProductId,
        name: '',
        quantity: '',
      },
    ]);
  };

  const fetchData = async () => {
    const data = await ApiFunction({ endPoint: 'https://dummyjson.com/test' });
    console.log(data, 'api custtom hook');
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="mb-8 mt-8 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-8 lg:items-center lg:justify-start">
        {/* Sign in section */}
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
          <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
            Create new order
          </h3>
          <div className="mb-3 grid grid-cols-12 gap-4 px-2">
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Company Name*"
              placeholder="Tirrent Global"
              id="cmpName"
              type="text"
            />
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Buyer Address*"
              placeholder="Orient Arcade, Bhilwara"
              id="buyerAddress"
              type="text"
            />

            <InputField
              variant="auth"
              extra="col-span-6"
              label="Mobile Number*"
              placeholder="918306027469"
              id="phoneNumber"
              type="number"
            />
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
            />

            <InputField
              variant="auth"
              extra="col-span-6"
              label="GSTIN*"
              placeholder="22AAAAA0000A1Z5"
              id="gstNumber"
              type="email"
            />
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Batch Number*"
              placeholder="2458"
              id="batchNumber"
              type="text"
            />
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
            />
          </div>
          <div
            className="mb-4 
         px-2"
          >
            <div className="mt-2 flex items-center">
              <button
                className="col-span-1 ml-2 text-sm font-medium text-navy-700 dark:text-white"
                onClick={() => editProducts('add')}
              >
                <MdAddCircleOutline style={{ color: 'green' }} />
              </button>
              <p className="text-md ml-2 font-medium text-navy-700 dark:text-white">
                Products
              </p>
            </div>
            <div className="mb-3 grid grid-cols-12 gap-2 px-2">
              {products.length > 0 &&
                products.map((item) => (
                  <>
                    <InputField
                      variant="auth"
                      extra="col-span-6"
                      label="Product Name*"
                      placeholder="Tirrent Global"
                      id="productName"
                      type="text"
                    />
                    <InputField
                      variant="auth"
                      extra="col-span-5"
                      label="Quantity*"
                      placeholder="50 ml"
                      id="quantity"
                      type="text"
                    />
                    <button
                      className="m-1 flex items-end justify-start p-3 text-base outline-none"
                      onClick={() => editProducts('delete', item.id)}
                    >
                      <MdDelete style={{ color: 'red' }} />
                    </button>
                  </>
                ))}
            </div>
          </div>

          <div
            className="mb-4 flex items-center justify-start
         px-2"
          >
            <div className="mt-2 flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Order Completed
              </p>
            </div>
          </div>
          <button className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Create order
          </button>
        </div>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
        <CheckTable
          tableData={tableDataCheck}
          name="Order History"
          page="create-order"
        />
      </div>
    </>
  );
}
