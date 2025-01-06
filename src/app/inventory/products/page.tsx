'use client';
import React from 'react';
import ProductTable from 'components/admin/data-tables/ProductTable';
import tableProduct from 'variables/data-tables/tableProduct';
export default function page() {
  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-6">
        <div>
          <ProductTable
            tableData={tableProduct}
            name="Tirrent Booster"
            page="inventorys"
          />
        </div>
        <div>
          <ProductTable
            tableData={tableProduct}
            name="Fuel Conditionar"
            page="inventorys"
          />
        </div>
        <div>
          <ProductTable
            tableData={tableProduct}
            name="TG-10"
            page="inventorys"
          />
        </div>
        <div>
          <ProductTable
            tableData={tableProduct}
            name="Fuel Conditionar"
            page="inventorys"
          />
        </div>
      </div>
    </>
  );
}
