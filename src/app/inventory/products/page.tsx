'use client';
import ApiFunction from 'utils/useApi';
import InventoryTable from 'components/admin/data-tables/ProductTable';
import { useEffect, useState } from 'react';

const Tables = () => {
  const [data, setData] = useState([]);
  const tableDataFunction = async () => {
    try {
      const response = await ApiFunction({ url: 'products' });
      console.log(response, 'product Data');
      setData(response.data);
      console.log(response, 'res');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tableDataFunction();
  }, []);

  return (
    <div className="mt-3 grid grid-cols-12 gap-5">
      <div className="col-span-12">
        <InventoryTable tableData={data} name="Products" page="products" />
      </div>
    </div>
  );
};

export default Tables;
