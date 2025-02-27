import queryDb from 'dbConfig/dbConfig';
import { getJsonWebToken } from 'helper/getUserToken';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json();
    // console.log(name, password, 'nammeeee');

    if (!name || !password) {
      return NextResponse.json(
        { message: 'Please provide all the details' },
        { status: 400 },
      );
    }
    const userData: any = await queryDb(
      'SELECT * FROM users WHERE user_name = $1',
      [name],
    );
    if (!userData) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (userData[0].user_password !== password) {
      return NextResponse.json(
        { message: 'Please provide valid credential', success: false },
        { status: 404 },
      );
    }

    const token = getJsonWebToken(request);

    await queryDb('UPDATE users SET token = $1 WHERE user_name = $2', [
      token,
      name,
    ]);

    const response = NextResponse.json(
      { message: 'Successfully Logged In', data: 'user', success: true },
      { status: 200 },
    );

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log('error in login api functionn --> ', error);
  }
}
