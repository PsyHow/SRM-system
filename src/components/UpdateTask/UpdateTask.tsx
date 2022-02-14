import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import {
  Button,
  HeaderTask,
  Select,
  StatusActive,
  TextArea,
  UpdateComment,
  UpdateConfig,
} from 'components';
import { removeRepeatWordsTags } from 'consts/base';
import {
  selectIsUpdate,
  selectNewTaskId,
  selectStatuses,
  selectTask,
  selectUsers,
} from 'selectors';
import {
  getTaskById,
  setUpdate,
  updateExecutor,
  updateStatusData,
  updateTaskData,
} from 'store';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const UpdateTask: FC<PropsType> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);
  const statuses = useSelector(selectStatuses);
  const users = useSelector(selectUsers);
  const isUpdate = useSelector(selectIsUpdate);
  const newTaskId = useSelector(selectNewTaskId);

  const [select, setSelect] = useState<{ name: string; status: string }>({
    name: task.executorName,
    status: task.statusName,
  });
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

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    const { value } = event.currentTarget;
    const { id } = statuses.filter(status => status.name === value)[0];

    setSelect(state => ({
      ...state,
      status: value,
    }));

    dispatch(updateStatusData({ ...task, statusId: id, tags: [] }));
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    const { value } = event.currentTarget;
    const { id } = users.filter(user => user.name === value)[0];

    setSelect(state => ({
      ...state,
      name: value,
    }));

    dispatch(updateExecutor({ ...task, executorId: id, tags: [] }));
  };

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
              value={select.status}
              options={statuses}
              onChangeHandle={handleStatusChange}
            />
          </div>
          <UpdateConfig
            users={users}
            task={task}
            onChange={handleUserChange}
            value={select.name}
          />
        </div>
      </div>
    </div>
  );
};
