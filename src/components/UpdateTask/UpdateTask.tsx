import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import { Button } from 'components/common/Button/Button';
import { HeaderTask } from 'components/common/HeaderTask/HeaderTask';
import { Select } from 'components/common/Select/Select';
import { TextArea } from 'components/common/TextArea/TextArea';
import { StatusActive } from 'components/TasksList/TasksList';
import { UpdateComment } from 'components/UpdateTask/UpdateComment/UpdateComment';
import { UpdateConfig } from 'components/UpdateTask/UpdateConfig/UpdateConfig';
import {
  selectNewTaskId,
  selectStatuses,
  selectTask,
  selectTasks,
  selectUsers,
} from 'selectors/selectors';
import { setUpdate } from 'store/tasksReducer/tasksActions';
import {
  fetchTags,
  fetchUsers,
  getTaskById,
  updateExecutor,
  updateStatusData,
  updateTaskData,
} from 'store/tasksReducer/tasksThunks';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const UpdateTask: FC<PropsType> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);
  const statuses = useSelector(selectStatuses);
  const tasks = useSelector(selectTasks);
  const newTaskId = useSelector(selectNewTaskId);
  const users = useSelector(selectUsers);

  const statusNames = statuses.map(status => status.name);
  const userNames = users.map(user => user.name);

  const [select, setSelect] = useState<string>(statusNames[0]);
  const [user, setUser] = useState<string>(userNames[0]);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (newTaskId > 0) {
      dispatch(getTaskById(newTaskId));
    } else dispatch(getTaskById(task.id));
  }, [tasks, newTaskId]);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchUsers());
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
              items={statuses}
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
