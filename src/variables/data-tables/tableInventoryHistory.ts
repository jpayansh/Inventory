type RowObj = {
  buyerAddress: string;
  address: string;
  gstn: string;
  invoicenumber: string;
  invoicedate: string;
  batchnumber: string;
  statecode: number;
  Productname: string;
  price: number;
  quantity: [number, string];
  units: number;
  Totalamount: number;
};
const tableProduct: RowObj[] = [
  {
    buyerAddress: 'ACI Logistic Company',
    address: 'Bhilwara',
    gstn: 'JHBJKB099809HJK',
    invoicenumber: 'TG/01/445',
    invoicedate: '02-03-2024',
    batchnumber: 'TB0900',
    statecode: 08,
    Productname: 'TG001TB',
    price: 1200,
    quantity: [250, 'ml'],
    units: 3,
    Totalamount: 3600,
  },
];

const tableInventoryHistory: RowObj[] = [];
export default tableInventoryHistory;
