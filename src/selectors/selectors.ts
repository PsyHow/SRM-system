import { StatusType, TaskData } from 'api/taskDataAPI';
import { AppRootState } from 'store/store';

export const selectTask = (state: AppRootState): TaskData =>
  state.applicationListReducer.task;
export const selectStatuses = (state: AppRootState): StatusType[] =>
  state.applicationListReducer.statuses;
export const selectTasks = (state: AppRootState): TaskData[] =>
  state.applicationListReducer.tasks;
export const selectIsUpdate = (state: AppRootState): boolean =>
  state.applicationListReducer.isUpdate;
export const selectNewTaskId = (state: AppRootState): number =>
  state.applicationListReducer.newTaskId;
