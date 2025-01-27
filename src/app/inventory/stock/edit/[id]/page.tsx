'use client';
import Card from 'components/card';
import Checkbox from 'components/checkbox';
import InputField from 'components/fields/InputField';
import { DataContext } from 'contexts/DataContext';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import ApiFunction from 'utils/useApi';

export default function Page() {
  const { products } = useContext<any>(DataContext);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQunatity, setTotalQuantity] = useState(0);
  const [newProduct, setNewProduct] = useState<any>();

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

  const editInventoryFunction = async () => {
    const data = {
      total_price: totalPrice,
      total_units: totalQunatity,
      products: newProduct,
      inventory_id: id,
    };
    console.log(data, 'dataaa');

    try {
      const response = await ApiFunction({
        method: 'put',
        url: 'inventory',
        body: { ...data },
      });

      if (!response.success) {
        throw Error(response.message);
      }
      router.push('stock');
    } catch (error) {
      console.log('error in create order api --> ', error);
    }
  };

  const fetchOrder = useCallback(async () => {
    let productData;
    try {
      const response = await ApiFunction({
        method: 'get',
        url: `inventory?inventory_id=${id}`,
      });

      if (!response.success) {
        throw Error('Something went wrong in get order by id in edit orders');
      }
      console.log(response, 'responseee');
      setTotalPrice(response.data[0].total_price);
      setTotalQuantity(response.data[0].total_units);
      productData = response?.data.map((product) => ({
        price: product.price,
        units: product.units,
        product_id: product.product_id,
        batch_number: product.batch_number,
      }));
      setNewProduct([...productData]);
    } catch (error) {
      console.log('error in get in edit orders --> ', error);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className="mt-5 rounded-[20px] bg-white p-5">
      <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
        <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
          Edit Stock
        </h3>
        <Card mt-5>
          <div className="mb-8 mt-8 flex h-full w-full items-center justify-center px-6 lg:mb-8 lg:items-center lg:justify-start">
            {/* Sign in section */}
            <div className="mt-4 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 ">
              <h3 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white">
                Enter items to edit Stock
              </h3>
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
                              selected={product.id === productItem.product_id}
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

              <button
                onClick={editInventoryFunction}
                className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Edit Stock
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
