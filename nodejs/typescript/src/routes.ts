import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';

export function getCourse (request: Request, response: Response) {
  CreateCourseService.execute({
    name: "Anderson",
    duration: 10,
    eduactor: "Teste"
  });

  return response.send();
}