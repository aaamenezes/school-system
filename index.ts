// ZOD ou JSON Schema
// https://blog.rocketseat.com.br/como-utilizar-e-validar-variaveis-de-ambiente-em-typescript-com-zod/

import express, { Request as Req, Response as Res } from 'express';
import bodyParser from 'body-parser';

import readEntity from './src/services/read';
import createEntity from './src/services/create';
import deleteEntity from './src/services/delete';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Req, res: Res) => {
  const db = readEntity();
  res.send(db);
});

app.post('/', (req: Req, res: Res) => {
  const { entity, ...body } = req.body;
  const { success, message } = createEntity(entity, body);
  res.send({ success, message });
});

app.delete('/', (req: Req, res: Res) => {
  const { id, entity } = req.body;
  const { success, message } = deleteEntity(id, entity);
  res.send({ success, message });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

// https://expressjs.com/en/starter/basic-routing.html
