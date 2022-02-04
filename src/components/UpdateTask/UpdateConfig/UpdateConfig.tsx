import { ChangeEvent, FC } from 'react';

import style from './UpdateConfig.module.scss';

import { TaskData, UsersType } from 'api/tasksData/types';
import { Select } from 'components/common/Select/Select';
import { resolutionDate } from 'constants/base';

type UpdateConfigProps = {
  task: TaskData;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  users: UsersType[];
};

export const UpdateConfig: FC<UpdateConfigProps> = ({ task, value, users, onChange }) => (
  <div className={style.container}>
    <span>Заявитель</span>
    <span>{task.initiatorName}</span>
    <span>Исполнитель</span>
    <div>
      <span>{task.executorName}</span>
      <Select value={value} items={users} onChangeHandle={onChange} />
    </div>
    <span>Приоритет</span>
    <span>{task.priorityName}</span>
    <span>Срок</span>
    <span>{resolutionDate(task)}</span>
    <span>Теги</span>
    {task.tags &&
      task.tags.map(tag => (
        <div className={style.tags} key={tag.id}>
          {tag.name}
        </div>
      ))}
  </div>
);
