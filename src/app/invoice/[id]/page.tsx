'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Logo from '/public/img/logo/logo.png';
import ApiFunction from 'utils/useApi';
import { MdDownload, MdHome } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToWords } from 'to-words';
function Page({ params }: { params: { id: string } }) {
  const [productDetails, setProductDetails] = useState([]);
  const router = useRouter();
  const [BuyerDetails, setBuyerDetails] = useState({
    company_address: '',
    company_name: '',
    gst_number: '',
    phone_number: '',
    total_price: '',
    total_units: 0,
  });
  const printRef = useRef(null);
  const words = new ToWords();
  let amountInWords;
  const tableDataFunction = async () => {
    try {
      const response = await ApiFunction({
        url: `invoice?order_id=${params.id}`,
      });
      if (!response.success) {
        throw Error(
          'Something went wrong at the time of get api for getting invoice information',
        );
      }
      setBuyerDetails({ ...response.data.orderData });
      setProductDetails([...response.data.productData]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloardPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL('imgae/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a5',
    });
    const imgProperties = pdf.getImageProperties(data);
    const pdfwidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfwidth) / imgProperties.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfwidth, pdfHeight);
    pdf.save('invoice.pdf');
  };
  const seller = {
    name: 'TIRRENT GLOBAL PVT LTD',
    address: 'Bhilwara (Rajasthan), 311001',
    gstn: '08AAJCT0378M1ZP',
    phone: '7737331338',
    email: 'support@tirrentglobal.com',
  };
  useEffect(() => {
    tableDataFunction();
  }, []);

  const gstRate = 18;

  return (
    <div className='className="h-full w-full font-dm dark:bg-navy-900'>
      <div className="mt-5 flex justify-around gap-2">
        <button
          className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80"
          onClick={() => router.replace('/inventory/default')}
        >
          <span className="text-brand-500 dark:text-white">
            <MdHome className="h-5 w-5" />
          </span>
          <span className="text-md font-bold ">Go to Dashboard</span>
        </button>

        <button
          onClick={handleDownloardPdf}
          className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-white p-2 transition  duration-200 hover:cursor-pointer hover:opacity-90 dark:!bg-navy-800 dark:text-white dark:hover:opacity-80"
        >
          <span className="text-brand-500 dark:text-white">
            <MdDownload className="h-5 w-5" />
          </span>
          <span className="text-md font-bold ">Download PDF</span>
        </button>
      </div>
      <main
        className="mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[300px] xl:mr-[300px]"
        ref={printRef}
      >
        <div className="border-black-200 max-w-full rounded-lg bg-white p-5">
          <h1 className="mb-5 text-center text-[22px] font-bold">
            TAX INVOICE
          </h1>
          <div className="mb-5">
            <Image
              className="mb-3 h-full w-[120px] rounded-xl 3xl:h-full 3xl:w-full"
              src={Logo}
              alt="Company-Logo"
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
            <div className="mb-5 bg-yellow-100 pb-10 pl-8 pr-8 pt-10 leading-relaxed">
              <p>
                <strong>Invoice Date:</strong> -
              </p>
              <p>
                <strong>Invoice Number:</strong> -
              </p>
            </div>
          </div>
          <div className="text-[14px]">
            <p>
              <strong>Buyer : {BuyerDetails.company_name}</strong>
            </p>
            <p>
              <span>Address : {BuyerDetails.company_address}</span>
            </p>
            <p>
              <span>GSTN : {BuyerDetails.gst_number}</span>
            </p>
            <p>
              <span>Phone No : {BuyerDetails.phone_number}</span>
            </p>
          </div>
          <table className="mb-5 mt-5 w-full">
            <thead className="border border-gray-900 text-center">
              <tr className="border border-gray-900 bg-yellow-500">
                <th className="border border-gray-900 p-1">S/n</th>
                <th className="border border-gray-900 p-1">Product</th>
                <th className="border border-gray-900 p-1">Rate</th>
                <th className="border border-gray-900 p-1">Units</th>
                <th className="border border-gray-900 p-1">Batch No.</th>
                <th className="border border-gray-900 p-1">Amount</th>
              </tr>
            </thead>
            <tbody className="border border-gray-900 text-center">
              {productDetails.length > 0 &&
                productDetails.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-900 p-1">{index + 1}</td>
                    <td className="border border-gray-900 p-1">
                      {product.product_name}
                    </td>
                    <td className="border border-gray-900 p-1">
                      {product.price}
                    </td>
                    <td className="border border-gray-900 p-1">
                      {product.units}
                    </td>
                    <td className="border border-gray-900 p-1">
                      {product.batch_number}
                    </td>
                    <td className="border  border-gray-900 p-1">
                      ₹ {parseInt(product.price) * product.units}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="text-right">
            <h6>
              Total units =
              <span className="w-full"> {BuyerDetails.total_units}</span>
            </h6>
            <h6>
              Total Amount =
              <span className="w-full">
                {parseInt(BuyerDetails.total_price).toFixed(0)}
              </span>
            </h6>
          </div>
          <div className="p-2">
            <p>Amount chargeable (in Word) =</p>
            <h6 className="font-bold">
              {BuyerDetails.total_price &&
                words.convert(Math.floor(parseFloat(BuyerDetails.total_price)))}
            </h6>
          </div>
          <table className="w-full border-collapse">
            <tbody className="border border-gray-300 text-left">
              <tr>
                <td className="border border-gray-300 p-1">Total Amount</td>
                <td className="p-1">
                  {parseInt(BuyerDetails.total_price).toFixed(0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Page;
