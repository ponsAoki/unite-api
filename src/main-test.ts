import * as dotenv from 'dotenv';

export const initTest = (): void => {
  dotenv.config({ path: __dirname + '/../.env.test', override: true });
};
