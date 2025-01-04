'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import ApiFunction from 'utils/useApi';
import { useEffect } from 'react';

function SignInDefault() {
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
            Enter items to add to inventory
          </h3>
          <div className="mb-3 grid grid-cols-12 gap-4 px-2">
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
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
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
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
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

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
          />

          {/* Password */}

          {/* Checkbox */}
          <div
            className="mb-4 flex items-center justify-start
         px-2"
          >
            <div className="mt-2 flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
          </div>
          <button className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </div>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
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
