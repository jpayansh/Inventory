import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getUserTokenDetails = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken = jwt.verify(token, 'jwttt');
    return decodedToken;
  } catch (error) {
    console.log('Error in getting user Token --> ', error.message);
    throw new Error(error.message);
  }
};

export const getJsonWebToken = (request: NextRequest) => {
  try {
    // const { username } = request.body;
    const username = 'tirrent';
    const userToken = jwt.sign(username, 'jwttt');
    return userToken;
  } catch (error) {
    console.log('Error in generating json user Token --> ', error.message);
    throw new Error(error.message);
  }
};
