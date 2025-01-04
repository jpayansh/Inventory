'use client';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard, MdLibraryAdd } from 'react-icons/md';

import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';

import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import NavLink from 'components/link/NavLink';

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}
      <div className="mt-5 flex gap-2">
        <NavLink key="add-inventoryyyy" href="add-inventory">
          <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
            <span className="text-brand-500 dark:text-white">
              <MdLibraryAdd />
            </span>
            <span className="text-md font-bold ">Add Inventory</span>
          </button>
        </NavLink>
        <NavLink key="create-new-orderrr" href="create-order">
          <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
            <span className="text-brand-500 dark:text-white">
              <MdLibraryAdd />
            </span>
            <span className="text-md font-bold ">Create New Order</span>
          </button>
        </NavLink>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Earnings'}
          subtitle={'$340.5'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Spend this month'}
          subtitle={'$642.39'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Sales'}
          subtitle={'$574.34'}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Your Balance'}
          subtitle={'$1,000'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'New Tasks'}
          subtitle={'145'}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'Total Projects'}
          subtitle={'$2433'}
        />
      </div>

      {/* Charts */}

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 ">
        {/* Check Table */}
        <div>
          <CheckTable tableData={tableDataCheck} />
        </div>

        {/* Traffic chart & Pie Chart */}

        {/* Complex Table , Task & Calendar */}

        <ComplexTable tableData={tableDataComplex} />

        {/* Task chart & Calendar */}
      </div>
    </div>
  );
};

export default Dashboard;
