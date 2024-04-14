/**
 * ZOD ou JSON Schema
 * https://blog.rocketseat.com.br/como-utilizar-e-validar-variaveis-de-ambiente-em-typescript-com-zod/
 * https://expressjs.com/en/starter/basic-routing.html
 * https://www.youtube.com/watch?v=5CqfzNdaqKw&ab_channel=MarioSouto-DevSoutinho
 * Corrigir rotas, criar /students, /groups, etc...
 */

import express, { Request as Req, Response as Res } from 'express';
import bodyParser from 'body-parser';

import readEntity from './src/services/read';
import createEntity from './src/services/create';
import deleteEntity from './src/services/delete';
import updateEntity from './src/services/update';
import { Entity, entities } from './src/entities';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/:entity', (req: Req, res: Res) => {
  const { entity } = req.params;

  if (!entities.includes(entity)) {
    res.send({ success: false, message: `entity ${entity} not found` });
    return;
  }

  const { body } = req;
  const { success, message } = createEntity(entity as Entity, body);
  res.send({ success, message });
});

app.get('/:entity?', (req: Req, res: Res) => {
  const db = JSON.parse(JSON.stringify(readEntity()));

  const { entity } = req.params;

  if (!entity) {
    res.send(db);
    return;
  }

  if (!entities.includes(entity)) {
    res.send({ success: false, message: `entity ${entity} not found` });
    return;
  }

  res.send(db[entity]);
});

app.put('/:entity', (req: Req, res: Res) => {
  const { entity } = req.params;

  if (!entities.includes(entity)) {
    res.send({ success: false, message: `entity ${entity} not found` });
    return;
  }

  const { id, ...body } = req.body;
  const { success, message } = updateEntity(entity as Entity, id, body);
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
