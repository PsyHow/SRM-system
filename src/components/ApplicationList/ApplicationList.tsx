import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './ApplicationList.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { Button } from 'components/common/Button/Button';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { UpdateTask } from 'components/UpdateTask/UpdateTask';
import { fetchTaskOData, getTask } from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

export const ApplicationList: FC = () => {
  const [toggle, setToggle] = useState({ create: false, update: false });
  const dispatch = useDispatch();
  const appList = useSelector<AppRootState, TaskData[]>(
    state => state.applicationListReducer.items,
  );

  useEffect(() => {
    dispatch(fetchTaskOData());
  }, [dispatch]);

  const onClickToggleCreateHandle = (): void => {
    setToggle(state => ({
      ...state,
      create: !state.create,
    }));
  };

  const onClickToggleUpdateHandle = (): void => {
    setToggle(state => ({
      ...state,
      update: !state.update,
    }));
  };

  return (
    <div className={style.container}>
      <Button title="Создать Заявку" onClickHandle={onClickToggleCreateHandle} />
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
              onClickToggleUpdateHandle();
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
      {toggle.create && (
        <div className={style.task}>
          <TaskForm setToggle={onClickToggleCreateHandle} />
        </div>
      )}
      {toggle.update && (
        <div className={style.task}>
          <UpdateTask setToggle={onClickToggleUpdateHandle} />
        </div>
      )}
    </div>
  );
};
