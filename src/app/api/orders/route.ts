import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;
  const orderId = searchParams.get('order_id');
  let query = '';
  let products = [];

  try {
    if (orderId) {
      query = `SELECT order_products.price, order_products.units, order_products.batch_number, orders.total_price,orders.total_units,orders.vendor_id,order_products.product_id FROM order_products INNER JOIN orders ON order_products.order_id = orders.id WHERE order_products.order_id = ${orderId};`;
    } else {
      query =
        'SELECT orders.total_price, orders.id, orders.total_units, vendors.company_name, orders.created_at, orders.updated_at FROM orders INNER JOIN vendors ON orders.vendor_id = vendors.id;';
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
    const { products, total_price, total_units, vendor_id } =
      await request.json();

    let query = '';

    if (!vendor_id || !total_price || !total_units || !products.length) {
      return NextResponse.json(
        { message: 'Give all the fields', success: false, data: [] },
        { status: 400 },
      );
    }

    const order = await queryDb(
      'INSERT INTO orders (vendor_id, total_price, total_units ) VALUES ($1, $2, $3) RETURNING *;',
      [vendor_id, total_price, total_units],
    );
    if (!order.length) {
      throw Error(
        'Something went wrong at the time of inserting order in order controller',
      );
    }
    products.map((product, index) => {
      if (index == products.length - 1) {
        query += `(${order[0].id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number})`;
      } else {
        query += `(${order[0].id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number}), `;
      }
    });

    const order_product = await queryDb(
      `INSERT INTO order_products (order_id, product_id, price, units, batch_number) VALUES ${query} RETURNING *;`,
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
    const { products, total_price, total_units, vendor_id, order_id } =
      await request.json();

    if (!vendor_id || !total_price || !total_units || !products.length) {
      return NextResponse.json(
        { message: 'Give all the fields', success: false, data: [] },
        { status: 400 },
      );
    }

    // Start transaction
    await queryDb('BEGIN');

    // Update order details
    const updateOrder = await queryDb(
      'UPDATE orders SET vendor_id = $1, total_price = $2, total_units = $3, updated_at = $4 WHERE id = $5 RETURNING *',
      [
        vendor_id,
        total_price,
        total_units,
        new Date(Date.now()).toISOString(),
        order_id,
      ],
    );

    if (!updateOrder.length) {
      throw new Error(
        'Something went wrong at the time of updating the order table',
      );
    }

    const existingProductIds = await queryDb(
      'SELECT product_id FROM order_products WHERE order_id = $1',
      [order_id],
    );
    const productIdsToDelete = existingProductIds
      .filter(
        (p) => !products.some((product) => product.product_id === p.product_id),
      )
      .map((p) => p.product_id); // Extract product_id for deletion

    if (productIdsToDelete.length > 0) {
      const deleteQuery =
        'DELETE FROM order_products WHERE order_id = $1 AND product_id = ANY($2)';
      await queryDb(deleteQuery, [order_id, productIdsToDelete]);
    }

    // Prepare bulk insert or update query for order_products
    const values = products
      .map(
        (product) =>
          `(${order_id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number})`,
      )
      .join(',');
    const insertOrUpdateQuery = `
      INSERT INTO order_products (order_id, product_id, price, units, batch_number) 
      VALUES ${values} 
      ON CONFLICT (order_id, product_id) 
      DO UPDATE 
      SET price = EXCLUDED.price, units = EXCLUDED.units, batch_number = EXCLUDED.batch_number, updated_at = EXCLUDED.updated_at
    `;

    // Insert or update products in bulk
    const result = await queryDb(insertOrUpdateQuery);

    // Commit transaction
    await queryDb('COMMIT');

    return NextResponse.json(
      { message: 'Success', data: result, success: true },
      { status: 200 },
    );
  } catch (error) {
    // Rollback transaction on error
    await queryDb('ROLLBACK');
    console.log('Error in orders controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
