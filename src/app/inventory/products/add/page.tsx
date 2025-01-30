'use client';
import InputField from 'components/fields/InputField';

import Checkbox from 'components/checkbox';

import ApiFunction from 'utils/useApi';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import PopoverHorizon from 'components/popover';

export default function SignInDefault() {
  const router = useRouter();
  const [newdata, setNewdDate] = useState({
    product_name: '',
    sku_id: '',
    packing: 'gm',
    packaging: '',
  });
  const addProduct = (e) => {
    setNewdDate((prv) => ({ ...prv, [e.target.id]: e.target.value }));
  };

  const addProductFunction = async () => {
    try {
      if (
        !newdata.product_name ||
        !newdata.sku_id ||
        !newdata.packing ||
        !newdata.packaging
      ) {
        alert('Fill all the details');
        throw Error('Fill all the details');
      }
      const response = await ApiFunction({
        method: 'post',
        url: 'products',
        body: { ...newdata },
      });
      if (!response.success) {
        throw Error('Something went wrong at the time of adding product');
      }
      router.replace('/inventory/products');
    } catch (error) {
      console.log('error in addProductFunction in front -->', error);
    } finally {
      setNewdDate({
        product_name: '',
        sku_id: '',
        packing: 'gm',
        packaging: '',
      });
    }
  };

  return (
    <>
      <div className="mt-5 rounded-[20px] bg-white p-5">
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
          <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
            Add New Product
          </h3>

          <div
            className="mb-4 
         px-2"
          >
            <div className="mt-2 flex items-center">
              <p className="text-md ml-2 font-medium text-navy-700 dark:text-white">
                Add Product
              </p>
            </div>
            <div className="mb-3 grid grid-cols-12 gap-2 px-2">
              <InputField
                variant="auth"
                extra="col-span-4"
                label="Product Name*"
                placeholder="Tirrent Booster"
                id="product_name"
                type="text"
                value={newdata.product_name}
                onChange={addProduct}
              />
              <InputField
                variant="auth"
                extra="col-span-3"
                label="Product ID*"
                placeholder="TG001TB"
                id="sku_id"
                type="text"
                value={newdata.sku_id}
                onChange={addProduct}
              />
              <InputField
                variant="auth"
                extra="col-span-2"
                label="Packaging*"
                placeholder="100"
                id="packaging"
                type="text"
                value={newdata.packaging}
                onChange={addProduct}
              />
              <div>
                <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
                  Packing
                </label>
                <select
                  id="packing"
                  name="products"
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                  onChange={addProduct}
                >
                  <option value="gm">gm</option>
                  <option value="kg">kg</option>
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={addProductFunction}
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Create Product
          </button>
        </div>
      </div>
    </>
  );
}
