import queryDb, { products } from 'dbConfig/dbConfig';
import { getUserTokenDetails } from 'helper/getUserToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }
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
    const userId = await getUserTokenDetails(request);
    const { name, quantity, units, code, batchNumber } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }
    if (
      [name, quantity, units, code, batchNumber].some(
        (item) => item.trim() === '',
      )
    ) {
      return NextResponse.json(
        { message: 'Empty name, quantity, units,code,batchNumber or all' },
        { status: 400 },
      );
    }

    const insertProductsData = await queryDb(
      'INSERT INTO products (product_name, quantity, units,code,batch_number,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
      [name, quantity, units, code, batchNumber, Date.now(), Date.now()],
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
    const userId = await getUserTokenDetails(request);
    const productID = await request.json();

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }
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
    const userId = await getUserTokenDetails(request);
    const { name, quantity, units, code, batchNumber, productID } =
      await request.json();
    if (
      [name, quantity, units, code, batchNumber, productID].some(
        (item) => item.trim() === '',
      )
    ) {
      return NextResponse.json(
        {
          message:
            'Empty name, quantity, units, code, batchNumber, productId or all',
        },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }
    const productUpdatedData = await queryDb(
      'UPDATE products SET product_name = $1, quantity = $2, units = $3 code = $4 batch_number = $5 updated_at = $6 WHERE id = $7;',
      [name, quantity, units, code, batchNumber, Date.now(), productID],
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
