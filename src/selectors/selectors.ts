import { StatusType, TaskData, UsersType } from 'api/tasksData/types';
import { AppRootState } from 'store/store';

export const selectTask = (state: AppRootState): TaskData => state.tasksReducer.task;
export const selectStatuses = (state: AppRootState): StatusType[] =>
  state.tasksReducer.statuses;
export const selectTasks = (state: AppRootState): TaskData[] => state.tasksReducer.tasks;
export const selectIsUpdate = (state: AppRootState): boolean =>
  state.tasksReducer.isUpdate;
export const selectNewTaskId = (state: AppRootState): number =>
  state.tasksReducer.newTaskId;
export const selectUsers = (state: AppRootState): UsersType[] => state.tasksReducer.users;
