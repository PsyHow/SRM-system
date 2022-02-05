import { ChangeEvent, FC, useEffect, useState } from 'react';

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

  const [select, setSelect] = useState<string>(task.statusName);
  const [user, setUser] = useState<string>(task.executorName);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (task.id) dispatch(getTaskById(task.id));
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const onChangeSelectHandle = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelect(event.currentTarget.value);
    const { id } = statuses.filter(st => st.name === event.currentTarget.value)[0];
    dispatch(updateStatusData({ ...task, statusId: id }));
  };

  const OnChangeUserHandle = (event: ChangeEvent<HTMLSelectElement>): void => {
    setUser(event.currentTarget.value);
    const { id } = users.filter(usr => usr.name === event.currentTarget.value)[0];
    dispatch(updateExecutor({ ...task, executorId: id }));
  };

  const onChangeTextHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.currentTarget.value);
  };

  const onClickButtonHandle = (): void => {
    dispatch(updateTaskData({ ...task, comment: value }));
    setValue('');
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
          <TextArea value={value} onChangeHandle={onChangeTextHandle} />
          <Button title="Сохранить" onClickHandle={onClickButtonHandle} />
          <UpdateComment task={task} />
        </div>
        <div className={style.rightContent}>
          <div className={style.statusBox}>
            <div style={{ backgroundColor: task.statusRgb }} className={style.circle} />
            <span className={style.status}>{task.statusName}</span>
            <Select
              value={select}
              options={statuses}
              onChangeHandle={onChangeSelectHandle}
            />
          </div>
          <UpdateConfig
            users={users}
            task={task}
            onChange={OnChangeUserHandle}
            value={user}
          />
        </div>
      </div>
    </div>
  );
};
