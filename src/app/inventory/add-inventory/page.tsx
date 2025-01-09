'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import ApiFunction from 'utils/useApi';
import { useEffect } from 'react';
import Card from 'components/card';

function SignInDefault() {
  const fetchData = async () => {
    const data = await ApiFunction({ url: 'https://dummyjson.com/test' });
    console.log(data, 'api custtom hook');
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>

    <Card mt-5>
      <div className="mb-8 mt-8 flex h-full w-full items-center justify-center lg:mb-8 lg:items-center lg:justify-start px-6" >
        {/* Sign in section */}
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
          <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
            Enter items to add to inventory
          </h3>
          <div className="mb-3 grid grid-cols-12 gap-4 px-2">
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Product Name*"
              placeholder="Product Name"
              id="email"
              type="text"
            />
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Quantity*"
              placeholder="Quantity"
              id="email"
              type="text"
            />

            <InputField
              variant="auth"
              extra="col-span-6"
              label="Batch Number"
              placeholder=""
              id="Batch Number"
              type="text"
            />
             <InputField
              variant="auth"
              extra="col-span-6"
              label="Price"
              placeholder=""
              id="Price"
              type="text"
            />
          </div>
          {/* Password */}

          {/* Checkbox */}
          
          <button className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Add inventory
          </button>
        </div>
      </div>
      </Card>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <CheckTable
          tableData={tableDataCheck}
          name="Inventory History"
          page="add-inventory"
        />
      </div>
    
    </>
  );
}

export default SignInDefault;
