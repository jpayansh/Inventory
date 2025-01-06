import { products } from 'dbConfig/dbConfig';
import { getUserTokenDetails } from 'helper/getUserToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Success', data: products },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserTokenDetails(request);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Success', data: products },
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
      { message: 'Success', data: products },
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
      { message: 'Success', data: products },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
