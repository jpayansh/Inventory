import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const resposne = NextResponse.json(
      { success: true, message: 'Logout Successfull' },
      { status: 200 },
    );
    resposne.cookies.delete('token');
    return resposne;
  } catch (error) {
    console.log('error in logout controller --> ', error);
    NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
