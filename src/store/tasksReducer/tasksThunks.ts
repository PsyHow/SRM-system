import { tasksDataAPI } from 'api/tasksData/tasksDataAPI';
import { CreateModel, UpdateTaskModel } from 'api/tasksData/types';
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
import { AppThunkType } from 'store/store';

export const fetchTasks = (): AppThunkType => async dispatch => {
  try {
    const res = await tasksDataAPI.fetchTasks();
    dispatch(getTasks(res.data.value));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const fetchStatuses = (): AppThunkType => async dispatch => {
  try {
    const res = await tasksDataAPI.getStatuses();
    dispatch(getStatuses(res.data));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const fetchTags = (): AppThunkType => async dispatch => {
  try {
    const res = await tasksDataAPI.fetchTags();
    dispatch(getTags(res.data));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const fetchUsers = (): AppThunkType => async dispatch => {
  try {
    const res = await tasksDataAPI.fetchUsers();
    dispatch(getUsers(res.data));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const getTaskById =
  (id: number): AppThunkType =>
  async dispatch => {
    try {
      const res = await tasksDataAPI.fetchTask(id);
      dispatch(getTask(res.data));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

export const createTaskOData =
  (data: CreateModel): AppThunkType =>
  async dispatch => {
    dispatch(setUpdate(false));
    try {
      const res = await tasksDataAPI.createTaskData(data);
      dispatch(getNewTaskId(res.data));
      dispatch(createTask(res.data.name, res.data.description));
      dispatch(setUpdate(true));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

export const updateStatusData =
  (data: UpdateTaskModel): AppThunkType =>
  async dispatch => {
    dispatch(setUpdate(false));
    try {
      const res = await tasksDataAPI.updateTask(data);
      dispatch(setStatus(res.data.id, res.data.statusId));
      dispatch(setUpdate(true));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

export const updateTaskData =
  (data: UpdateTaskModel): AppThunkType =>
  async dispatch => {
    dispatch(setUpdate(false));
    try {
      const res = await tasksDataAPI.updateTask(data);
      dispatch(setComment(res.data.id, res.data.comment));
      dispatch(setUpdate(true));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

export const updateExecutor =
  (data: UpdateTaskModel): AppThunkType =>
  async dispatch => {
    dispatch(setUpdate(false));
    try {
      const res = await tasksDataAPI.updateTask(data);
      dispatch(setExecutor(res.data.id, res.data.executorId));
      dispatch(setUpdate(true));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

export const fetchPriorities = (): AppThunkType => async dispatch => {
  try {
    const res = await tasksDataAPI.fetchPriorities();
    dispatch(getPriorities(res.data));
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};

export const initializeApp = (): AppThunkType => async dispatch => {
  const promise1 = dispatch(fetchPriorities());
  const promise2 = dispatch(fetchStatuses());
  const promise3 = dispatch(fetchUsers());
  try {
    await Promise.all([promise1, promise2, promise3]);
  } catch (error) {
    dispatch(setError((error as Error).message));
  }
};
