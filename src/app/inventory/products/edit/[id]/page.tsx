'use client';
import InputField from 'components/fields/InputField';

import Checkbox from 'components/checkbox';
import ApiFunction from 'utils/useApi';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function SignInDefault({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newdata, setNewdDate] = useState({
    product_name: '',
    sku_id: '',
    product_id: params.id,
    packing: 'gm',
    packaging: '',
  });
  const addProduct = (e) => {
    setNewdDate((prv) => ({ ...prv, [e.target.id]: e.target.value }));
  };

  const editProductFunction = async () => {
    const data = {
      product_name: newdata.product_name,
      sku_id: newdata.sku_id,
      product_id: params.id,
      packing: newdata.packing,
      packaging: newdata.packaging,
    };

    try {
      if (
        !data.product_name ||
        !data.sku_id ||
        !data.product_id ||
        !data.packaging ||
        !data.packing
      ) {
        alert('Fill all the details');
        throw Error('Fill all the details');
      }
      const response = await ApiFunction({
        method: 'put',
        url: 'products',
        body: { ...data },
      });
      console.log(response, 'response');

      if (response.success) {
        router.push('/inventory/products');
      }
      throw new Error(response.message);
    } catch (error) {
      console.log('error in edit products --> ', error);
    }
  };

  const getData = async () => {
    try {
      const response = await ApiFunction({
        method: 'get',
        url: `products?id=${params.id}`,
      });

      if (response.data.length > 0) {
        const pack = response.data[0].packing.split(' ');
        const packing = pack[1];
        const packaging = pack[0];
        setNewdDate({
          product_name: response.data[0].product_name,
          sku_id: response.data[0].sku_id,
          product_id: params.id,
          packing: packing,
          packaging: packaging,
        });
      }
    } catch (error) {
      console.log('error in get in edit products --> ', error);
    }
  };
  console.log(newdata);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mt-5 rounded-[20px] bg-white p-5">
        {/* Sign in section */}
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
          <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
            Edit Product
          </h3>

          <div
            className="mb-4 
         px-2"
          >
            <div className="mt-2 flex items-center">
              <p className="text-md ml-2 font-medium text-navy-700 dark:text-white">
                Edit Product
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
                  value={newdata.packing}
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
            onClick={editProductFunction}
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Save Edit
          </button>
        </div>
      </div>
    </>
  );
}
