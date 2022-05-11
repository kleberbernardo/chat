import * as dotenv from 'dotenv';

dotenv.config();

const Environment = {
  DEV: {
    ENV: process.env.NODE_ENV,
    PORT: 5500,
    PATH_PUBLIC: `${process.cwd()}/public`,
    TOKEN: 'abc',
  },
  PROD: {
    ENV: process.env.NODE_ENV,
    PORT: 1337,
    PATH_PUBLIC: `${process.cwd()}/public`,
    TOKEN: 'abc',
  },
};

export const Config =
  process.env.DEV_ENV === process.env.NODE_ENV
    ? Environment.DEV
    : Environment.PROD;
