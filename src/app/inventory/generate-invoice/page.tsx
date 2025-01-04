'use client';

import Image from 'next/image';
import { useState } from 'react';
import Logo from '/public/img/logo/logo.png';
import {
  Md1KPlus,
  Md5KPlus,
  MdAdd,
  MdAddAlert,
  MdAddCircleOutline,
  MdAssignmentAdd,
  MdCancel,
  MdCancelScheduleSend,
  MdHdrPlus,
  MdOutline1KPlus,
} from 'react-icons/md';
function Page() {
  const [buyer, setBuyer] = useState('');
  const [address, setAddress] = useState('');
  const [gstn, setGstn] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [products, setProducts] = useState([
    { name: '', rate: 0, units: 0, amount: 0 },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    date: new Date().toLocaleDateString(),
    invoiceNumber: 1,
    stateCode: 311001,
  });

  const seller = {
    name: 'TIRRENT GLOBAL PVT LTD',
    address: 'Bhilwara (Rajasthan), 311001',
    gstn: '08AAJCT0378M1ZP',
    phone: '7737331338',
    email: 'support@tirrentglobal.com',
  };

  const gstRate = 18;

  return (
    <div className="max-w-full rounded-lg  bg-white p-5">
      <h1 className="mb-5 text-center text-[22px] font-bold text-gray-700">
        TAX INVOICE
      </h1>
      <div className="mb-5">
        <Image
          // width="1"
          // height="20"
          className="mb-3 h-full w-[120px] rounded-xl 3xl:h-full 3xl:w-full"
          src={Logo}
          alt=""
        />
      </div>
      <div className="text-black-900 flex justify-between">
        <div className="text-[14px]">
          <h3 className="font-bold">{seller.name}</h3>
          <p>{seller.address}</p>
          <p>GST No: {seller.gstn}</p>
          <p>M.No.: {seller.phone}</p>
          <p>Email: {seller.email}</p>
        </div>
        <div
          className="mb-5 bg-yellow-100 pb-10 pl-8 pr-8 pt-10 leading-relaxed"
          // style={{ backgroundColor: '#000' }}
        >
          <p>
            <strong>Invoice Date:</strong> {invoiceDetails.date}
          </p>
          <p>
            <strong>Invoice Number:</strong> {invoiceDetails.invoiceNumber}
          </p>
          <p>
            <strong>Batch Number:</strong>{' '}
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              placeholder="Enter Batch Number"
            />
          </p>
          <p>
            <strong>State Code:</strong> {invoiceDetails.stateCode}
          </p>
        </div>
      </div>
      <div className="text-[14px]">
        <p>
          <strong>Buyer : </strong>
          <input
            type="text"
            // value={buyer}
            // onChange={(e) => setBuyer(e.target.value)}
            placeholder="Buyer Company Name"
          />
        </p>
        <p>
          <span>Add : </span>
          <input
            type="text"
            // value={address}
            // onChange={(e) => setAddress(e.target.value)}
            placeholder="Buyer Address"
          />
        </p>
        <p>
          <span>GSTN : </span>
          <input
            type="text"
            // value={gstn}
            // onChange={(e) => setGstn(e.target.value)}
            placeholder="Buyer GSTN"
          />
        </p>
      </div>
      <table className="mb-5 mt-5 w-full">
        <thead className="border border-gray-900 p-2 text-center">
          <tr className="border border-gray-900 bg-yellow-500">
            <th className="border border-gray-900"></th>
            <th className="border border-gray-900">Products</th>
            <th className="border border-gray-900">Rate</th>
            <th className="border border-gray-900 ">Units</th>
            <th className="border border-gray-900 ">Amount</th>
            <th className="border border-gray-900"></th>
          </tr>
        </thead>
        <tbody className="border border-gray-900 p-2 text-center">
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <button>
                  <MdAddCircleOutline
                    className="font-bold text-brand-500 dark:text-white"
                    style={{ color: 'green' }}
                  />
                </button>
              </td>
              <td className="border border-gray-900">
                <input
                  type="text"
                  value={product.name}
                  className="w-full p-2
"
                  // onChange={(e) =>
                  //   handleProductChange(index, 'name', e.target.value)
                  // }
                  placeholder="Product Name"
                />
              </td>
              <td className="border border-gray-900">
                <input
                  type="number"
                  value={product.rate}
                  className=" p-2
"
                  // onChange={(e) =>
                  //   handleProductChange(index, 'rate', Number(e.target.value))
                  // }
                />
              </td>
              <td className="border border-gray-900">
                <input
                  type="number"
                  value={product.units}
                  className=" p-2
"
                  // onChange={(e) =>
                  //   handleProductChange(index, 'units', Number(e.target.value))
                  // }
                />
              </td>
              <td className="border  border-gray-900">
                <span className="w-full"> ₹{product.amount.toFixed(2)}</span>
              </td>
              <td>
                <button>
                  <MdCancel
                    className="font-bold text-brand-500 dark:text-white"
                    style={{ color: 'red' }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button className="mb-5 mt-5 block cursor-pointer rounded-md border-none bg-green-500 px-4 py-2 text-white hover:bg-green-700">
        Add Product
      </button> */}
      <div className="text-right">
        <h6>
          Total= <span className="w-full">117,428</span>
        </h6>
      </div>
      <div className="">
        <p>Amount chargeable (in Word)=</p>
        <h6 className="font-bold">One lakh seven thousand only</h6>
      </div>
      {/* <table className="w-full border-collapse">
        <tbody className="border border-gray-300 p-2 text-left">
          <tr>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
            <td>Total</td>
            <td>237987</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Page;
