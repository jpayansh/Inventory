'use client';

import React, { useEffect, useState } from 'react';
import ProductTable from 'components/admin/data-tables/ProductTable';
import ApiFunction from 'utils/useApi';
import tableProduct from 'variables/data-tables/tableProduct';

export default function Page() {
  const [data, setData] = useState([]);

  // Fetch data from API
  const fetchTableData = async () => {
    try {
      const response = await ApiFunction({ url: '/api/products' }); // Replace with actual endpoint
      console.log(data, 'lkl');
      setData(response?.data || []); // Assuming response.data contains your array of products
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-6">
      {/* Dynamic Data Table */}
      <div>
        <ProductTable
          tableData={data} // Pass API data here
          name="Tirrent"
          page=""
        />
       
      </div>
    </div>
  );
}
