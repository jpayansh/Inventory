'use client';
import ApiFunction from 'utils/useApi';
import InventoryHistoryTable from 'components/admin/data-tables/InventoryHistoryTable';
import tableInventoryHistory from 'variables/data-tables/tableInventoryHistory';
import { useEffect, useState } from 'react';

const Tables = async () => {
  const [data, setData] = useState([]);
  const tableDataFunction = async () => {
    try {
      const response = await ApiFunction({ url: '/api/orders' });
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
    <div>
      <div className="mt-3">
        <InventoryHistoryTable
          tableData={data}
          name="Inventory History"
          page=""
        />
      </div>
    </div>
  );
};

export default Tables;
