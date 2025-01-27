import queryDb from 'dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const vendorsData = await queryDb('SELECT * FROM vendors;');

    if (!vendorsData) {
      return NextResponse.json(
        { message: 'No vendors were found', data: [], success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: vendorsData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in vendors controller --> ', error.message);
    return NextResponse.json(
      { message: 'Inserting vendor failed', data: [], success: false },
      { status: 403 },
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { company_name, company_address, phone_number, gst_number } =
      await request.json();

    if (
      [company_name, company_address, phone_number, gst_number].some(
        (item) => item.trim() === '',
      )
    ) {
      return NextResponse.json(
        {
          message:
            'Empty company_name, company_address, phone_number, gst_number or all',
          success: false,
          data: [],
        },
        { status: 400 },
      );
    }

    const insertVendorsData = await queryDb(
      'INSERT INTO vendors (company_name, company_address, phone_number, gst_number) VALUES ($1,$2,$3,$4) RETURNING id',
      [company_name.toUpperCase(), company_address, phone_number, gst_number],
    );

    if (!insertVendorsData) {
      return NextResponse.json(
        { message: 'Inserting vendor failed', data: [], success: false },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { message: 'Success', data: insertVendorsData, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in vendors controller --> ', error.message);
    return NextResponse.json(
      { message: 'Inserting vendor failed', data: [], success: false },
      { status: 403 },
    );
  }
}
