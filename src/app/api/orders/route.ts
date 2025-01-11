import queryDb, { orders } from 'dbConfig/dbConfig';
import { getUserTokenDetails } from 'helper/getUserToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }

    const ordersData = await queryDb(
      'SELECT * FROM order_products INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id INNER JOIN companies ON orders.company_id = companies.id',
    );

    if (!ordersData) {
      return NextResponse.json(
        { message: 'No orders were found', data: [] },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: ordersData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);
    const body = await request.json();
    // const {orderId,productId,totalUnit,totalPrice,units,batchNumber}=body.orderProducts;
    // const {id,companyId,totalPrice,totalUnit}=body.orders;
    // const {,companyName,companyAddress,phoneNumber,gstNumber}=body.company;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Success', data: orders },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Success', data: orders },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Success', data: orders },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
