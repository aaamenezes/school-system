import Express from 'express';
import type { NextFunction, Response, Request } from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { ServiceList } from '../app.js';
import { AppConfig } from '../config.js';
import { parentRouterFactory } from './parent.js';
import { studentRouterFactory } from './student.js';
import { classRouterFactory } from './class.js';
import { teacherRouterFactory } from './teacher.js';

export async function WebLayer(config: AppConfig, services: ServiceList) {
  const app = Express();
  let server: Server | undefined;

  app.use(helmet());
  app.use(Express.json());
  app.use('/parents', parentRouterFactory(services.parent, services.student));
  app.use('/students', studentRouterFactory(services.student));
  app.use('/classes', classRouterFactory(services.class));
  app.use(
    '/teachers',
    teacherRouterFactory(services.teacher, services.class, services.student)
  );

  app.get('/ping', (_, res) => {
    res.send('pong').end();
  });

  app.use(async (error: any, _: Request, res: Response, next: NextFunction) => {
    if (error) {
      return res.status(error?.status ?? 500).json({
        code: error?.code ?? 'UNKKNOWN_ERROR',
        message: error?.message ?? 'No error message',
        name: error?.name ?? 'InternalError'
      });
    }

    next();
  });

  const start = async () => {
    console.log(`Starting Web Layrt`);
    server = app.listen(config.PORT, () => {
      console.log(`Ouvindo na porta ${config.PORT}`);
    });
  };

  const stop = async () => {
    console.debug('Stoping web layer');

    if (server) {
      server.close(error => {
        let exitCode = 0;
        if (error) {
          console.error('Error closing web layer:', error);
          exitCode = 1;
        }
        console.info('Web layer stopped');
        process.exit(exitCode);
      });
    }
  };

  return { start, stop };
}
