import React, { useState } from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
import { FiSearch } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import avatar from '/public/img/avatars/avatar4.png';
import Image from 'next/image';
import { MdLibraryAdd } from 'react-icons/md';
import ApiFunction from 'utils/useApi';
import { useRouter } from 'next/navigation';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  pathname?: string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered, pathname } = props;

  const router = useRouter();

  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark'),
  );
  const logOut = async () => {
    try {
      const resposne = await ApiFunction({ url: 'logout' });
      if (resposne.success) {
        router.push('/login');
      }
      throw Error(resposne.message);
    } catch (error) {
      console.log('error in logout api function --> ', error);
    }
  };
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      {pathname === '/inventory/default' ? (
        <>
          <div className="ml-[6px]">
            <div className="h-6 w-[224px] pt-1">
              <a
                className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                href=" "
              >
                Inventory
                <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                  {' '}
                  /{' '}
                </span>
              </a>
              <NavLink
                className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                href="#"
              >
                {brandText}
              </NavLink>
            </div>
            <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
              <NavLink
                href="#"
                className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
              >
                {brandText}
              </NavLink>
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            <NavLink key="add-inventoryyyy" href="/inventory/stock/add">
              <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
                <span className="text-brand-500 dark:text-white">
                  <MdLibraryAdd />
                </span>
                <span className="text-md font-bold ">Add Stock</span>
              </button>
            </NavLink>
            <NavLink key="create-new-orderrr" href="/inventory/orders/add">
              <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
                <span className="text-brand-500 dark:text-white">
                  <MdLibraryAdd />
                </span>
                <span className="text-md font-bold ">Create Order</span>
              </button>
            </NavLink>
            <NavLink key="add-product" href="/inventory/products/add">
              <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
                <span className="text-brand-500 dark:text-white">
                  <MdLibraryAdd />
                </span>
                <span className="text-md font-bold ">Add Product</span>
              </button>
            </NavLink>
            <NavLink key="add-vendor" href="/inventory/vendors/add">
              <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
                <span className="text-brand-500 dark:text-white">
                  <MdLibraryAdd />
                </span>
                <span className="text-md font-bold ">Add Vendor</span>
              </button>
            </NavLink>
          </div>
        </>
      ) : (
        <div className="mt-5 flex gap-2">
          <NavLink key="add-inventoryyyy" href="/inventory/stock/add">
            <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
              <span className="text-brand-500 dark:text-white">
                <MdLibraryAdd />
              </span>
              <span className="text-md font-bold ">Add Stock</span>
            </button>
          </NavLink>
          <NavLink key="create-new-orderrr" href="/inventory/orders/add">
            <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
              <span className="text-brand-500 dark:text-white">
                <MdLibraryAdd />
              </span>
              <span className="text-md font-bold ">Create Order</span>
            </button>
          </NavLink>
          <NavLink key="add-product" href="/inventory/products/add">
            <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
              <span className="text-brand-500 dark:text-white">
                <MdLibraryAdd />
              </span>
              <span className="text-md font-bold ">Add Product</span>
            </button>
          </NavLink>
          <NavLink key="add-vendor" href="/inventory/vendors/add">
            <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80">
              <span className="text-brand-500 dark:text-white">
                <MdLibraryAdd />
              </span>
              <span className="text-md font-bold ">Add Vendor</span>
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
