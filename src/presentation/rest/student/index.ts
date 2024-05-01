import { Router } from 'express';
import { Config } from '../../..';
import { list } from './list';

export const studentRoutesFactory = (services: Config['services']) => {
  const router = Router();

  router.get('/', list(services.StudentService));
  router.get('/:id', find(services.StudentService));
  router.delete('/:id', remove(services.StudentService));
  router.put('/:id', update(services.StudentService));
  router.post('/:id', create(services.StudentService));

  return router;
};

// 01:08:30
