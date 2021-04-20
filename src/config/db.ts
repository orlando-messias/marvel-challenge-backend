import * as dotenv from 'dotenv';

dotenv.config();

import { createConnection } from 'typeorm';

export const connection = async () => {
  const conn = await createConnection({
    type: "mysql",
    host: process.env.HOST_DB,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
  });

  console.log(`Connected to db ${conn.options.database}`);
};