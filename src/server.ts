import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/', (_req, res) => {
  res.send('This is MaverUser API');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});