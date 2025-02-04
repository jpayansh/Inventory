'use client';
import ApiFunction from 'utils/useApi';
import InventoryTable from 'components/admin/data-tables/OrdersTable';
import { useEffect, useState } from 'react';

const Tables = () => {
  const [data, setData] = useState([]);
  const tableDataFunction = async () => {
    try {
      const response = await ApiFunction({ url: 'orders' });
      if (!response.success) {
        throw Error(
          'Something went wrong at the time of getting orders history api',
        );
      }
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tableDataFunction();
  }, []);

  console.log(data, 'dataaa');

  return (
    <div className="mt-3 grid grid-cols-12 gap-5">
      <div className="col-span-12">
        <InventoryTable
          tableData={data}
          name="Performer Invoice/Orders History"
          page="orders"
        />
      </div>
    </div>
  );
};

export default Tables;
