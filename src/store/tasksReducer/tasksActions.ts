import { StatusType, TagsType, TaskData, UsersType } from 'api';
import { ACTION } from 'enums';

export const getTasks = (tasks: TaskData[]) =>
  ({
    type: ACTION.GET_TASKS,
    payload: tasks,
  } as const);

export const getTask = (task: TaskData) =>
  ({
    type: ACTION.GET_TASK,
    payload: task,
  } as const);

export const getTags = (tags: TagsType[]) =>
  ({
    type: ACTION.GET_TAGS,
    payload: tags,
  } as const);

export const getStatuses = (statuses: StatusType[]) =>
  ({
    type: ACTION.GET_STATUSES,
    payload: statuses,
  } as const);

export const getNewTaskId = (id: number) =>
  ({
    type: ACTION.GET_NEW_TASK_ID,
    payload: id,
  } as const);

export const getUsers = (users: UsersType[]) =>
  ({
    type: ACTION.GET_USERS,
    payload: users,
  } as const);

export const setUpdate = (isUpdate: boolean) =>
  ({
    type: ACTION.SET_UPDATE,
    payload: isUpdate,
  } as const);

export const setStatus = (taskId: number, statusId: number) =>
  ({
    type: ACTION.SET_STATUS,
    payload: { taskId, statusId },
  } as const);

export const setExecutor = (id: number, userId: number) =>
  ({
    type: ACTION.SET_EXECUTOR,
    payload: {
      id,
      userId,
    },
  } as const);

export const setComment = (id: number, value: string) =>
  ({
    type: ACTION.SET_COMMENT,
    payload: { id, value },
  } as const);

export const createTask = (name: string, description: string) =>
  ({
    type: ACTION.CREATE_TASK,
    payload: {
      name,
      description,
    },
  } as const);
