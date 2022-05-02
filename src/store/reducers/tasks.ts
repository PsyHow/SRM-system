import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  PrioritiesType,
  StatusType,
  TagsType,
  TaskData,
  UsersType,
} from 'api/tasksData/types';
import {
  fetchPriorities,
  fetchTags,
  fetchTasks,
  fetchUsers,
  getTaskById,
  createTaskOData,
  fetchStatuses,
  initializeApp,
  updateExecutor,
  updateStatusData,
  updateTaskData,
} from 'store/middleware';

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
