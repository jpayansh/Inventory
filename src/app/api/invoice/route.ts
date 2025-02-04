import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;
  const orderId = searchParams.get('order_id');
  let query = '';

  try {
    if (orderId) {
      query = `SELECT invoices.created_at, invoices.updated_at,invoices.invoice_number_pre, invoices.invoice_number_mid, invoices.invoice_number,order_products.price, products.packing,products.product_name,order_products.units, order_products.batch_number, orders.total_price,orders.total_units,vendors.company_name,vendors.company_address,vendors.phone_number,vendors.gst_number,order_products.product_id FROM invoices INNER JOIN orders ON orders.id = invoices.order_id INNER JOIN order_products ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id INNER JOIN vendors ON vendors.id = orders.vendor_id WHERE order_products.order_id = ${orderId} AND orders.complete = ${true};`;
    } else {
      query = `SELECT invoices.completed,invoices.invoice_number_pre, invoices.invoice_number_mid, invoices.invoice_number, orders.total_price, orders.id AS order_id, orders.total_units, vendors.company_name, invoices.created_at, invoices.updated_at FROM invoices INNER JOIN orders ON orders.id = invoices.order_id INNER JOIN vendors ON orders.vendor_id = vendors.id WHERE orders.complete = ${true};`;
    }

    const ordersData = await queryDb(query);

    if (!ordersData) {
      return NextResponse.json(
        { message: 'No orders were found', data: [], success: false },
        { status: 404 },
      );
    }

    let BuyerDetails = {
        company_address: ordersData[0].company_address,
        company_name: ordersData[0].company_name,
        gst_number: ordersData[0].gst_number,
        phone_number: ordersData[0].phone_number,
        total_price: ordersData[0].total_price,
        total_units: ordersData[0].total_units,
        invoice_number: `${
          ordersData[0].invoice_number_pre +
          ordersData[0].invoice_number_mid +
          ordersData[0].invoice_number
        }`,
        created_at: ordersData[0].created_at,
      },
      productDetails = ordersData.map((order) => ({
        product_name: order.product_name,
        packing: order.packing,
        price: order.price,
        units: order.units,
        batch_number: order.batch_number,
      }));
    const data = orderId ? { BuyerDetails, productDetails } : ordersData;

    return NextResponse.json(
      {
        message: 'Success',
        data,
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in invoice controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { message: 'Fill order ID ', success: false, data: [] },
        { status: 400 },
      );
    }

    // Start transaction
    await queryDb('BEGIN');

    //invoice number creation starts
    const prevInvoice = await queryDb(
      'SELECT * FROM invoices ORDER BY created_at DESC LIMIT 1;',
    );
    const year = new Date(Date.now()).getFullYear().toString().slice(-2),
      month = new Date(Date.now()).getMonth() + 1,
      day = new Date(Date.now()).getDate();
    let invoice_number;

    if (!prevInvoice.length) {
      invoice_number = 101;
    } else {
      if (
        prevInvoice[0].invoice_number_mid !== year &&
        month === 4 &&
        day === 1
      ) {
        invoice_number = 101;
      } else {
        invoice_number = prevInvoice[0].invoice_number + 1;
      }
    }
    //invoice number created

    const invoiceCreateData = await queryDb(
      'INSERT INTO invoices (order_id , invoice_number_pre , invoice_number_mid , invoice_number) VALUES ($1,$2,$3,$4) RETURNING *;',
      [orderId, 'TG', year, invoice_number],
    );
    if (!invoiceCreateData.length) {
      throw Error(
        'Something went wrong at the time of inserting in POST controller',
      );
    }

    const orderCompleted = await queryDb(
      'UPDATE orders SET complete = $1, updated_at = $2 WHERE id = $3 RETURNING *;',
      [true, new Date(Date.now()).toISOString(), orderId],
    );
    if (!orderCompleted.length) {
      throw Error(
        'Something went wrong at the time of updating complete in orders table POST controller',
      );
    }

    //deleting of product units
    const products = await queryDb(
      'SELECT * FROM order_products WHERE order_id = $1;',
      [orderId],
    );
    if (!products.length) {
      throw Error(
        'Something went wrong at the time of getting products from order_products table POST controller',
      );
    }

    for (const product of products) {
      const quantity = parseInt(product.units);

      const productDetails = await queryDb(
        'UPDATE inventories SET units = units - $1, updated_at = $2 WHERE product_id = $3 AND batch_number = $4 RETURNING *;',
        [
          quantity,
          new Date(Date.now()).toISOString(),
          product.product_id,
          product.batch_number,
        ],
      );

      if (!productDetails.length) throw new Error('Failed to update inventory');
    }

    // Commit transaction
    await queryDb('COMMIT');

    return NextResponse.json(
      { message: 'Success', data: invoiceCreateData, success: true },
      { status: 200 },
    );
  } catch (error) {
    await queryDb('ROLLBACK');
    console.log('Error in invoice controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { invoice_id } = await request.json();
    if (!invoice_id) {
      return NextResponse.json(
        { message: 'Fill Invoice ID ', success: false, data: [] },
        { status: 400 },
      );
    }

    const invoiceCompleted = await queryDb(
      'UPDATE invoices SET completed = $1, updated_at = $2 WHERE order_id = $3 RETURNING *;',
      [true, new Date(Date.now()).toISOString(), invoice_id],
    );

    console.log(invoiceCompleted);
    if (!invoiceCompleted.length) {
      throw new Error('Failed to update invoices table to update completed');
    }

    return NextResponse.json(
      { message: 'Success', data: invoiceCompleted, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in invoice controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
