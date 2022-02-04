import {
  createTask,
  getNewTaskId,
  getStatuses,
  getTags,
  getTask,
  getTasks,
  getUsers,
  setComment,
  setExecutor,
  setStatus,
  setUpdate,
} from './tasksActions';

import { StatusType, TagsType, TaskData, UsersType } from 'api/tasksData/types';
import { ACTION } from 'enums/actionTypes';

const initialState = {
  tasks: [] as TaskData[],
  task: {} as TaskData,
  statuses: [] as StatusType[],
  isUpdate: false,
  newTaskId: 0,
  tags: [] as TagsType[],
  users: [] as UsersType[],
};

export const tasksReducer = (
  state = initialState,
  action: ActionReducer,
): InitialState => {
  switch (action.type) {
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
    default:
      return state;
  }
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
  | ReturnType<typeof getTags>
  | ReturnType<typeof getUsers>
  | ReturnType<typeof setExecutor>;