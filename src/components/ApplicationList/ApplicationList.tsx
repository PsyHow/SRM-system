import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './ApplicationList.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { UpdateTask } from 'components/UpdateTask/UpdateTask';
import { fetchTaskOData, getTask } from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

export const ApplicationList: FC = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const appList = useSelector<AppRootState, TaskData[]>(
    state => state.applicationListReducer.items,
  );

  useEffect(() => {
    dispatch(fetchTaskOData());
  }, [dispatch]);

  const onClickToggleHandle = (): void => {
    setToggle(true);
  };

  return (
    <div className={style.container}>
      <button type="button" className={style.createTask} onClick={onClickToggleHandle}>
        Создать Заявку
      </button>
      <table className={style.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Название</td>
            <td>Статус</td>
            <td>Исполнитель</td>
          </tr>
        </thead>
        <tbody>
          {appList.map(task => {
            const getTaskByIdHandle = (): void => {
              dispatch(getTask(task));
              setToggle(true);
            };
            return (
              <tr key={task.id} onClick={getTaskByIdHandle}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>
                  <span style={{ backgroundColor: task.statusRgb }}>
                    {task.statusName}
                  </span>
                </td>
                <td>{task.executorName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {toggle && (
        <div className={style.task}>
          {/* <TaskForm setToggle={setToggle} /> */}
          <UpdateTask />
        </div>
      )}
    </div>
  );
};
