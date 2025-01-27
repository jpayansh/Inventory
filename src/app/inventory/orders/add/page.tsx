'use client';
import InputField from 'components/fields/InputField';
import Checkbox from 'components/checkbox';
import ApiFunction from 'utils/useApi';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from 'contexts/DataContext';
import { MdAddCircleOutline, MdCancel, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function SignInDefault() {
  const router = useRouter();
  const { products, vendors } = useContext<any>(DataContext);
  const [vendor, setVendor] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQunatity, setTotalQuantity] = useState(0);
  const [newProduct, setNewProduct] = useState([
    {
      price: '',
      units: '',
      product_id: '',
      batch_number: '',
    },
  ]);

  const setVendorValues = (e) => {
    const { value } = e.target;
    const obj = vendors.filter((company) => company.company_name === value);
    setVendor(obj[0].id);
  };

  const addNewProduct = (type: string = '', id: number = undefined) => {
    if (type === 'add') {
      setNewProduct((prv) => [
        ...prv,
        {
          product_id: products[0].id,
          price: '',
          units: '',
          batch_number: '',
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

  const handleChangeNewProduct = (e, index: any) => {
    const { id, value } = e.target;
    setNewProduct((prev) => {
      let updatedProducts;
      if (id == 'product_name') {
        const prod = products.filter(
          (product) => product.product_name == value,
        );

        updatedProducts = prev.map((product, productIndex) =>
          productIndex === index
            ? { ...product, product_id: prod[0].id }
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
      vendor_id: vendor,
      products: newProduct,
    };
    console.log(data, 'dataaa');

    try {
      const response = await ApiFunction({
        method: 'post',
        url: 'orders',
        body: { ...data },
      });

      if (!response.success) {
        throw Error(response.message);
      }
      router.replace('/inventory/orders');
    } catch (error) {
      console.log('error in create order api --> ', error);
    } finally {
      setNewProduct((prv) => [
        {
          price: '',
          units: '',
          product_id: products[0].id,
          batch_number: '',
        },
      ]);
      setVendor(vendors[0].id);
      setTotalPrice(0);
      setTotalQuantity(0);
    }
  };

  useEffect(() => {
    if (vendors.length > 0 && products.length > 0) {
      setNewProduct((prv) => [{ ...prv[0], product_id: products[0].id }]);
      setVendor(vendors[0].id);
      console.log(products);
    }
  }, [vendors, products]);

  return (
    <>
      <div className="mt-5 rounded-[20px] bg-white p-5">
        <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
          <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
            Add New Order
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
                {vendors && vendors.length > 0 ? (
                  vendors.map((vendor) => (
                    <option
                      key={vendor.id + vendor.company_name}
                      value={vendor.company_name}
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
                      {products && products.length > 0 ? (
                        products.map((product) => (
                          <option
                            key={product.id + product.product_name}
                            value={product.product_name}
                          >
                            {product.product_name}
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
                    label="Batch Number*"
                    placeholder="1"
                    id="batch_number"
                    type="text"
                    value={newProduct[id].batch_number}
                    onChange={(e) => handleChangeNewProduct(e, id)}
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
              Create order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
