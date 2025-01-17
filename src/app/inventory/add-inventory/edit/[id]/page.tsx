'use client';
import Checkbox from 'components/checkbox';
import InputField from 'components/fields/InputField';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import ApiFunction from 'utils/useApi';
let ProductId = 1;
export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [products, setProducts] = useState({
    batch_number: '',
    price_per_bottle: '',
    total_quantity: '',
    sku_id: '',
    product_name: '',
    price_total: '',
  });

  const addInventory = (e) => {
    setProducts((prv) => ({
      ...prv,
      [e.target.id]: e.target.value.toString(),
    }));
  };

  const getData = async () => {
    try {
      const response = await ApiFunction({
        method: 'get',
        url: `inventory?id=${id}`,
      });

      if (response.success) {
        const data = {
          batch_number: response.data[0].batch_number,
          price_per_bottle: response.data[0].price_per_bottle,
          total_quantity: response.data[0].total_quantity.toString(),
          sku_id: response.data[0].sku_id,
          product_name: response.data[0].product_name,
          price_total: response.data[0].price_total,
          inventory_id: id,
        };
        setProducts({ ...data });
        return;
      }
    } catch (error) {
      console.log('error in edit inventory --> ', error);
    }
  };

  const editInventoryFunction = async () => {
    try {
      if (
        !products.batch_number ||
        !products.sku_id ||
        !products.price_per_bottle ||
        !products.price_total ||
        !products.product_name ||
        !products.total_quantity
      ) {
        throw Error('Fill all the details');
      }
      const response = await ApiFunction({
        method: 'put',
        url: 'inventory',
        body: { ...products },
      });
      console.log(response, 'response');

      if (response.success) {
        router.push('/inventory/add-inventory');
        return;
      }
      throw new Error(response.message);
    } catch (error) {
      console.log('error in edit inventory --> ', error);
    }
  };

  console.log(products, 'productsss');
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mb-8 mt-8 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-8 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
        <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
          Edit inventory number - {id}
        </h3>
        <div className="mb-3 grid grid-cols-12 gap-4 px-2">
          <InputField
            variant="auth"
            extra="col-span-6"
            label="Product Name*"
            placeholder="Tirrent Booster"
            id="product_name"
            type="text"
            onChange={addInventory}
            value={products.product_name}
          />
          <InputField
            variant="auth"
            extra="col-span-6"
            label="Price Per Bottle in rs*"
            placeholder="2000"
            id="price_per_bottle"
            type="text"
            onChange={addInventory}
            value={products.price_per_bottle}
          />

          <InputField
            variant="auth"
            extra="col-span-6"
            label="Price Total in rs*"
            placeholder="30000"
            id="price_total"
            type="text"
            onChange={addInventory}
            value={products.price_total}
          />
          <InputField
            variant="auth"
            extra="col-span-6"
            label="Sku Id*"
            placeholder="TG001TB"
            id="sku_id"
            type="text"
            onChange={addInventory}
            value={products.sku_id}
          />

          <InputField
            variant="auth"
            extra="col-span-6"
            label="Batch Number*"
            placeholder="1"
            id="batch_number"
            type="text"
            onChange={addInventory}
            value={products.batch_number}
          />
          <InputField
            variant="auth"
            extra="col-span-6"
            label="Total Quantity*"
            placeholder="28"
            id="total_quantity"
            type="text"
            onChange={addInventory}
            value={products.total_quantity}
          />
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
          onClick={editInventoryFunction}
          className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Edit Inventory
        </button>
      </div>
    </div>
  );
}
