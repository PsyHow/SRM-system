import { Dispatch } from 'redux';

import { TaskData, taskDataAPI } from 'api/taskDataAPI';

const initialState = {
  appList: [
    { id: 1, name: 'Hello1', status: 'in progress', owner: 'Viktor' },
    { id: 2, name: 'Hello2', status: 'in progress2', owner: 'Viktor' },
    { id: 3, name: 'Hello3', status: 'in progress3', owner: 'Viktor' },
    { id: 4, name: 'Hello4', status: 'in progress4', owner: 'Viktor' },
  ] as AppList[],
  items: [] as TaskData[],
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
    default:
      return state;
  }
};

export const getAppList = (appLists: TaskData[]) =>
  ({
    type: 'GET_APP_LIST',
    payload: appLists,
  } as const);

export const fetchTaskOData = () => (dispatch: Dispatch) => {
  taskDataAPI.getTaskOData().then(res => {
    dispatch(getAppList(res.data.value));
  });
};

type InitialState = typeof initialState;

type ActionReducer = ReturnType<typeof getAppList>;

export type AppList = {
  id: number;
  name: string;
  status: string;
  owner: string;
};
