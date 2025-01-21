import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const invoicesData = await queryDb(
      'SELECT orders.batch_number order_products.order_id order_products.product_id order_products.created_at order_products.updated_at orders.total_price orders.total_units orders.vendor_id vendors.company_name vendors.company_address vendors.phone_number vendors.gst_number products.product_name products.sku_id FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id INNER JOIN vendors ON orders.vendor_id = vendors.id;',
    );
    if (!invoicesData.length) {
      return NextResponse.json(
        {
          message: 'Either no invoices or Something went wrong',
          data: [],
          success: false,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'Success', data: invoicesData, success: true },
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
    const { productId, orderId } = await request.json();

    if (!productId || !orderId) {
      return NextResponse.json(
        { message: 'Fill order ID or product ID', success: false, data: [] },
        { status: 400 },
      );
    }
    const invoice = await queryDb(
      'INSERT INTO invoices (order_id, product_id) VALUES ($1, $2) RETURNING *;',
      [orderId, productId],
    );
    if (!invoice.length) {
      throw Error(
        'Something went wrong at the time of inserting invoices in order controller',
      );
    }
    return NextResponse.json(
      { message: 'Success', data: invoice[0], success: true },
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
