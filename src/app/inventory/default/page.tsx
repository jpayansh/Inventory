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
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}
     

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Invoice'}
          subtitle={'340'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Pendin Invoice'}
          subtitle={'642'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Sales'}
          subtitle={'574'}
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
        <ColumnsTable tableData={tableDataComplex} />
        {/* <DevelopmentTable tableData={tableDataComplex} /> */}

        {/* Task chart & Calendar */}
      </div>
    </div>
  );
};

export default Dashboard;
