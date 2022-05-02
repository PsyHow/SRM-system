import { TaskData, UsersType } from 'api/tasksData/types';

export interface UpdateConfigProps {
  task: TaskData;
  users: UsersType[];
}
