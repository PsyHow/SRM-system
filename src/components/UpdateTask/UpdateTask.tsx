import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import { StatusActive } from 'components/ApplicationList/ApplicationList';
import { Button } from 'components/common/Button/Button';
import { HeaderTask } from 'components/common/HeaderTask/HeaderTask';
import { Select } from 'components/common/Select/Select';
import { commentDate, resolutionDate } from 'constants/base';
import {
  selectNewTaskId,
  selectStatuses,
  selectTask,
  selectTasks,
} from 'selectors/selectors';
import {
  getTaskById,
  setUpdate,
  updateStatusData,
  updateTaskData,
} from 'store/applicationListReducer';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const UpdateTask: FC<PropsType> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);
  const statuses = useSelector(selectStatuses);
  const tasks = useSelector(selectTasks);
  const newTaskId = useSelector(selectNewTaskId);

  const statusName = statuses.map(m => m.name);

  const [select, setSelect] = useState<string>(statusName[0]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (newTaskId > 0) {
      dispatch(getTaskById(newTaskId));
    } else dispatch(getTaskById(task.id));
  }, [tasks, newTaskId]);

  const onChangeSelectHandle = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelect(event.currentTarget.value);
    const { id } = statuses.filter(st => st.name === event.currentTarget.value)[0];
    dispatch(updateStatusData({ ...task, statusId: id }));
  };

  const onChangeTextHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.currentTarget.value);
  };

  const onClickButtonHandle = (): void => {
    dispatch(updateTaskData({ ...task, comment: value }));
  };

  const closeWindowHandle = (): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  };

  return (
    <div className={style.container}>
      <HeaderTask id={task.id} name={task.name} onClickHandle={closeWindowHandle} />
      <div className={style.content}>
        <div className={style.leftContent}>
          <span>Описание</span>
          <p>{task.description}</p>
          <span>Добавление коментариев</span>
          <textarea value={value} onChange={onChangeTextHandle} />
          <Button title="Сохранить" onClickHandle={onClickButtonHandle} />
          {task.lifetimeItems &&
            task.lifetimeItems.map(LfItem => (
              <div key={LfItem.id} className={style.containerComment}>
                {LfItem.comment && (
                  <>
                    <div className={style.commentBox}>
                      <div className={style.avatar} />
                      <div>
                        <div className={style.name}>{task.initiatorName}</div>
                        <span className={style.date}>
                          {commentDate(LfItem)} прокомментировал
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className={style.comment}>{LfItem.comment}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className={style.rightContent}>
          <div className={style.statusBox}>
            <div style={{ backgroundColor: task.statusRgb }} className={style.circle} />
            <span>{task.statusName}</span>
            <Select
              value={select}
              items={statuses}
              onChangeHandle={onChangeSelectHandle}
            />
          </div>
          <span>Заявитель</span>
          <span>{task.initiatorName}</span>
          <span>Исполнитель</span>
          <span>{task.executorName}</span>
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
      </div>
    </div>
  );
};
