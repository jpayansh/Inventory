import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdFileCopy,
  MdOutlineReorder,
  MdOutlinePeople,
} from 'react-icons/md';

const routes = [
  {
    name: 'Dashboard',
    layout: '/inventory',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Products',
    layout: '/inventory',
    path: 'products',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Stocks',
    layout: '/inventory',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'stock',
  },
  {
    name: 'Orders',
    layout: '/inventory',
    icon: <MdOutlineReorder className="h-6 w-6" />,
    path: 'orders',
  },
  {
    name: 'Invoices',
    layout: '/inventory',
    icon: <MdFileCopy className="h-6 w-6" />,
    path: 'invoices',
  },
  {
    name: 'Vendors',
    layout: '/inventory',
    icon: <MdOutlinePeople className="h-6 w-6" />,
    path: 'vendors',
  },

  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: 'profile',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
];
export default routes;
