import { DB } from './data/db';
import {
  createGroupService,
  createParentService,
  createStudentService,
  createTeacherService
} from './factories';
import { start } from './presentation';
import {
  GroupService,
  ParentService,
  StudentService,
  TeacherService
} from './services';

export interface Config {
  port: number;
  services: {
    StudentService: StudentService;
    ParentService: ParentService;
    GroupService: GroupService;
    TeacherService: TeacherService;
  };
}

(async () => {
  const db: DB = new DB();
  await db.init();

  const config: Config = {
    port: Number(process.env.PORT) || 3000,
    services: {
      StudentService: createStudentService(db),
      ParentService: createParentService(db),
      GroupService: createGroupService(db),
      TeacherService: createTeacherService(db)
    }
  };

  start(config);
})();
