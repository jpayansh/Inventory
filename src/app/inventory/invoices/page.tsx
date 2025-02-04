'use client';
import ApiFunction from 'utils/useApi';
import InventoryHistoryTable from 'components/admin/data-tables/InvoiceHistoryTable';
import { useEffect, useState } from 'react';

const Tables = () => {
  const [data, setData] = useState([]);
  const tableDataFunction = async () => {
    try {
      const response = await ApiFunction({ url: 'invoice' });
      if (!response.success) {
        throw Error('Something went wrong at the time of getting invoice api');
      }
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
          name="Invoice Created"
          page="invoice"
        />
      </div>
    </div>
  );
};

export default Tables;
