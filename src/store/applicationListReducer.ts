import { Dispatch } from 'redux';

import { TaskData, taskDataAPI, UpdateTaskData } from 'api/taskDataAPI';

const initialState = {
  items: [] as TaskData[],
  item: {} as TaskData,
  updateItems: {} as UpdateTaskData,
  isOpen: false,
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
    case 'SET_COMMENT': {
      return {
        ...state,
        updateItems: { ...action.payload.task, comment: action.payload.value },
      };
    }
    case 'CREATE_TASK': {
      return {
        ...state,
        items: [...state.items, action.payload.data],
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

export const setComment = (task: UpdateTaskData, value: string) =>
  ({
    type: 'SET_COMMENT',
    payload: { task, value },
  } as const);

export const createTask = (data: TaskData) =>
  ({
    type: 'CREATE_TASK',
    payload: {
      data,
    },
  } as const);

export const createTaskOData =
  (name: string, description: string) => (dispatch: Dispatch) => {
    taskDataAPI.createTaskData(name, description).then(res => {
      dispatch(createTask(res.data));
    });
  };

export const fetchTaskOData = () => (dispatch: Dispatch) => {
  taskDataAPI.getTaskOData().then(res => {
    dispatch(getAppList(res.data.value));
  });
};

export const getTaskById = (id: number) => (dispatch: Dispatch) => {
  taskDataAPI.getTask(id).then(res => {
    dispatch(getTask(res.data));
  });
};

export const updateTaskData =
  (item: TaskData, comment: string) => (dispatch: Dispatch) => {
    taskDataAPI.updateTask({ ...item, comment }).then(res => {
      dispatch(setComment(res.data, res.data.comment));
    });
  };

type InitialState = typeof initialState;

type ActionReducer =
  | ReturnType<typeof getAppList>
  | ReturnType<typeof getTask>
  | ReturnType<typeof setComment>
  | ReturnType<typeof createTask>;
