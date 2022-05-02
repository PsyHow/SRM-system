import { FC, memo } from 'react';

import style from './UpdateConfig.module.scss';

import icon from 'assets/images/calendar.png';
import { Select } from 'components/common/Select';
import { UpdateConfigProps } from 'components/UpdateTask/UpdateConfig/types';
import { resolutionDate } from 'consts';
import { updateExecutor } from 'store/middleware';

export const UpdateConfig: FC<UpdateConfigProps> = memo(({ task, users }) => (
  <div className={style.container}>
    <span>Заявитель</span>
    <span>{task.initiatorName}</span>

    <div className={style.executorBox}>
      <span className={style.executor}>Исполнитель</span>
      <div className={style.select}>
        <div className={style.executorName}>{task.executorName}</div>
        <Select
          value={task.executorName}
          options={users}
          task={task}
          id="user"
          actionCreator={updateExecutor}
        />
      </div>
    </div>
    <div>
      <span>Приоритет</span>
      <span>{task.priorityName}</span>
    </div>
    <div>
      <span>Срок</span>
      <span>
        <img alt="calendar" src={icon} />
        {resolutionDate(task)}
      </span>
    </div>
    <div>
      <span className={style.tagsBox}>Теги</span>
      {task.tags &&
        task.tags.map(tag => (
          <div className={style.tagsContainer} key={tag.id}>
            <span className={style.tags}>{tag.name}</span>
          </div>
        ))}
    </div>
  </div>
));
