'use client';
import Checkbox from 'components/checkbox';
import InputField from 'components/fields/InputField';
import { DataContext } from 'contexts/DataContext';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import ApiFunction from 'utils/useApi';

export default function Page() {
  const { stocks, vendors } = useContext<any>(DataContext);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [vendorFromApi, setVendorFromApi] = useState<{
    company_name: string;
  }>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQunatity, setTotalQuantity] = useState(0);
  const [newProduct, setNewProduct] = useState<any>();

  const addNewProduct = (type: string = '', id: number = undefined) => {
    if (type === 'add') {
      setNewProduct((prv) => [
        ...prv,
        {
          ...stocks[0],
          price: '',
          available_quantity: stocks[0].units,
        },
      ]);
    } else {
      setNewProduct((prv) => {
        const updatedProducts = prv.filter(
          (product, productIndex) => productIndex != id,
        );
        let updatedTotalPrice = 0;
        let updatedTotalQuantity = 0;

        updatedProducts.forEach((product) => {
          const price = parseInt(product.price) || 0;
          const quantity = parseInt(product.units) || 0;
          updatedTotalPrice += price * quantity;
          updatedTotalQuantity += quantity;
        });

        setTotalPrice(updatedTotalPrice);
        setTotalQuantity(updatedTotalQuantity);

        return updatedProducts;
      });
    }
  };
  const setVendorValues = (e) => {
    const { value } = e.target;
    const obj = vendors.filter((company) => company.company_name === value);
    setVendorFromApi(obj[0].id);
  };

  const handleChangeNewProduct = (e, index: any) => {
    const { id, value } = e.target;
    if (id == 'units') {
      if (value > newProduct[index].available_quantity) {
        alert('More than available quantity');
        return;
      }
    }
    setNewProduct((prev) => {
      let updatedProducts;
      if (id == 'product_name') {
        const product = value.split('/');
        const product_name = product[0];
        const product_batch = product[1];

        const stock = stocks.filter(
          (stock) =>
            stock.product_name == product_name &&
            stock.batch_number == product_batch,
        );
        updatedProducts = prev.map((product, productIndex) =>
          productIndex === index
            ? { ...stock[0], available_quantity: stock[0].units, price: '' }
            : product,
        );
      } else {
        updatedProducts = prev.map((product, productIndex) =>
          productIndex === index ? { ...product, [id]: value } : product,
        );
      }

      let updatedTotalPrice = 0;
      let updatedTotalQuantity = 0;

      updatedProducts.forEach((product) => {
        const price = parseInt(product.price) || 0;
        const quantity = parseInt(product.units) || 0;
        updatedTotalPrice += price * quantity;
        updatedTotalQuantity += quantity;
      });

      setTotalPrice(updatedTotalPrice);
      setTotalQuantity(updatedTotalQuantity);

      return updatedProducts;
    });
  };
  const addOrderFunction = async () => {
    const data = {
      total_price: totalPrice,
      total_units: totalQunatity,
      vendor_id: vendorFromApi,
      products: newProduct,
      order_id: id,
    };
    console.log(data, 'dataaa');

    try {
      const response = await ApiFunction({
        method: 'put',
        url: 'orders',
        body: { ...data },
      });

      if (!response.success) {
        throw Error(response.message);
      }
      router.push('/orders');
    } catch (error) {
      console.log('error in create order api --> ', error);
    }
  };

  const fetchOrder = useCallback(async () => {
    let productData;
    try {
      const response = await ApiFunction({
        method: 'get',
        url: `orders?order_id=${id}`,
      });

      if (!response.success) {
        throw Error('Something went wrong in get order by id in edit orders');
      }
      console.log(response, 'responseee');
      setTotalPrice(response.data[0].total_price);
      setTotalQuantity(response.data[0].total_units);
      setVendorFromApi(
        vendors.filter((cmp) => cmp.id === response.data[0].vendor_id)[0].id,
      );
      productData = response?.data.map((product) => ({
        price: product.price,
        units: product.units,
        product_id: product.product_id,
        batch_number: product.batch_number,
        product_name: product.product_name,
        available_quantity: product.units,
      }));
      setNewProduct([...productData]);
    } catch (error) {
      console.log('error in get in edit orders --> ', error);
    }
  }, [id, vendors]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className="mt-5 rounded-[20px] bg-white p-5">
      <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
        <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
          Edit Order
        </h3>
        <div
          className="mb-4 
     px-2"
        >
          <div className="mt-2 items-center">
            <p className="text-md ml-2 font-medium text-navy-700 dark:text-white">
              Select Company
            </p>
          </div>
          <div className="mb-3 grid grid-cols-12 gap-2 px-2">
            <select
              id="company_name"
              name="products"
              className="col-span-6 block w-full rounded-lg p-1 font-medium text-navy-700 focus:outline-none dark:text-white"
              onChange={(e) => setVendorValues(e)}
            >
              {vendors && vendorFromApi && vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <option
                    key={vendor.id + vendor.company_name}
                    value={vendor.company_name}
                    selected={vendor.id === vendorFromApi}
                  >
                    {vendor.company_name}
                  </option>
                ))
              ) : (
                <option>...</option>
              )}
            </select>
          </div>
          <div className="mt-2 flex items-center">
            <button>
              <MdAddCircleOutline
                className="font-bold text-brand-500 dark:text-white"
                style={{ color: 'green' }}
                onClick={() => {
                  addNewProduct('add');
                }}
              />
            </button>
            <p className="text-md ml-2 font-medium text-navy-700 dark:text-white">
              Products
            </p>
          </div>

          {newProduct &&
            newProduct.map((productItem, id) => (
              <div className="mb-3 grid grid-cols-12 gap-2 px-2" key={id}>
                <div className="col-span-3">
                  <label className="ml-3 text-sm font-medium text-navy-700 dark:text-white">
                    Product Name
                  </label>
                  <select
                    id="product_name"
                    name="products"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    onChange={(e) => handleChangeNewProduct(e, id)}
                  >
                    {stocks && stocks.length > 0 ? (
                      stocks.map((product) => (
                        <option
                          key={product.id + product.product_name}
                          value={`${product.product_name}/${product.batch_number}`}
                          selected={
                            productItem.product_name == product.product_name
                          }
                        >
                          {`${product.product_name} B/No. (${product.batch_number})`}
                        </option>
                      ))
                    ) : (
                      <option>...</option>
                    )}
                  </select>
                </div>
                <InputField
                  variant="auth"
                  extra="col-span-3"
                  label="Price*"
                  placeholder="3000"
                  id="price"
                  type="text"
                  value={newProduct[id].price}
                  onChange={(e) => handleChangeNewProduct(e, id)}
                />
                <InputField
                  variant="auth"
                  extra="col-span-2"
                  label="Quantity*"
                  placeholder="30"
                  id="units"
                  type="text"
                  value={newProduct[id].units}
                  onChange={(e) => handleChangeNewProduct(e, id)}
                />
                <InputField
                  variant="auth"
                  extra="col-span-3"
                  label="Available Quantity"
                  placeholder=""
                  id=""
                  type="text"
                  value={newProduct[id].available_quantity}
                />
                <button
                  onClick={() => {
                    addNewProduct('delete', id);
                  }}
                >
                  <MdDelete
                    className="font-bold text-brand-500 dark:text-white"
                    style={{ color: 'red' }}
                  />
                </button>
              </div>
            ))}

          <>
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Total Quantity*"
              placeholder=""
              id="company_name"
              type="text"
              value={totalQunatity}
            />
            <InputField
              variant="auth"
              extra="col-span-6"
              label="Total Price*"
              placeholder=""
              id="company_address"
              type="text"
              value={totalPrice}
            />
          </>

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
            onClick={addOrderFunction}
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Edit order
          </button>
        </div>
      </div>
    </div>
  );
}
