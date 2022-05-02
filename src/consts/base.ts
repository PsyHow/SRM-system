import { LifeTimeType, TaskData } from 'api/tasksData/types';

export type StatusActive = 'CREATE' | 'UPDATE' | 'DEFAULT';

export const resolutionDate = (task: TaskData): string =>
  new Date(task.resolutionDatePlan).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const commentDate = (LfItem: LifeTimeType): string =>
  new Date(LfItem.createdAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

export const createTaskDate = 'May 5, 2022 03:24:00';

export const removeRepeatWordsTags = (value: string): string =>
  value &&
  value
    .replace(/,/g, ' ')
    .replace(/(<([^>]+)>)/gi, '')
    .split(' ')
    .filter((item, index, array) => index === array.indexOf(item))
    .join(' ');
