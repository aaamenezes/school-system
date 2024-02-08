// ZOD ou JSON Schema
// https://blog.rocketseat.com.br/como-utilizar-e-validar-variaveis-de-ambiente-em-typescript-com-zod/

import express, { Request as Req, Response as Res } from 'express';
import bodyParser from 'body-parser';

import readEntity from './src/services/read';
import createEntity from './src/services/create';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Req, res: Res) => {
  const db = readEntity();
  res.send(db);
});

app.post('/', (req: Req, res: Res) => {
  const { entity, ...data } = req.body;
  const { sucess, message } = createEntity(entity, data);
  res.send({ sucess, message });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

// https://expressjs.com/en/starter/basic-routing.html
