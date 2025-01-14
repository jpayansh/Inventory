'use client';
import InputField from 'components/fields/InputField';

import Checkbox from 'components/checkbox';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import ApiFunction from 'utils/useApi';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import ProductTable from 'components/admin/data-tables/ProductTable';
// let ProductId = 1;
export default function SignInDefault() {
  const [newdata, setNewdDate] = useState({
    product_name: '',
    sku_id: '',
  });

  const [data, setData] = useState([]);
  const addProduct = (e) => {
    setNewdDate((prv) => ({ ...prv, [e.target.id]: e.target.value }));
  };

  const addProductFunction = async () => {
    try {
      const response = await ApiFunction({
        method: 'post',
        url: '/api/products',
        body: { ...newdata },
      });
      setNewdDate({
        product_name: '',
        sku_id: '',
      });
    } catch (error) {
      ('error');
    }
  };

  // Fetch data from API
  const fetchTableData = async () => {
    try {
      const response = await ApiFunction({ url: '/api/products' }); // Replace with actual endpoint
      setData(response?.data || []); // Assuming response.data contains your array of products
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);
  console.log(newdata, 'knk');

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
              <button
                className="col-span-1 ml-2 text-sm font-medium text-navy-700 dark:text-white"
                // onClick={() => editProducts('add')}
              >
                <MdAddCircleOutline style={{ color: 'green' }} />
              </button>
              <p className="text-md ml-2 font-medium text-navy-700 dark:text-white">
                Products
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
                  placeholder="Tirrent Global"
                  id="product_name"
                  type="text"
                  value={newdata.product_name}
                  onChange={addProduct}
                />
                <InputField
                  variant="auth"
                  extra="col-span-5"
                  label="Quantity*"
                  placeholder="50 ml"
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
            Create order
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
