import { Config } from '../..';
import express from 'express';
import bodyParser from 'body-parser';
import { studentRoutesFactory } from './student';

const app = express();

export function restLayer(config: Config) {
  app.use(bodyParser.json());

  // ele deixou isso com erro aos 01:07:00
  app.use('/students', studentRoutesFactory(config.services));
  app.use('/parents', parentRoutesFactory(config.services));
  app.use('/teacher', teacherRoutesFactory(config.services));
  app.use('/group', groupRoutesFactory(config.services));

  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}
