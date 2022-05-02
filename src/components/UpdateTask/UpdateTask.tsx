import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import { Button } from 'components/common/Button';
import { HeaderTask } from 'components/common/HeaderTask';
import { Select } from 'components/common/Select';
import { TextArea } from 'components/common/TextArea';
import { UpdateTaskProps } from 'components/UpdateTask/types';
import { UpdateComment } from 'components/UpdateTask/UpdateComment';
import { UpdateConfig } from 'components/UpdateTask/UpdateConfig';
import { removeRepeatWordsTags } from 'consts/base';
import {
  selectIsUpdate,
  selectNewTaskId,
  selectStatuses,
  selectTask,
  selectUsers,
} from 'selectors';
import { updateStatusData, getTaskById } from 'store/reducers';
import { setUpdate, updateTaskData } from 'store/reducers/tasks';

export const UpdateTask: FC<UpdateTaskProps> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);
  const statuses = useSelector(selectStatuses);
  const users = useSelector(selectUsers);
  const isUpdate = useSelector(selectIsUpdate);
  const newTaskId = useSelector(selectNewTaskId);

  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (newTaskId && newTaskId !== 0) {
      dispatch(getTaskById(newTaskId));
    }
  }, [newTaskId, isUpdate]);

  useEffect(() => {
    if (task.id && task.id !== newTaskId) {
      dispatch(getTaskById(task.id));
    }
  }, [task.id, isUpdate]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.currentTarget.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    dispatch(updateTaskData({ ...task, comment, tags: [] }));
    setComment('');
  };

  const handleCloseClick = useCallback((): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  }, []);

  return (
    <div className={style.container}>
      <HeaderTask title={`№${task.id}`} name={task.name} onClick={handleCloseClick} />

      <div className={style.content}>
        <form onSubmit={handleFormSubmit} className={style.leftContent}>
          <div className={style.description}>Описание</div>
          <span className={style.taskDescription}>
            {removeRepeatWordsTags(task.description)}
          </span>

          <div className={style.description}>Добавление коментариев</div>
          <TextArea value={comment} onChangeHandle={handleTextChange} />

          <Button type="submit" title="Сохранить" />

          <UpdateComment task={task} />
        </form>
        <div className={style.rightContent}>
          <div className={style.statusBox}>
            <div style={{ backgroundColor: task.statusRgb }} className={style.circle} />
            <span className={style.status}>{task.statusName}</span>
            <Select
              value={task.statusName}
              options={statuses}
              task={task}
              id="status"
              actionCreator={updateStatusData}
            />
          </div>
          <UpdateConfig users={users} task={task} />
        </div>
      </div>
    </div>
  );
};
