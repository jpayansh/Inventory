import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  let query = '';
  try {
    if (id) {
      query = `SELECT inventories.batch_number, 
       inventories.id,
       products.product_name, 
       products.sku_id, 
       inventories.total_quantity,
       inventories.price_total, inventories.price_per_bottle, inventories.created_at, inventories.updated_at FROM inventories JOIN products ON inventories.product_id = products.id WHERE inventories.id = ${id};`;
    } else {
      query = `SELECT inventories.batch_number, 
       inventories.id,
       products.product_name, 
       products.sku_id, 
       inventories.total_quantity,
       inventories.price_total, inventories.price_per_bottle, inventories.created_at, inventories.updated_at FROM inventories JOIN products ON inventories.product_id = products.id;`;
    }
    const inventoryData = await queryDb(query);
    if (!inventoryData) {
      return NextResponse.json(
        { message: 'No inventory data were found', data: [], success: false },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: 'Success', data: inventoryData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in inventory controller --> ', error.message);
  }
}
export async function POST(request: NextRequest) {
  try {
    const {
      batch_number,
      price_per_bottle,
      total_quantity,
      sku_id,
      price_total,
    } = await request.json();

    if (
      [
        batch_number,
        price_per_bottle,
        total_quantity,
        sku_id,
        price_total,
      ].some((data) => data.trim() === '')
    ) {
      return NextResponse.json(
        {
          message:
            'Empty batch_number,price_per_bottle,total_quantity,sku_id,price_total or all',
          data: [],
          success: false,
        },
        { status: 400 },
      );
    }

    const product = await queryDb('SELECT * FROM products WHERE sku_id = $1;', [
      sku_id.toUpperCase(),
    ]);

    if (!product[0]) {
      return NextResponse.json(
        { message: 'Wrong Product ID', data: [], success: false },
        { status: 404 },
      );
    }

    const inventoryData = await queryDb(
      'INSERT INTO inventories (batch_number, product_id, price_per_bottle, total_quantity,price_total) VALUES ($1, $2, $3, $4,$5) RETURNING id',
      [
        batch_number,
        product[0].id,
        price_per_bottle,
        total_quantity,
        price_total,
      ],
    );

    if (!inventoryData) {
      return NextResponse.json(
        {
          message: 'Inserting inventory data failed',
          data: [],
          success: false,
        },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { message: 'Success', data: inventoryData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in inventory controller --> ', error.message);
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
    const {
      batch_number,
      price_per_bottle,
      total_quantity,
      sku_id,
      inventory_id,
      price_total,
    } = await request.json();

    if (
      [
        batch_number,
        price_per_bottle,
        total_quantity,
        sku_id,
        price_total,
        inventory_id
      ].some((data) => data.trim() === '')
    ) {
      return NextResponse.json(
        {
          message:
            'Empty batch_number,price_per_bottle,total_quantity,sku_id,price_total or all',
          data: [],
          success: false,
        },
        { status: 400 },
      );
    }

    const product = await queryDb('SELECT * FROM products WHERE sku_id = $1;', [
      sku_id.toUpperCase(),
    ]);

    if (!product[0]) {
      return NextResponse.json(
        { message: 'Wrong Product ID', data: [], success: false },
        { status: 404 },
      );
    }

    const inventoryUpdatedData = await queryDb(
      'UPDATE inventories SET batch_number = $1, product_id = $2, price_per_bottle = $3, price_total = $4, total_quantity = $5, updated_at = $6 WHERE id = $7 RETURNING *;',
      [
        batch_number,
        product[0].id,
        price_per_bottle,
        price_total,
        total_quantity,
        new Date(Date.now()).toISOString(),
        inventory_id,
      ],
    );

    if (!inventoryUpdatedData && inventoryUpdatedData.length > 0) {
      return NextResponse.json(
        {
          message: 'No inventory created yet Or No inventory found of this ID',
          success: false,
          data: [],
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: inventoryUpdatedData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in inventory controller --> ', error.message);
  }
}
