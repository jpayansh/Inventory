import pool from 'helper/postgres';

// export const inventory = [
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
//   {
//     id: 1,
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     date: Date.now(),
//     totalPrice: 5000,
//     location: 'Bhilwara',
//     totalQuantity: 6,
//   },
// ];

// export const products = [
//   {
//     name: 'Tirrent Booster',

//     quantities: [
//       { quantity: 50, code: 'TG005TB', price: 500 },
//       { quantity: 250, code: 'TG001TB', price: 2500 },
//       { quantity: 4000, code: 'TG040TB', price: 4000 },
//       { quantity: 19000, code: 'TG001TB', price: 19000 },
//       { quantity: 208000, code: 'TG001TB', price: 208000 },
//     ],
//     siUnit: 'ml',
//   },

//   {
//     name: 'Fuel Conditioner',

//     quantities: [
//       { quantity: 40, code: 'TG005FC', price: 400 },
//       { quantity: 355, code: 'TG001FC', price: 3550 },

//       { quantity: 19000, code: 'TG001FC', price: 19000 },
//       { quantity: 208000, code: 'TG001FC', price: 208000 },
//     ],
//     siUnit: 'ml',
//   },
//   {
//     name: 'Spray',
//     quantities: [
//       { quantity: 100, code: 'TG005TG', price: 1000 },
//       { quantity: 200, code: 'TG001TG', price: 2000 },
//       { quantity: 4000, code: 'TG040TG', price: 4000 },
//       { quantity: 19000, code: 'TG001TG', price: 19000 },
//       { quantity: 20800, code: 'TG001TG', price: 208000 },
//     ],
//     siUnit: 'ml',
//   },
//   {
//     name: 'Grease',

//     quantities: [
//       { quantity: 400, code: 'TG005TB', price: 400 },
//       { quantity: 1000, code: 'TG001TB', price: 1000 },
//       { quantity: 4000, code: 'TG040TB', price: 4000 },
//       { quantity: 16000, code: 'TG001TB', price: 16000 },
//       { quantity: 19000, code: 'TG001TB', price: 19000 },
//     ],
//     siUnit: 'gm',
//   },
//   {
//     name: 'Machine Tester',

//     quantity: [],
//     siUnit: 'kg',

//     price: 2500,
//   },
// ];

// export const orders = [
//   {
//     companyName: 'Global private limited',
//     buyerAddress: 'Transport Nagar',
//     mobileNumber: 918306027461,
//     email: 'Global@gmail.com',
//     gstNumber: '22AAAAA0000A1ZB',
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     totalPrice: 5000,
//     totalQuantity: 6,
//     date: Date.now(),
//   },
//   {
//     companyName: 'Global private limited',
//     buyerAddress: 'Transport Nagar',
//     mobileNumber: 918306027461,
//     email: 'Global@gmail.com',
//     gstNumber: '22AAAAA0000A1ZB',
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     totalPrice: 5000,
//     totalQuantity: 6,
//     date: Date.now(),
//   },
//   {
//     companyName: 'Global private limited',
//     buyerAddress: 'Transport Nagar',
//     mobileNumber: 918306027461,
//     email: 'Global@gmail.com',
//     gstNumber: '22AAAAA0000A1ZB',
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     totalPrice: 5000,
//     totalQuantity: 6,
//     date: Date.now(),
//   },
//   {
//     companyName: 'Global private limited',
//     buyerAddress: 'Transport Nagar',
//     mobileNumber: 918306027461,
//     email: 'Global@gmail.com',
//     gstNumber: '22AAAAA0000A1ZB',
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     totalPrice: 5000,
//     totalQuantity: 6,
//     date: Date.now(),
//   },
//   {
//     companyName: 'Global private limited',
//     buyerAddress: 'Transport Nagar',
//     mobileNumber: 918306027461,
//     email: 'Global@gmail.com',
//     gstNumber: '22AAAAA0000A1ZB',
//     products: [
//       {
//         name: 'TG-10',
//         units: 2,
//         quantity: '4 liter',
//         code: 'TG040TB',
//         price: 3000,
//         batchNumber: 3,
//       },
//       {
//         name: 'Grease',
//         units: 4,
//         quantity: '1 kg',
//         code: 'TG010EP',
//         price: 2000,
//         batchNumber: 1,
//       },
//     ],
//     totalPrice: 5000,
//     totalQuantity: 6,
//     date: Date.now(),
//   },
// ];

// export const users = [
//   {
//     id: 1,
//     name: 'tirrent',
//     password: 'global',
//   },
// ];

export default async function queryDb(query: string, values: any[] = []) {
  const dataBaseInstance = await pool.connect();
  try {
    const result = await dataBaseInstance.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error in connecting DB --> ', error.message);
    process.exit(1);
  } finally {
    dataBaseInstance.release();
  }
}
