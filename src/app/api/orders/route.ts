import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;
  const productId = searchParams.get('product_id');
  const orderId = searchParams.get('order_id');
  let query = '';
  try {
    if (productId && orderId) {
      query = `SELECT orders.batch_number order_products.order_id order_products.product_id order_products.created_at order_products.updated_at orders.total_price orders.total_units orders.vendor_id vendors.company_name vendors.company_address vendors.phone_number vendors.gst_number products.product_name products.sku_id FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id INNER JOIN vendors ON orders.vendor_id = vendors.id WHERE order_products.order_id = ${orderId} AND order_products.product_id = ${productId};`;
    } else if (!productId && !orderId) {
      query =
        'SELECT orders.batch_number order_products.order_id order_products.product_id order_products.created_at order_products.updated_at orders.total_price orders.total_units orders.vendor_id vendors.company_name vendors.company_address vendors.phone_number vendors.gst_number products.product_name products.sku_id FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id INNER JOIN vendors ON orders.vendor_id = vendors.id;';
    } else {
      return NextResponse.json(
        { message: 'bad request', data: [], success: false },
        { status: 403 },
      );
    }

    const ordersData = await queryDb(query);

    if (!ordersData) {
      return NextResponse.json(
        { message: 'No orders were found', data: [], success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: ordersData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in orders controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const {
      sku_id,
      batch_number,
      total_price,
      total_units,
      company_name,
      company_address,
      phone_number,
      gst_number,
    } = await request.json();

    if (
      !sku_id ||
      !batch_number ||
      !total_price ||
      !total_units ||
      !company_name ||
      !company_address ||
      !phone_number ||
      !gst_number
    ) {
      return NextResponse.json(
        { message: 'Give all the fields', success: false, data: [] },
        { status: 400 },
      );
    }

    const product = await queryDb('SELECT * FROM products WHERE sku_id = $1;', [
      sku_id,
    ]);
    if (!product.length) {
      return NextResponse.json(
        { message: 'Product ID not found', data: [], success: false },
        { status: 404 },
      );
    }
    let vendor_id;
    const vendorExist = await queryDb(
      'SELECT * FROM vendors WHERE company_name = $1 AND gst_number = $2;',
      [company_name.toUpperCase(), gst_number],
    );

    if (!vendorExist.length) {
      const vendor = await queryDb(
        'INSERT INTO vendors (company_name, company_address, phone_number, gst_number ) VALUES ($1, $2, $3, $4) RETURNING *;',
        [company_name.toUpperCase(), company_address, phone_number, gst_number],
      );
      if (!vendor.length) {
        throw Error(
          'Something went wrong at the time of inserting vendor in order controller',
        );
      }
      vendor_id = vendor[0].id;
    } else {
      vendor_id = vendorExist[0].id;
    }

    const order = await queryDb(
      'INSERT INTO orders (vendor_id, total_price, total_units, batch_number ) VALUES ($1, $2, $3, $4) RETURNING *;',
      [vendor_id, total_price, total_units, batch_number],
    );
    if (!order.length) {
      throw Error(
        'Something went wrong at the time of inserting order in order controller',
      );
    }

    const order_product = await queryDb(
      'INSERT INTO order_products (order_id, product_id) VALUES ($1, $2) RETURNING *;',
      [order[0].id, product[0].id],
    );
    if (!order_product.length) {
      throw Error(
        'Something went wrong at the time of inserting order_product in order controller',
      );
    }

    return NextResponse.json(
      { message: 'Success', data: order_product[0], success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in orders controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const { productId, orderId } = await request.json();

    if (!productId || !orderId) {
      return NextResponse.json(
        { message: 'Fill order ID or product ID', success: false, data: [] },
        { status: 400 },
      );
    }

    const deleteOrderProduct = await queryDb(
      'DELETE FROM order_products WHERE product_id = $1 AND order_id = $2 RETURNING *;',
      [productId, orderId],
    );
    if (!deleteOrderProduct.length) {
      throw Error(
        'Something went wrong at the time of deleting order_product in order controller',
      );
    }

    const deleteOrder = await queryDb(
      'DELETE FROM orders WHERE id = $1 RETURNING *;',
      [orderId],
    );
    if (!deleteOrder.length) {
      throw Error(
        'Something went wrong at the time of deleting order in order controller',
      );
    }

    return NextResponse.json(
      { message: 'Success', data: deleteOrderProduct, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in orders controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const {
      orderId,
      productId,
      sku_id,
      batch_number,
      total_price,
      total_units,
      company_name,
      company_address,
      phone_number,
      gst_number,
    } = await request.json();

    if (
      !orderId ||
      !productId ||
      !sku_id ||
      !batch_number ||
      !total_price ||
      !total_units ||
      !company_name ||
      !company_address ||
      !phone_number ||
      !gst_number
    ) {
      return NextResponse.json(
        { message: 'Give all the fields', success: false, data: [] },
        { status: 400 },
      );
    }

    const product = await queryDb('SELECT * FROM products WHERE sku_id = $1;', [
      sku_id,
    ]);
    if (!product.length) {
      return NextResponse.json(
        { message: 'Wrong Sku ID', success: false, data: [] },
        { status: 400 },
      );
    }

    let vendor_id;
    const vendorExist = await queryDb(
      'SELECT * FROM vendors WHERE company_name = $1 AND gst_number = $2;',
      [company_name.toUpperCase(), gst_number],
    );

    if (!vendorExist.length) {
      const vendor = await queryDb(
        'INSERT INTO vendors (company_name, company_address, phone_number, gst_number ) VALUES ($1, $2, $3, $4) RETURNING *;',
        [company_name.toUpperCase(), company_address, phone_number, gst_number],
      );
      if (!vendor.length) {
        throw Error(
          'Something went wrong at the time of inserting vendor in order controller',
        );
      }
      vendor_id = vendor[0].id;
    } else {
      vendor_id = vendorExist[0].id;
    }

    const updateOrder = await queryDb(
      'UPDATE orders SET vendor_id = $1, total_price = $2, total_units = $3, batch_number = $4 WHERE id = $5 ;',
      [vendor_id, total_price, total_units, batch_number, orderId],
    );
    if (!updateOrder.length) {
      throw Error(
        'Something went wrong at the time of updating order table in order controller',
      );
    }

    const updatedOrderProducts = await queryDb(
      'UPDATE order_products SET product_id = $1 WHERE order_id = $2 AND product_id = $3;',
      [product[0].id, orderId, productId],
    );
    if (!updatedOrderProducts.length) {
      throw Error(
        'Something went wrong at the time of updating order_product table in order controller',
      );
    }

    return NextResponse.json(
      { message: 'Success', data: updateOrder, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in orders controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
