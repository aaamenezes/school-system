import { Request, Router } from 'express';
import { TeacherService } from '../services/TeacherService.js';
import zodValidationMiddleware from './middlewares/zodValidationMiddleware.js';
import {
  TeacherCreationSchema,
  TeacherCreationType,
  TeacherUpdateSchema
} from '../domain/Teacher.js';
import { ClassService } from '../services/ClassService.js';
import { StudentService } from '../services/StudentService.js';
import { Student } from '../domain/Student.js';

export function teacherRouterFactory(
  teacherService: TeacherService,
  classService: ClassService,
  studentService: StudentService
) {
  const router = Router();

  router.get('/', async (_, res) => {
    const entities = teacherService.list().map(teacher => teacher.toObject());
    return res.json(entities);
  });

  router.get('/:id', async (req, res, next) => {
    try {
      return res.json(teacherService.findById(req.params.id).toObject());
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    zodValidationMiddleware(TeacherCreationSchema.omit({ id: true })),
    async (
      req: Request<never, any, Omit<TeacherCreationType, 'id'>>,
      res,
      next
    ) => {
      try {
        const teacher = teacherService.create(req.body);
        return res.status(201).json(teacher.toObject());
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    zodValidationMiddleware(TeacherUpdateSchema),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const updated = teacherService.update(id, req.body);
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
      const classes = classService.listBy('teacher', id);

      for (const classEntity of classes) {
        classService.update(id, { teacher: null });
      }

      teacherService.remove(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/students', async (req, res, next) => {
    try {
      const { id } = req.params;
      teacherService.findById(id);
      const classes = classService.listBy('techer', id);

      if (classes.length === 0) {
        return res.json([]);
      }

      let totalStudents: Student[] = [];

      for (const classEntity of classes) {
        const students = studentService.listBy(
          'class',
          classEntity.id
        ) as Student[];
        totalStudents = [...totalStudents, ...students];
      }

      return res.json(totalStudents.map(student => student.toObject()));
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/classes', async (req, res, next) => {
    try {
      const { id } = req.params;
      teacherService.findById(id);

      const classes = classService.listBy('teacher', [id]);
      return res.json(classes.map(classEntity => classEntity.toObject()));
    } catch (error) {
      next(error);
    }
  });

  return router;
}
