'use client';
import ApiFunction from 'utils/useApi';
import InventoryTable from 'components/admin/data-tables/InventoryTable';
import { useEffect, useState } from 'react';

const Tables = () => {
  const [booster, setBooster] = useState([]);
  const [tg, setTg] = useState([]);
  const [grease, setGrease] = useState([]);
  const [conditioner, setConditioner] = useState([]);
  const [tgx, setTgx] = useState([]);
  const tableDataFunction = async () => {
    try {
      const response = await ApiFunction({ url: 'inventory' });
      if (!response.success) {
        throw Error('Something went wrong at the time of getting stocks apis');
      }
      response.data.map((prod) => {
        const { product_name } = prod;

        if (product_name.startsWith('EP')) {
          setGrease((prv) => [...prv, { ...prod }]);
        } else if (product_name.startsWith('TG')) {
          setTg((prv) => [...prv, { ...prod }]);
        } else if (product_name.startsWith('FUEL')) {
          setConditioner((prv) => [...prv, { ...prod }]);
        } else if (product_name.startsWith('TIRRENT')) {
          setBooster((prv) => [...prv, { ...prod }]);
        } else {
          setTgx((prv) => [...prv, { ...prod }]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromTable = async (id) => {
    const data = {
      inventoryID: id,
    };
    console.log({ ...data }, 'dataaa');
    try {
      const response = await ApiFunction({
        url: 'inventory',
        method: 'delete',
        body: { ...data },
      });
      if (!response.success) {
        throw Error(
          'Something went wrong at the time of deleting the stock table product',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('aayaa');

    tableDataFunction();
  }, []);
  console.log(booster, tg, conditioner);

  return (
    <div className="mt-3 grid grid-cols-12 gap-5">
      {booster.length > 0 && (
        <div className="col-span-12">
          <InventoryTable
            deleteFromTable={deleteFromTable}
            tableData={booster}
            name="Tirrent Booster"
            page="stock"
          />
        </div>
      )}
      {conditioner.length > 0 && (
        <div className="col-span-12">
          <InventoryTable
            deleteFromTable={deleteFromTable}
            tableData={conditioner}
            name="Tirrent Fuel Conditioner"
            page="stock"
          />
        </div>
      )}
      {tg.length > 0 && (
        <div className="col-span-12">
          <InventoryTable
            deleteFromTable={deleteFromTable}
            tableData={tg}
            name="TG-10"
            page="stock"
          />
        </div>
      )}
      {grease.length > 0 && (
        <div className="col-span-12">
          <InventoryTable
            deleteFromTable={deleteFromTable}
            tableData={grease}
            name="EP-2 Lithium Complex Grease"
            page="stock"
          />
        </div>
      )}
    </div>
  );
};

export default Tables;
