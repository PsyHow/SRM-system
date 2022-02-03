import { useSelector } from 'react-redux';

import { StatusType, TaskData } from 'api/taskDataAPI';
import { AppRootState } from 'store/store';

export const selectItem = (state: AppRootState): TaskData =>
  state.applicationListReducer.item;
export const selectStatuses = (state: AppRootState): StatusType[] =>
  state.applicationListReducer.statuses;
