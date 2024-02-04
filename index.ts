// ZOD ou JSON Schema

import express, { Request as Req, Response as Res } from 'express';
import bodyParser from 'body-parser';

import readEntity from './src/services/read';
import createEntity from './src/services/create';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Req, res: Res) => {
  const allData = readEntity();
  res.send(allData);
});

app.post('/', (req: Req, res: Res) => {
  createEntity(req.body);
  res.send({
    message: 'acho que eu vou criar algo',
    query: req.query,
    body: req.body
  });
  console.log(`req.body:`, req.body);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

// https://expressjs.com/en/starter/basic-routing.html
