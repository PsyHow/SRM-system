import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tasksDataAPI } from 'api/tasksData/tasksDataAPI';
import {
  CreateModel,
  PrioritiesType,
  StatusType,
  TagsType,
  TaskData,
  UpdateTaskModel,
  UsersType,
} from 'api/tasksData/types';

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

const slice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [] as TaskData[],
    task: {} as TaskData,
    statuses: [] as StatusType[],
    isUpdate: false,
    newTaskId: 0,
    tags: [] as TagsType[],
    users: [] as UsersType[],
    priorities: [] as PrioritiesType[],
    error: null as null | string,
  },
  reducers: {
    getTask(state, action: PayloadAction<TaskData>) {
      state.task = action.payload;
    },

    getNewTaskId(state, action: PayloadAction<number>) {
      state.newTaskId = action.payload;
    },

    setUpdate(state, action: PayloadAction<boolean>) {
      state.isUpdate = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
    });

    builder.addCase(fetchStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload.statuses;
    });

    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload.tags;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
    });

    builder.addCase(getTaskById.fulfilled, (state, action) => {
      state.task = action.payload.task;
    });

    builder.addCase(fetchPriorities.fulfilled, (state, action) => {
      state.priorities = action.payload.priorities;
    });

    builder.addCase(initializeApp.fulfilled, state => state);

    builder.addCase(updateTaskData.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.taskData.id);
      if (index > -1) {
        state.tasks[index].lifetimeItems[action.payload.taskData.id].comment =
          action.payload.taskData.value;
      }
    });

    builder.addCase(updateExecutor.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.taskData.id);
      if (index > -1) {
        state.tasks[index].executorId = action.payload.taskData.userId;
      }
    });

    builder.addCase(updateStatusData.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.taskData.id);
      if (index > -1) {
        state.tasks[index].statusId = action.payload.taskData.statusId;
      }
    });

    builder.addCase(createTaskOData.fulfilled, (state, action) => {
      state.tasks.push({
        ...state.task,
        name: action.payload.newTask.name,
        description: action.payload.newTask.description,
      });
    });
  },
});

export const tasksReducer = slice.reducer;

export const { getNewTaskId, getTask, setError, setUpdate } = slice.actions;
