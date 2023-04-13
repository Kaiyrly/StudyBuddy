import jwtDecode from 'jwt-decode';



interface DecodedToken {
    id: string;
    username: string;
    iat: number;
    exp: number;
  }

export function getUserIdFromToken(token: string) {
  try {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}