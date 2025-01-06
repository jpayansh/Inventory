'use client';
import ApiFunction from 'utils/useApi';
import InventoryHistoryTable from 'components/admin/data-tables/InventoryHistoryTable';
import tableInventoryHistory from 'variables/data-tables/tableInventoryHistory';

const Tables = async () => {
  const data = await ApiFunction({ endPoint: 'https://dummyjson.com/test' });
  console.log(data, 'api custtom hook');

  return (
    <div>
      <div className="mt-3">
        <InventoryHistoryTable tableData={tableInventoryHistory} name='Inventory History' page='' />
         
      </div>
    </div>
  );
};

export default Tables;
