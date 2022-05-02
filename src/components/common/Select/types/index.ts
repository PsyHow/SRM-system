import { AsyncThunk } from '@reduxjs/toolkit';

import { StatusType, TaskData, UpdateTaskModel, UsersType } from 'api/tasksData/types';

export interface SelectProps {
  value: string;
  options: UsersType[] | StatusType[];
  id: string;
  task: TaskData;
  actionCreator: AsyncThunk<{ taskData: any }, UpdateTaskModel, {}>;
}
