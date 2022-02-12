import { Dispatch } from 'redux';

import { tasksDataAPI } from 'api/tasksData/tasksDataAPI';
import { CreateModel, UpdateTaskModel } from 'api/tasksData/types';
import {
  getTasks,
  getTask,
  getNewTaskId,
  createTask,
  setUpdate,
  getTags,
  getStatuses,
  setStatus,
  setComment,
  getUsers,
  setExecutor,
} from 'store';

export const fetchTasks = () => (dispatch: Dispatch) => {
  tasksDataAPI.fetchTasks().then(res => {
    dispatch(getTasks(res.data.value));
  });
};

export const fetchStatuses = () => (dispatch: Dispatch) => {
  tasksDataAPI.getStatuses().then(res => {
    dispatch(getStatuses(res.data));
  });
};

export const fetchTags = () => (dispatch: Dispatch) => {
  tasksDataAPI.fetchTags().then(res => dispatch(getTags(res.data)));
};

export const fetchUsers = () => (dispatch: Dispatch) => {
  tasksDataAPI.fetchUsers().then(res => dispatch(getUsers(res.data)));
};

export const getTaskById = (id: number) => (dispatch: Dispatch) => {
  tasksDataAPI.fetchTask(id).then(res => {
    dispatch(getTask(res.data));
  });
};

export const createTaskOData = (data: CreateModel) => (dispatch: Dispatch) => {
  dispatch(setUpdate(false));
  tasksDataAPI.createTaskData(data).then(res => {
    dispatch(createTask(res.data.name, res.data.description));
    dispatch(getNewTaskId(res.data));
    dispatch(setUpdate(true));
  });
};

export const updateStatusData = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  dispatch(setUpdate(false));
  tasksDataAPI.updateTask(data).then(res => {
    dispatch(setStatus(res.data.id, res.data.statusId));
    dispatch(setUpdate(true));
  });
};

export const updateTaskData = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  tasksDataAPI.updateTask(data).then(res => {
    // dispatch(setUpdate(false));
    dispatch(setComment(res.data.id, res.data.comment));
    dispatch(setUpdate(true));
  });
};

export const updateExecutor = (data: UpdateTaskModel) => (dispatch: Dispatch) => {
  dispatch(setUpdate(false));
  tasksDataAPI.updateTask(data).then(res => {
    dispatch(setExecutor(res.data.id, res.data.executorId));
    dispatch(setUpdate(true));
  });
};
