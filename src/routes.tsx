import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdFilter9Plus,
  MdFileCopy,
} from 'react-icons/md';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/inventory',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  {
    name: 'Inventory',
    layout: '/inventory',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables',
  },

  {
    name: 'GenerateInvoice',
    layout: '/inventory',
    icon: <MdFileCopy className="h-6 w-6" />,
    path: 'generate-invoice',
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
