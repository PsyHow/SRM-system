import { ChangeEvent } from 'react';

import { AsyncThunk } from '@reduxjs/toolkit';

import { StatusType, TaskData, UpdateTaskModel, UsersType } from 'api/tasksData/types';

export interface UseSelectProps {
  value: string;
  id: string;
  options: UsersType[] | StatusType[];
  task: TaskData;
  actionCreator: AsyncThunk<{ taskData: any }, UpdateTaskModel, {}>;
}

export type UseSelectReturnType = {
  selectValue: string;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
