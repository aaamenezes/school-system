// ZOD ou JSON Schema

import express, { Request as Req, Response as Res } from 'express';

const app = express();

const port = 3000;

app.get('/', (req: Req, res: Res) => {
  const allData = req.body;
  res.send({
    message: `Hello world, App rodando na porta ${port}`
  });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

// https://expressjs.com/en/starter/basic-routing.html
