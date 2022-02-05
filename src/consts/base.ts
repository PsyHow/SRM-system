import { LifeTimeType, TaskData } from 'api/tasksData/types';

export const resolutionDate = (task: TaskData) =>
  new Date(task.resolutionDatePlan).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const commentDate = (LfItem: LifeTimeType) =>
  new Date(LfItem.createdAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

export const createTaskDate = 'May 5, 2022 03:24:00';
