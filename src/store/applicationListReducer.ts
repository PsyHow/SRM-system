import { Dispatch } from 'redux';

import { TaskData, taskDataAPI } from 'api/taskDataAPI';
import { AppRootState } from 'store/store';

const initialState = {
  items: [] as TaskData[],
  item: {} as TaskData,
};

export const applicationListReducer = (
  state = initialState,
  action: ActionReducer,
): InitialState => {
  switch (action.type) {
    case 'GET_APP_LIST': {
      return {
        ...state,
        items: action.payload,
      };
    }
    case 'GET_TASK': {
      return {
        ...state,
        item: action.payload,
      };
    }
    default:
      return state;
  }
};

export const getAppList = (appLists: TaskData[]) =>
  ({
    type: 'GET_APP_LIST',
    payload: appLists,
  } as const);

export const getTask = (item: TaskData) =>
  ({
    type: 'GET_TASK',
    payload: item,
  } as const);

export const fetchTaskOData = () => (dispatch: Dispatch) => {
  taskDataAPI.getTaskOData().then(res => {
    dispatch(getAppList(res.data.value));
  });
};

export const getTaskById = () => (dispatch: Dispatch, getState: () => AppRootState) => {
  const { id } = getState().applicationListReducer.item;
  taskDataAPI.getTask(id).then(res => {
    dispatch(getTask(res.data.value));
  });
};

type InitialState = typeof initialState;

type ActionReducer = ReturnType<typeof getAppList> | ReturnType<typeof getTask>;
