import { Dispatch } from 'redux';

import {
  CreateModel,
  StatusType,
  TagsType,
  TaskData,
  taskDataAPI,
  UpdateTaskModel,
} from 'api/taskDataAPI';

const initialState = {
  tasks: [] as TaskData[],
  task: {} as TaskData,
  statuses: [] as StatusType[],
  isUpdate: false,
  newTaskId: 0,
  tags: [] as TagsType[],
};

export const applicationListReducer = (
  state = initialState,
  action: ActionReducer,
): InitialState => {
  switch (action.type) {
    case 'GET_TAGS': {
      return {
        ...state,
        tags: action.payload,
      };
    }
    case 'GET_TASKS': {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case 'GET_TASK': {
      return {
        ...state,
        task: action.payload,
      };
    }
    case 'GET_STATUSES': {
      return {
        ...state,
        statuses: action.payload,
      };
    }
    case 'GET_NEW_TASK_ID': {
      return {
        ...state,
        newTaskId: action.payload,
      };
    }
    case 'SET_UPDATE': {
      return {
        ...state,
        isUpdate: action.payload,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        tasks: state.tasks.filter(f =>
          f.id === action.payload.taskId
            ? { ...f, statusId: action.payload.statusId }
            : f,
        ),
      };
    }
    case 'SET_COMMENT': {
      return {
        ...state,
        tasks: state.tasks.filter(task =>
          task.id === action.payload.id
            ? { ...task, comment: action.payload.value }
            : task,
        ),
      };
    }
    case 'CREATE_TASK': {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...state.task,
            name: action.payload.name,
            description: action.payload.description,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export const getTasks = (tasks: TaskData[]) =>
  ({
    type: 'GET_TASKS',
    payload: tasks,
  } as const);

export const getTask = (task: TaskData) =>
  ({
    type: 'GET_TASK',
    payload: task,
  } as const);

export const getTags = (tags: TagsType[]) =>
  ({
    type: 'GET_TAGS',
    payload: tags,
  } as const);

export const getStatuses = (statuses: StatusType[]) =>
  ({
    type: 'GET_STATUSES',
    payload: statuses,
  } as const);

export const getNewTaskId = (id: number) =>
  ({
    type: 'GET_NEW_TASK_ID',
    payload: id,
  } as const);

export const setUpdate = (isUpdate: boolean) =>
  ({
    type: 'SET_UPDATE',
    payload: isUpdate,
  } as const);

export const setStatus = (taskId: number, statusId: number) =>
  ({
    type: 'SET_STATUS',
    payload: { taskId, statusId },
  } as const);

export const setComment = (id: number, value: string) =>
  ({
    type: 'SET_COMMENT',
    payload: { id, value },
  } as const);

export const createTask = (name: string, description: string) =>
  ({
    type: 'CREATE_TASK',
    payload: {
      name,
      description,
    },
  } as const);

// thunks
export const fetchTasks = () => (dispatch: Dispatch) => {
  taskDataAPI.fetchTasks().then(res => {
    dispatch(getTasks(res.data.value));
  });
};

export const fetchStatuses = () => (dispatch: Dispatch) => {
  taskDataAPI.getStatuses().then(res => {
    dispatch(getStatuses(res.data));
  });
};

export const fetchTags = () => (dispatch: Dispatch) => {
  taskDataAPI.fetchTags().then(res => dispatch(getTags(res.data)));
};

export const getTaskById = (id: number) => (dispatch: Dispatch) => {
  taskDataAPI.fetchTask(id).then(res => {
    dispatch(getTask(res.data));
  });
};

export const createTaskOData = (data: CreateModel) => (dispatch: Dispatch) => {
  taskDataAPI.createTaskData(data).then(res => {
    dispatch(createTask(res.data.name, res.data.description));
    dispatch(getNewTaskId(res.data));
    dispatch(setUpdate(true));
  });
};

export const updateStatusData = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  taskDataAPI.updateTask(data).then(res => {
    dispatch(setStatus(res.data.id, res.data.statusId));
    dispatch(setUpdate(true));
  });
};

export const updateTaskData = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  taskDataAPI.updateTask(data).then(res => {
    dispatch(setComment(res.data.id, res.data.comment));
  });
};

type InitialState = typeof initialState;

type ActionReducer =
  | ReturnType<typeof getTasks>
  | ReturnType<typeof getTask>
  | ReturnType<typeof setComment>
  | ReturnType<typeof createTask>
  | ReturnType<typeof getStatuses>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof setUpdate>
  | ReturnType<typeof getNewTaskId>
  | ReturnType<typeof getTags>;
