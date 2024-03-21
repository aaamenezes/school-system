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
import { entities } from './src/entities';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/', (req: Req, res: Res) => {
  const { entity, ...body } = req.body;
  const { success, message } = createEntity(entity, body);
  res.send({ success, message });
});

app.get('/:entity?', (req: Req, res: Res) => {
  const db = JSON.parse(JSON.stringify(readEntity()));

  const { entity } = req.params;

  if (!entity) {
    /**
     * TODO
     * O "res.send" cheio de "length" é apenas teste
     * Remover ele no futuro e deixar só a linha comentada
     */

    // res.send(db);
    res.send({
      parentsLength: db.parents.length,
      studentsLength: db.students.length,
      groupsLength: db.groups.length,
      teachersLength: db.teachers.length,
      ...db
    });
    return;
  }

  if (entities.includes(entity)) {
    res.send({ data: 'hue' });
    return;
  }

  res.send({ error: 'entity não encontrado' });
});

// app.get('/students', (req: Req, res: Res) => {
//   return readEntity().students;
// });

// app.get('/groups', (req: Req, res: Res) => {
//   return readEntity().groups;
// });

// app.get('/teachers', (req: Req, res: Res) => {
//   return readEntity().teachers;
// });

// app.get('/parents', (req: Req, res: Res) => {
//   return readEntity().parents;
// });

app.put('/', (req: Req, res: Res) => {
  const { entity, id, ...body } = req.body;
  const { success, message } = updateEntity(entity, id, body);
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
