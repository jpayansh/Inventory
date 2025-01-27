import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;
  const inventoryId = searchParams.get('inventory_id');
  let query = '';

  try {
    if (inventoryId) {
      query = `SELECT inventory_product.price, inventory_product.units, inventory_product.batch_number, inventories.total_price,inventories.total_units,inventory_product.product_id FROM inventory_product INNER JOIN inventories ON inventory_product.inventory_id = inventories.id WHERE inventory_product.inventory_id = ${inventoryId};`;
    } else {
      query =
        'SELECT inventories.total_price, inventories.id, inventories.total_units, inventories.created_at, inventories.updated_at FROM inventories;';
    }

    const inventoriesData = await queryDb(query);

    if (!inventoriesData) {
      return NextResponse.json(
        { message: 'No inventories were found', data: [], success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: inventoriesData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in inventories controller --> ', error);
    return NextResponse.json(
      { message: 'Something went wrong', data: [], success: false },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { products, total_price, total_units } = await request.json();

    let query = '';

    if (!total_price || !total_units || !products.length) {
      return NextResponse.json(
        { message: 'Give all the fields', success: false, data: [] },
        { status: 400 },
      );
    }

    const inventories = await queryDb(
      'INSERT INTO inventories ( total_price, total_units ) VALUES ($1, $2) RETURNING *;',
      [total_price, total_units],
    );
    if (!inventories.length) {
      throw Error(
        'Something went wrong at the time of inserting order in order controller',
      );
    }
    products.map((product, index) => {
      if (index == products.length - 1) {
        query += `(${inventories[0].id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number})`;
      } else {
        query += `(${inventories[0].id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number}), `;
      }
    });

    const inventory_product = await queryDb(
      `INSERT INTO inventory_product (inventory_id, product_id, price, units, batch_number) VALUES ${query} RETURNING *;`,
    );
    if (!inventory_product.length) {
      throw Error(
        'Something went wrong at the time of inserting inventory_product in order controller',
      );
    }

    return NextResponse.json(
      { message: 'Success', data: inventory_product[0], success: true },
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
    const inventoryID = await request.json();

    if (!inventoryID) {
      return NextResponse.json(
        { message: 'Empty Inventory ID', data: [], success: false },
        { status: 400 },
      );
    }

    const inventoryDeletedData = await queryDb(
      'DELETE FROM inventories WHERE id = $1 RETURNING *',
      [inventoryID],
    );

    if (!inventoryDeletedData) {
      return NextResponse.json(
        {
          message:
            'No inventory deleted happened Or No inventory found of this ID',
          data: [],
          success: false,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: inventoryDeletedData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in inventory controller --> ', error.message);
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { products, total_price, total_units, inventory_id } =
      await request.json();

    if (!total_price || !total_units || !products.length || !inventory_id) {
      return NextResponse.json(
        { message: 'Give all the fields', success: false, data: [] },
        { status: 400 },
      );
    }

    // Start transaction
    await queryDb('BEGIN');

    // Update order details
    const updateInventory = await queryDb(
      'UPDATE inventories SET total_price = $1, total_units = $2, updated_at = $3 WHERE id = $4 RETURNING *',
      [
        total_price,
        total_units,
        new Date(Date.now()).toISOString(),
        inventory_id,
      ],
    );

    if (!updateInventory.length) {
      throw new Error(
        'Something went wrong at the time of updating the inventories table',
      );
    }

    const existingProductIds = await queryDb(
      'SELECT product_id FROM inventory_product WHERE inventory_id = $1',
      [inventory_id],
    );
    const productIdsToDelete = existingProductIds
      .filter(
        (p) => !products.some((product) => product.product_id === p.product_id),
      )
      .map((p) => p.product_id); // Extract product_id for deletion

    if (productIdsToDelete.length > 0) {
      const deleteQuery =
        'DELETE FROM inventory_product WHERE inventory_id = $1 AND product_id = ANY($2)';
      await queryDb(deleteQuery, [inventory_id, productIdsToDelete]);
    }

    // Prepare bulk insert or update query for order_products
    const values = products
      .map(
        (product) =>
          `(${inventory_id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number})`,
      )
      .join(',');
    const insertOrUpdateQuery = `
      INSERT INTO inventory_product (inventory_id, product_id, price, units, batch_number) 
      VALUES ${values} 
      ON CONFLICT (inventory_id, product_id) 
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
