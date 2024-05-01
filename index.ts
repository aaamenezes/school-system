/**
 * https://www.youtube.com/watch?v=OoTJkhRPxGg&ab_channel=LucasSantos
 *
 * Rotas para:
 *
 * PUT
 * Associar ou desassociar​ um alunos à pais
 * Associar ou desassociar​ alunos e professores à turmas
 *
 * GET
 * alunos de uma turma
 * turmas de um professor
 * filhos(as) de um responsável
 * responsáveis por um estudante
 * alunos de um professor
 */

import express, { Request as Req, Response as Res } from 'express';
import bodyParser from 'body-parser';

import readEntity from './src/services_OLD/read';
import createEntity from './src/services_OLD/create';
import deleteEntity from './src/services_OLD/delete';
import updateEntity from './src/services_OLD/update';
import { Entity } from './src/types';
import { ENTITIES } from './src/contants';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/:entity', (req: Req, res: Res) => {
  const { entity } = req.params;

  if (!ENTITIES.includes(entity)) {
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

  if (!ENTITIES.includes(entity)) {
    res.send({ success: false, message: `entity ${entity} not found` });
    return;
  }

  res.send(db[entity]);
});

app.put('/:entity', (req: Req, res: Res) => {
  const { entity } = req.params;

  if (!ENTITIES.includes(entity)) {
    res.send({ success: false, message: `entity ${entity} not found` });
    return;
  }

  const { id, ...body } = req.body;
  const { success, message } = updateEntity(entity as Entity, id, body);
  res.send({ success, message });
});

app.delete('/:entity', (req: Req, res: Res) => {
  const { entity } = req.params;

  if (!ENTITIES.includes(entity)) {
    res.send({ success: false, message: `entity ${entity} not found` });
    return;
  }

  const { id } = req.body;
  const { success, message } = deleteEntity(id, entity as Entity);
  res.send({ success, message });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
