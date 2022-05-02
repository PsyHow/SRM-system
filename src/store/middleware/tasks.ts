import { createAsyncThunk } from '@reduxjs/toolkit';

import { tasksDataAPI } from 'api/tasksData';
import { CreateModel, UpdateTaskModel } from 'api/tasksData/types';
import { getNewTaskId, setError, setUpdate } from 'store/reducers';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (param, { dispatch, rejectWithValue }) => {
    const res = await tasksDataAPI.fetchTasks();

    try {
      return { tasks: res.data.value };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const fetchStatuses = createAsyncThunk(
  'tasks/fetchStatuses',
  async (param, { dispatch, rejectWithValue }) => {
    const res = await tasksDataAPI.getStatuses();

    try {
      return { statuses: res.data };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const fetchTags = createAsyncThunk(
  'tasks/fetchTags',
  async (param, { dispatch, rejectWithValue }) => {
    const res = await tasksDataAPI.fetchTags();

    try {
      return { tags: res.data };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  'tasks/fetchUsers',
  async (param, { dispatch, rejectWithValue }) => {
    const res = await tasksDataAPI.fetchUsers();

    try {
      return { users: res.data };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const fetchPriorities = createAsyncThunk(
  'tasks/fetchPriorities',
  async (param, { dispatch, rejectWithValue }) => {
    const res = await tasksDataAPI.fetchPriorities();

    try {
      return { priorities: res.data };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (id: number, { dispatch, rejectWithValue }) => {
    const res = await tasksDataAPI.fetchTask(id);

    try {
      return { task: res.data };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const updateTaskData = createAsyncThunk(
  'tasks/updateTaskData',
  async (data: UpdateTaskModel, { dispatch, rejectWithValue }) => {
    dispatch(setUpdate(false));
    const res = await tasksDataAPI.updateTask(data);

    try {
      dispatch(setUpdate(true));
      return { taskData: res.data };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const updateExecutor = createAsyncThunk(
  'tasks/updateExecutor',
  async (data: UpdateTaskModel, { dispatch, rejectWithValue }) => {
    dispatch(setUpdate(false));
    const res = await tasksDataAPI.updateTask(data);

    try {
      dispatch(setUpdate(true));
      return { taskData: { id: res.data.id, userId: res.data.userId } };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const updateStatusData = createAsyncThunk(
  'tasks/updateStatusData',
  async (data: UpdateTaskModel, { dispatch, rejectWithValue }) => {
    dispatch(setUpdate(false));
    const res = await tasksDataAPI.updateTask(data);

    try {
      dispatch(setUpdate(true));
      return { taskData: { id: res.data.id, statusId: res.data.statusId } };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const createTaskOData = createAsyncThunk(
  'tasks/createTaskOData',
  async (data: CreateModel, { dispatch, rejectWithValue }) => {
    dispatch(setUpdate(false));
    const res = await tasksDataAPI.createTaskData(data);

    try {
      dispatch(setUpdate(true));
      dispatch(getNewTaskId(res.data));
      return { newTask: { name: res.data.name, description: res.data.description } };
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);

export const initializeApp = createAsyncThunk(
  'tasks/initializeApp',
  async (param, { dispatch, rejectWithValue }) => {
    const promise1 = dispatch(fetchPriorities());
    const promise2 = dispatch(fetchStatuses());
    const promise3 = dispatch(fetchUsers());

    try {
      return await Promise.all([promise1, promise2, promise3]);
    } catch (error) {
      dispatch(setError((error as Error).message));
      return rejectWithValue(null);
    }
  },
);
