'use client';
import InputField from 'components/fields/InputField';
import ApiFunction from 'utils/useApi';
import { useContext, useEffect, useState } from 'react';
import Card from 'components/card';
import { DataContext } from 'contexts/DataContext';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';

function SignInDefault() {
  const router = useRouter();
  const { products } = useContext<any>(DataContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQunatity, setTotalQuantity] = useState(0);
  const [newProduct, setNewProduct] = useState([
    {
      price: '',
      units: '',
      product_id: '',
      batch_number: '',
      packing: 'gm',
    },
  ]);
  const addNewProduct = (type: string = '', id: number = undefined) => {
    if (type === 'add') {
      setNewProduct((prv) => [
        ...prv,
        {
          product_id: products[0].id,
          price: '',
          units: '',
          batch_number: '',
          packing: products[0].packing,
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
  const addInventoryFunction = async () => {
    const data = {
      total_price: totalPrice,
      total_units: totalQunatity,

      products: newProduct,
    };
    console.log(data, 'dataaa');

    try {
      const response = await ApiFunction({
        method: 'post',
        url: 'inventory',
        body: { ...data },
      });

      if (!response.success) {
        throw Error(response.message);
      }
      router.replace('/inventory/stock');
      setNewProduct((prv) => [
        {
          price: '',
          units: '',
          product_id: products[0].id,
          batch_number: '',
          packing: products[0].packing,
        },
      ]);
      setTotalPrice(0);
      setTotalQuantity(0);
    } catch (error) {
      console.log('error in create order api --> ', error);
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
            ? { ...product, product_id: prod[0].id, packing: prod[0].packing }
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
  useEffect(() => {
    if (products.length > 0) {
      setNewProduct((prv) => [
        {
          ...prv[0],
          product_id: products[0].id,
          packing: products[0].packing,
        },
      ]);
    }
  }, [products]);

  return (
    <>
      <Card mt-5>
        <div className="mb-8 mt-8 flex h-full w-full items-center justify-center px-6 lg:mb-8 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
            <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
              Enter items to add to Stock
            </h3>
            <div className="m-2 flex items-center">
              <button
                className="linear flex items-center justify-center gap-1 rounded-lg bg-gray-200 p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80"
                onClick={() => {
                  addNewProduct('add');
                }}
              >
                <span className="text-brand-500 dark:text-white">
                  <MdAddCircleOutline style={{ color: 'green' }} />
                </span>
                <span className="text-sm font-medium">Add</span>
              </button>
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
                    extra="col-span-2"
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
                    extra="col-span-2"
                    label="Batch Number*"
                    placeholder="1"
                    id="batch_number"
                    type="number"
                    value={newProduct[id].batch_number}
                    onChange={(e) => handleChangeNewProduct(e, id)}
                  />
                  <InputField
                    variant="auth"
                    extra="col-span-2"
                    label="Packing*"
                    placeholder="100 gm"
                    id=""
                    type="text"
                    value={newProduct[id].packing}
                  />

                  <div className="mb-1 flex items-end justify-center">
                    <button
                      onClick={() => addNewProduct('delete', id)}
                      className="linear flex items-center justify-center rounded-lg bg-gray-200 p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80"
                    >
                      <span className="text-brand-500 dark:text-white">
                        <MdDelete style={{ color: 'red' }} />
                      </span>
                      <span className="text-sm font-bold ">Delete</span>
                    </button>
                  </div>
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

            <button
              onClick={addInventoryFunction}
              className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Add Stock
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default SignInDefault;
