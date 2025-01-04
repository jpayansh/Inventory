'use client';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import ApiFunction from 'utils/useApi';

const Tables = async () => {
  const data = await ApiFunction({ endPoint: 'https://dummyjson.com/test' });
  console.log(data, 'api custtom hook');

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
        <CheckTable tableData={tableDataCheck} />
        <CheckTable tableData={tableDataCheck} />
        <CheckTable tableData={tableDataCheck} />
        <CheckTable tableData={tableDataCheck} />
      </div>
    </div>
  );
};

export default Tables;
