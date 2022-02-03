import { Dispatch } from 'redux';

import { StatusType, TaskData, taskDataAPI, UpdateTaskModel } from 'api/taskDataAPI';

const initialState = {
  items: [] as TaskData[],
  item: {} as TaskData,
  statuses: [] as StatusType[],
};

export const applicationListReducer = (
  state = initialState,
  action: ActionReducer,
): InitialState => {
  switch (action.type) {
    case 'SET_STATUS': {
      return {
        ...state,
        statuses: state.statuses.filter(status => status.id === action.payload),
      };
    }
    case 'GET_STATUSES': {
      return {
        ...state,
        statuses: action.payload,
      };
    }
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
        item: {
          ...state.item,
          lifetimeItems: state.item.lifetimeItems.filter(el =>
            el.id === action.payload.id ? { ...el, comment: action.payload.value } : el,
          ),
        },
      };
    }
    case 'CREATE_TASK': {
      return {
        ...state,
        items: [...state.items, action.payload.data],
        item: action.payload.data,
      };
    }
    case 'UPDATE_ITEM': {
      return {
        ...state,
        item: action.payload,
      };
    }
    // case 'SET_UPDATE_TASK': {
    //   return {
    //     ...state,
    //     activeItem: null,
    //   };
    // }
    default:
      return state;
  }
};
export const updateItem = (item: TaskData) =>
  ({
    type: 'UPDATE_ITEM',
    payload: item,
  } as const);
export const setIsCreate = (isCreate: boolean) =>
  ({
    type: 'SET_IS_CREATE',
    payload: isCreate,
  } as const);

export const setStatus = (id: number) =>
  ({
    type: 'SET_STATUS',
    payload: id,
  } as const);

export const setUpdateTask = (activeItem: null | TaskData) =>
  ({
    type: 'SET_UPDATE_TASK',
    payload: activeItem,
  } as const);

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

export const getStatuses = (statuses: StatusType[]) =>
  ({
    type: 'GET_STATUSES',
    payload: statuses,
  } as const);

export const setComment = (id: number, value: string) =>
  ({
    type: 'SET_COMMENT',
    payload: { id, value },
  } as const);

export const createTask = (data: TaskData) =>
  ({
    type: 'CREATE_TASK',
    payload: {
      data,
    },
  } as const);

export const createTaskOData =
  (name: string, description: string, cb: () => void) => (dispatch: Dispatch) => {
    taskDataAPI.createTaskData(name, description).then(res => {
      dispatch(createTask(res.data));
      if (cb) {
        cb();
      }
    });
  };

export const fetchTaskOData = () => (dispatch: Dispatch) => {
  taskDataAPI.getTaskOData().then(res => {
    dispatch(getAppList(res.data.value));
  });
};

// export const getTaskById = (id: number) => (dispatch: Dispatch) => {
//   taskDataAPI.getTask(id).then(res => {
//     dispatch(getTask(res.data));
//   });
// };

export const updateTaskData = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  taskDataAPI.updateTask(data).then(res => {
    dispatch(setComment(res.data.id, res.data.lifetimeItems[res.data.id].comment));
  });
};

export const updateStatusData = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  taskDataAPI.updateTask(data).then(res => {
    dispatch(setStatus(res.data.statusId));
  });
};

export const fetchStatuses = () => (dispatch: Dispatch) => {
  taskDataAPI.getStatuses().then(res => {
    dispatch(getStatuses(res.data));
  });
};

type InitialState = typeof initialState;

type ActionReducer =
  | ReturnType<typeof getAppList>
  | ReturnType<typeof getTask>
  | ReturnType<typeof setComment>
  | ReturnType<typeof createTask>
  | ReturnType<typeof setUpdateTask>
  | ReturnType<typeof getStatuses>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof updateItem>;
