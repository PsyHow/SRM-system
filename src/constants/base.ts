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
