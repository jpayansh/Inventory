import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const productsData = await queryDb('SELECT * FROM products');

    if (!productsData) {
      return NextResponse.json(
        { message: 'No products were found', data: [] },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: productsData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function POST(request: NextRequest) {
  try {
    const { product_name, sku_id } = await request.json();

    if ([product_name, sku_id].some((item) => item.trim() === '')) {
      return NextResponse.json(
        { message: 'Empty product_name, sku_id or all' },
        { status: 400 },
      );
    }

    const insertProductsData = await queryDb(
      'INSERT INTO products (product_name, sku_id,created_at,updated_at) VALUES ($1,$2,$3,$4) RETURNING id',
      [product_name, sku_id, Date.now(), Date.now()],
    );

    if (!insertProductsData) {
      return NextResponse.json(
        { message: 'Inserting product failed', data: [] },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: insertProductsData },
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
      return NextResponse.json({ message: 'Fill ProductID' }, { status: 400 });
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
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: productDeletedData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { product_name, sku_id, productID } = await request.json();
    if ([product_name, sku_id].some((item) => item.trim() === '')) {
      return NextResponse.json(
        {
          message: 'Empty product_name, sku_id or all',
        },
        { status: 400 },
      );
    }

    const productUpdatedData = await queryDb(
      'UPDATE products SET product_name = $1, sku_id = $2, updated_at = $3 WHERE id = $4;',
      [product_name, sku_id, Date.now(), productID],
    );

    if (!productUpdatedData) {
      return NextResponse.json(
        {
          message: 'No product updated happened Or No product found of this ID',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: productUpdatedData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
