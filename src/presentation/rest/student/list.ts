import { Request, Response } from 'express';
import { StudentService } from '../../../services';

export const list =
  (studentService: StudentService) => async (_: Request, res: Response) => {
    const students = await studentService.listAll();
    res.status(200).json(students);
  };
