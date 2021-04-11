import express from 'express';
import cors from 'cors';

import { connection } from './config/db';
import usersRoute from './routes/users';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('This is MavelUser API');
});

app.use('/users', usersRoute);

connection();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});