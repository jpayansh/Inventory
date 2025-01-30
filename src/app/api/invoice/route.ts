import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;
  const order_id = searchParams.get('order_id');
  try {
    if (!order_id) {
      throw Error('Empty Order ID in get controller ');
    }
    const orderData = await queryDb(
      'SELECT orders.total_units, orders.total_price, vendors.company_name, vendors.company_address, vendors.phone_number, vendors.gst_number FROM orders INNER JOIN vendors ON vendors.id = orders.vendor_id WHERE orders.id = $1;',
      [order_id],
    );
    const productData = await queryDb(
      'SELECT order_products.price, order_products.units, order_products.batch_number, products.product_name, products.sku_id FROM order_products INNER JOIN products ON products.id = order_products.product_id WHERE order_products.order_id = $1;',
      [order_id],
    );
    // const invoice_number=await queryDb('SELECT invoices.created_at invoices.invoice_number_pre invoices.invoice_number_mid invoices.invoice_number FROM invoices WHERE order_id = $1;',[order_id])

    if (!orderData.length || !productData.length) {
      throw Error('Cannot fetch the respected order details or vendor details');
    }

    return NextResponse.json(
      {
        message: 'Success',
        data: { orderData: { ...orderData[0] }, productData },
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
        { message: 'Fill order ID or product ID', success: false, data: [] },
        { status: 400 },
      );
    }

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

    const invoiceCreateData = await queryDb(
      'INSERT INTO invoices (order_id , invoice_number_pre , invoice_number_mid , invoice_number) VALUES ($1,$2,$3,$4) RETURNING *;',
      [orderId, 'TG', year, invoice_number],
    );
    if (!invoiceCreateData.length) {
      throw Error(
        'Something went wrong at the time of inserting in POST controller',
      );
    }

    return NextResponse.json(
      { message: 'Success', data: invoiceCreateData, success: true },
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
