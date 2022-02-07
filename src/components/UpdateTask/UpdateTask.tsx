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
import { selectStatuses, selectTask, selectTasks, selectUsers } from 'selectors';
import {
  fetchTags,
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
  const tasks = useSelector(selectTasks);

  const [select, setSelect] = useState<{ name: string; status: string }>({
    name: task.executorName,
    status: task.statusName,
  });
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (task.id) dispatch(getTaskById(task.id));
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();
    const { value } = event.currentTarget;
    setSelect(state => ({
      ...state,
      status: value,
    }));
    const { id } = statuses.filter(st => st.name === event.currentTarget.value)[0];
    dispatch(updateStatusData({ ...task, statusId: id }));
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();
    const { value } = event.currentTarget;
    setSelect(state => ({
      ...state,
      name: value,
    }));
    const { id } = users.filter(usr => usr.name === event.currentTarget.value)[0];
    dispatch(updateExecutor({ ...task, executorId: id }));
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.currentTarget.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(updateTaskData({ ...task, comment }));
    setComment('');
  };

  const handleCloseClick = useCallback((): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  }, []);

  return (
    <div className={style.container}>
      <HeaderTask id={task.id} name={task.name} onClick={handleCloseClick} />
      <div className={style.content}>
        <form onSubmit={handleFormSubmit} className={style.leftContent}>
          <span>Описание</span>
          <p>{task.description}</p>
          <span>Добавление коментариев</span>
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
