import axios from 'axios';
import Config from 'react-native-config';

export const AUTH_API = axios.create({
  baseURL: Config.AUTH_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//TODO:: CHECK AUTHORIZATION
export const PROGRAMMER_API = axios.create({
  baseURL: Config.CUSTOMER_PUBLIC_API,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});
export const NUTRITION_API = axios.create({
  baseURL: Config.CUSTOMER_PUBLIC_API,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

export enum ERROR_CODES {
  SERVER_ERROR = '500',
  UNAUTHORIZED = '401',
  DUPLICATE_EMAIL = '452.2',
  INVALID_EMAIL = '400.23',
}
