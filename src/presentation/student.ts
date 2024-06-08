import { Request, Router } from 'express';
import { StudentService } from '../services/StudentService.js';
import zodValidationMiddleware from './middlewares/zodValidationMiddleware.js';
import {
  StudentCreationSchema,
  StudentCreationType,
  StudentUpdateSchema
} from '../domain/Student.js';

export function studentRouterFactory(studentService: StudentService) {
  const router = Router();

  router.get('/', async (_, res) => {
    const entities = studentService.list().map(student => student.toObject());
    return res.json(entities);
  });

  router.get('/:id', async (req, res, next) => {
    try {
      return res.json(studentService.findById(req.params.id).toObject());
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    zodValidationMiddleware(StudentCreationSchema.omit({ id: true })),
    async (
      req: Request<never, any, Omit<StudentCreationType, 'id'>>,
      res,
      next
    ) => {
      try {
        const student = studentService.create(req.body);
        return res.status(201).json(student.toObject());
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    zodValidationMiddleware(StudentUpdateSchema.omit({ parents: true })),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const updated = studentService.update(id, req.body);
        res.set({ Location: `${req.baseUrl}/${updated.id}` });
        return res.json(updated.toObject());
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      // const students = studentService.listBy('students', [id]);

      // if (students.length > 0) {
      //   return res.status(403).json({
      //     message: `Cannot delete student with id ${id} because it has students assigned`
      //   });
      // }

      studentService.remove(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/parents', async (req, res, next) => {
    try {
      const { id } = req.params;
      const parents = studentService.getParents(id);
      return res.json(parents.map(parent => parent.toObject()));
    } catch (error) {
      next(error);
    }
  });

  router.patch(
    '/:id/parents',
    zodValidationMiddleware(StudentCreationSchema.pick({ parents: true })),
    async (
      req: Request<{ id: string }, any, Pick<StudentCreationType, 'parents'>>,
      res,
      next
    ) => {
      try {
        const { id } = req.params;
        const { parents } = req.body;
        return res.json(studentService.linkParent(id, parents).toObject());
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
