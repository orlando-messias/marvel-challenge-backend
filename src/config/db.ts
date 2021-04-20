import { createConnection } from 'typeorm';

export const connection = async () => {
  const conn = await createConnection({
    type: "mysql",
    host: "bhcsonbdv3x3fgosus1l-mysql.services.clever-cloud.com",
    port: 3306,
    username: "uw74u9fhfzbu5plv",
    password: "871EAG1yM7Ord9FrB4tM",
    database: "bhcsonbdv3x3fgosus1l"
  });
  
  console.log(`Connected to db ${conn.options.database}`);
};