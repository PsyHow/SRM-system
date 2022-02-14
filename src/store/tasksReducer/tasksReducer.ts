import { PrioritiesType, StatusType, TagsType, TaskData, UsersType } from 'api';
import { ACTION } from 'enums';
import {
  createTask,
  getNewTaskId,
  getPriorities,
  getStatuses,
  getTags,
  getTask,
  getTasks,
  getUsers,
  setComment,
  setError,
  setExecutor,
  setStatus,
  setUpdate,
} from 'store';

const initialState = {
  tasks: [] as TaskData[],
  task: {} as TaskData,
  statuses: [] as StatusType[],
  isUpdate: false,
  newTaskId: 0,
  tags: [] as TagsType[],
  users: [] as UsersType[],
  priorities: [] as PrioritiesType[],
  error: null as null | string,
};

export const tasksReducer = (
  state = initialState,
  action: ActionReducer,
): InitialState => {
  switch (action.type) {
    case ACTION.GET_PRIORITIES: {
      return {
        ...state,
        priorities: action.payload,
      };
    }
    case ACTION.GET_TAGS: {
      return {
        ...state,
        tags: action.payload,
      };
    }
    case ACTION.GET_TASKS: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case ACTION.GET_TASK: {
      return {
        ...state,
        task: action.payload,
      };
    }
    case ACTION.GET_STATUSES: {
      return {
        ...state,
        statuses: action.payload,
      };
    }
    case ACTION.GET_NEW_TASK_ID: {
      return {
        ...state,
        newTaskId: action.payload,
      };
    }
    case ACTION.GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case ACTION.SET_UPDATE: {
      return {
        ...state,
        isUpdate: action.payload,
      };
    }
    case ACTION.SET_STATUS: {
      return {
        ...state,
        tasks: state.tasks.filter(task =>
          task.id === action.payload.taskId
            ? { ...task, statusId: action.payload.statusId }
            : task,
        ),
      };
    }
    case ACTION.SET_EXECUTOR: {
      return {
        ...state,
        tasks: state.tasks.filter(task =>
          task.id === action.payload.id
            ? { ...task, executorId: action.payload.userId }
            : task,
        ),
      };
    }
    case ACTION.SET_COMMENT: {
      return {
        ...state,
        tasks: state.tasks.filter(task =>
          task.id === action.payload.id
            ? { ...task, comment: action.payload.value }
            : task,
        ),
      };
    }
    case ACTION.CREATE_TASK: {
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
    case ACTION.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

type InitialState = typeof initialState;

export type ActionReducer =
  | ReturnType<typeof getTasks>
  | ReturnType<typeof getTask>
  | ReturnType<typeof setComment>
  | ReturnType<typeof createTask>
  | ReturnType<typeof getStatuses>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof setUpdate>
  | ReturnType<typeof getNewTaskId>
  | ReturnType<typeof getTags>
  | ReturnType<typeof getUsers>
  | ReturnType<typeof setExecutor>
  | ReturnType<typeof getPriorities>
  | ReturnType<typeof setError>;
