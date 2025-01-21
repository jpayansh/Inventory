import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;
  const id = searchParams.get('id');
  let query = '';
  console.log(id);
  try {
    if (id) {
      query = `SELECT * FROM products WHERE id = ${id}`;
    } else {
      query = `SELECT * FROM products`;
    }
    const productsData = await queryDb(query);

    if (!productsData) {
      return NextResponse.json(
        { message: 'No products were found', data: [], success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: productsData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in products controller --> ', error.message);
  }
}
export async function POST(request: NextRequest) {
  try {
    const { product_name, sku_id } = await request.json();

    if ([product_name, sku_id].some((item) => item.trim() === '')) {
      return NextResponse.json(
        {
          message: 'Empty product_name, sku_id or all',
          success: false,
          data: [],
        },
        { status: 400 },
      );
    }

    const insertProductsData = await queryDb(
      'INSERT INTO products (product_name, sku_id) VALUES ($1,$2) RETURNING id',
      [product_name, sku_id.toUpperCase()],
    );

    if (!insertProductsData) {
      return NextResponse.json(
        { message: 'Inserting product failed', data: [], success: false },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: insertProductsData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const productID = await request.json();

    if (!productID) {
      return NextResponse.json(
        { message: 'Fill ProductID', success: false, data: [] },
        { status: 400 },
      );
    }

    const productDeletedData = await queryDb(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [productID],
    );

    if (!productDeletedData) {
      return NextResponse.json(
        {
          message: 'No product deleted happened Or No product found of this ID',
          data: [],
          success: false,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: productDeletedData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { product_name, sku_id, product_id } = await request.json();

    if ([product_name, sku_id, product_id].some((data) => data.trim() == '')) {
      return NextResponse.json(
        {
          message: 'Empty product_id or sku_id, product_name',
          success: false,
          data: [],
        },
        { status: 400 },
      );
    }

    const productUpdatedData = await queryDb(
      'UPDATE products SET product_name = $1, sku_id = $2, updated_at = $3 WHERE id = $4;',
      [
        product_name,
        sku_id.toUpperCase(),
        new Date(Date.now()).toISOString(),
        product_id,
      ],
    );

    if (!productUpdatedData) {
      return NextResponse.json(
        {
          message: 'No product created yet Or No product found of this ID',
          success: false,
          data: [],
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: productUpdatedData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
