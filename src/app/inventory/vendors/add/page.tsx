'use client';
import InputField from 'components/fields/InputField';

import ApiFunction from 'utils/useApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInDefault() {
  const router = useRouter();
  const [newdata, setNewdDate] = useState({
    company_name: '',
    company_address: '',
    phone_number: '',
    gst_number: '',
    email: '',
  });
  const addProduct = (e) => {
    setNewdDate((prv) => ({ ...prv, [e.target.id]: e.target.value }));
  };

  const addProductFunction = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (
        !newdata.company_name ||
        !newdata.company_address ||
        !newdata.phone_number ||
        !newdata.gst_number ||
        !newdata.email
      ) {
        alert('Fill all the details');
        throw Error('Fill all the details');
      }
      if (!emailRegex.test(newdata.email)) {
        alert('Wrong Email Format');
        throw Error('Wrong Email Format');
      }
      const response = await ApiFunction({
        method: 'post',
        url: 'vendors',
        body: { ...newdata },
      });
      if (!response.success) {
        throw Error('Something went wrong in the vendor add api');
      }
      router.replace('/inventory/vendors');
      setNewdDate({
        company_name: '',
        company_address: '',
        phone_number: '',
        gst_number: '',
        email: '',
      });
    } catch (error) {
      console.log('error in addProductFunction in front -->', error);
    }
  };

  return (
    <>
      <div className="mt-5 rounded-[20px] bg-white p-5">
        {/* Sign in section */}
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
          <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
            Add New Vendor
          </h3>

          <div
            className="mb-4 
         px-2"
          >
            <div className="mb-3 grid grid-cols-12 gap-2 px-2">
              {/* {products.length > 0 &&
                products.map((item) => ( */}
              <>
                <InputField
                  variant="auth"
                  extra="col-span-6"
                  label="Company Name*"
                  placeholder=""
                  id="company_name"
                  type="text"
                  value={newdata.company_name}
                  onChange={addProduct}
                />
                <InputField
                  variant="auth"
                  extra="col-span-5"
                  label="Company Address*"
                  placeholder=""
                  id="company_address"
                  type="text"
                  value={newdata.company_address}
                  onChange={addProduct}
                />

                <InputField
                  variant="auth"
                  extra="col-span-6"
                  label="Phone Number*"
                  placeholder=""
                  id="phone_number"
                  type="number"
                  value={newdata.phone_number}
                  onChange={addProduct}
                />
                <InputField
                  variant="auth"
                  extra="col-span-5"
                  label="GST Number*"
                  placeholder=""
                  id="gst_number"
                  type="text"
                  value={newdata.gst_number}
                  onChange={addProduct}
                />
                <InputField
                  variant="auth"
                  extra="col-span-6"
                  label="Email*"
                  placeholder=""
                  id="email"
                  type="email"
                  value={newdata.email}
                  onChange={addProduct}
                />
              </>
            </div>
          </div>
          <button
            onClick={addProductFunction}
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Vendor
          </button>
        </div>
      </div>
    </>
  );
}
