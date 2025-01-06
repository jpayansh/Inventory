'use client';
import tableInventory from 'variables/data-tables/tableInventory';
import CheckTable from 'components/admin/data-tables/CheckTable';
import ApiFunction from 'utils/useApi';
import InventoryTable from 'components/admin/data-tables/InventoryTable';

const Tables = async () => {
  const data = await ApiFunction({ endPoint: 'https://dummyjson.com/test' });
  console.log(data, 'api custtom hook');

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-6">
        <InventoryTable tableData={tableInventory} name='Tirrent Booster' page='' />
        <InventoryTable tableData={tableInventory} name='Fuel Conditioner' page='' />
        <InventoryTable tableData={tableInventory} name='TG-10' page='' />
        <InventoryTable tableData={tableInventory} name='Grease' page='' /> 
      </div>
    </div>
  );
};

export default Tables;
