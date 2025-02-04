import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  // const { searchParams } = await request.nextUrl;
  // const inventoryId = searchParams.get('inventory_id');
  // const forOrderPage = searchParams.get('forOrderPage') ? true : false;
  let query = '';

  try {
    // if (inventoryId) {
    //   query = `SELECT inventory_product.price, inventory_product.units, inventory_product.batch_number, inventories.total_price,inventories.total_units,inventory_product.product_id FROM inventory_product INNER JOIN inventories ON inventory_product.inventory_id = inventories.id WHERE inventory_product.inventory_id = ${inventoryId};`;
    // } else if (forOrderPage) {
    //   query = `SELECT inventory_product.units, inventory_product.batch_number, inventory_product.product_id, products.product_name FROM inventory_product INNER JOIN products ON products.id = inventory_product.product_id;`;
    // } else {
    //   query =
    //     'SELECT inventories.total_price, inventories.id, inventories.total_units, inventories.created_at, inventories.updated_at FROM inventories;';
    // }

    const inventoriesData = await queryDb(
      'SELECT inventories.product_id, inventories.price, inventories.units, inventories.batch_number, inventories.id, products.product_name, products.packing, inventories.created_at, inventories.updated_at FROM inventories INNER JOIN products ON products.id = inventories.product_id;',
    );

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

    products.map((product, index) => {
      if (index == products.length - 1) {
        query += `(${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number})`;
      } else {
        query += `(${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number}), `;
      }
    });

    console.log(query, 'queryyyy');

    const insertOrUpdateQuery = await queryDb(
      `INSERT INTO inventories (product_id, price, units, batch_number) VALUES ${query} ON CONFLICT (product_id, batch_number) DO UPDATE SET units = inventories.units + EXCLUDED.units, updated_at = CURRENT_TIMESTAMP RETURNING *;`,
    );
    if (!insertOrUpdateQuery.length) {
      throw Error(
        'Something went wrong at the time of inserting insertOrUpdateQuery in order controller',
      );
    }

    return NextResponse.json(
      { message: 'Success', data: insertOrUpdateQuery, success: true },
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
    const { inventoryID } = await request.json();
    console.log(inventoryID, 'inventoryIDinventoryID');

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
    const inventoriesData = await queryDb('SELECT * FROM inventories;');

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
// export async function PUT(request: NextRequest) {
//   try {
//     const { products, total_price, total_units, inventory_id } =
//       await request.json();

//     if (!total_price || !total_units || !products.length || !inventory_id) {
//       return NextResponse.json(
//         { message: 'Give all the fields', success: false, data: [] },
//         { status: 400 },
//       );
//     }

//     // Start transaction
//     await queryDb('BEGIN');

//     // Update order details

//     const existingProductIds = await queryDb(
//       'SELECT product_id FROM inventory_product WHERE inventory_id = $1',
//       [inventory_id],
//     );
//     const productIdsToDelete = existingProductIds
//       .filter(
//         (p) => !products.some((product) => product.product_id === p.product_id),
//       )
//       .map((p) => p.product_id); // Extract product_id for deletion

//     if (productIdsToDelete.length > 0) {
//       const deleteQuery =
//         'DELETE FROM inventory_product WHERE inventory_id = $1 AND product_id = ANY($2)';
//       await queryDb(deleteQuery, [inventory_id, productIdsToDelete]);
//     }

//     // Prepare bulk insert or update query for order_products
//     const values = products
//       .map(
//         (product) =>
//           `(${inventory_id}, ${product.product_id}, ${product.price}, ${product.units}, ${product.batch_number})`,
//       )
//       .join(',');
//     const insertOrUpdateQuery = `
//       INSERT INTO inventory_product (inventory_id, product_id, price, units, batch_number)
//       VALUES ${values}
//       ON CONFLICT (inventory_id, product_id)
//       DO UPDATE
//       SET price = EXCLUDED.price, units = EXCLUDED.units, batch_number = EXCLUDED.batch_number, updated_at = EXCLUDED.updated_at
//     `;

//     // Insert or update products in bulk
//     const result = await queryDb(insertOrUpdateQuery);

//     // Commit transaction
//     await queryDb('COMMIT');

//     return NextResponse.json(
//       { message: 'Success', data: result, success: true },
//       { status: 200 },
//     );
//   } catch (error) {
//     // Rollback transaction on error
//     await queryDb('ROLLBACK');
//     console.log('Error in orders controller --> ', error);
//     return NextResponse.json(
//       { message: 'Something went wrong', data: [], success: false },
//       { status: 500 },
//     );
//   }
// }
