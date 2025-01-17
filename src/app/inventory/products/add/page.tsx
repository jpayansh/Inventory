'use client';
import InputField from 'components/fields/InputField';

import Checkbox from 'components/checkbox';

import ApiFunction from 'utils/useApi';
import { useEffect, useState } from 'react';

import ProductTable from 'components/admin/data-tables/ProductTable';

export default function SignInDefault() {
  const [newdata, setNewdDate] = useState({
    product_name: '',
    sku_id: '',
  });
  const [load, setLoad] = useState(false);

  const [data, setData] = useState([]);
  const addProduct = (e) => {
    setNewdDate((prv) => ({ ...prv, [e.target.id]: e.target.value }));
  };

  const addProductFunction = async () => {
    try {
      if (!newdata.product_name || !newdata.sku_id) {
        throw Error('Fill all the details');
      }
      const response = await ApiFunction({
        method: 'post',
        url: 'products',
        body: { ...newdata },
      });
      if (response.success) {
        setLoad((prv) => !prv);
      }
    } catch (error) {
      console.log('error in addProductFunction in front -->', error);
    } finally {
      setNewdDate({
        product_name: '',
        sku_id: '',
      });
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await ApiFunction({ url: 'products' });
      setData(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  console.log(data, 'dataaa');
  useEffect(() => {
    fetchTableData();
  }, [load]);

  return (
    <>
      <div className="mt-5 rounded-[20px] bg-white p-5">
        {/* Sign in section */}
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
              {/* {products.length > 0 &&
                products.map((item) => ( */}
              <>
                <InputField
                  variant="auth"
                  extra="col-span-6"
                  label="Product Name*"
                  placeholder="Tirrent Booster"
                  id="product_name"
                  type="text"
                  value={newdata.product_name}
                  onChange={addProduct}
                />
                <InputField
                  variant="auth"
                  extra="col-span-5"
                  label="Product ID*"
                  placeholder="TG001TB"
                  id="sku_id"
                  type="text"
                  value={newdata.sku_id}
                  onChange={addProduct}
                />
              </>
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
          <button
            onClick={addProductFunction}
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Create Product
          </button>
        </div>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
        <ProductTable
          tableData={data}
          name="Products History"
          page="products"
        />
      </div>
    </>
  );
}
