import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button, TaskForm, UpdateTask } from 'components';
import style from 'components/TasksList/TasksList.module.scss';
import { removalRepeatWords } from 'consts/base';
import { selectIsUpdate, selectTasks } from 'selectors';
import { getTask } from 'store';

export type StatusActive = 'CREATE' | 'UPDATE' | 'DEFAULT';

export const TasksList: FC = () => {
  const [status, setStatus] = useState<StatusActive>('DEFAULT');
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const isUpdate = useSelector(selectIsUpdate);

  const handleClick = (): void => {
    setStatus('CREATE');
  };

  return (
    <div className={style.container}>
      <Button type="button" title="Создать Заявку" onClick={handleClick} />
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
          {tasks.map((task, index) => {
            const getTaskByIdHandle = (): void => {
              dispatch(getTask(task));
              setStatus('UPDATE');
            };
            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index} onClick={getTaskByIdHandle}>
                <td>{task.id}</td>
                <td>{task.name && task.name.replace(removalRepeatWords, '')}</td>
                <td>
                  <div
                    className={style.status}
                    style={{ backgroundColor: task.statusRgb }}
                  >
                    {task.statusName && task.statusName.toLocaleLowerCase()}
                  </div>
                </td>
                <td>{task.executorName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {status === 'CREATE' && (
        <div className={style.task}>
          <TaskForm setStatus={setStatus} />
        </div>
      )}
      {(status === 'UPDATE' || isUpdate) && (
        <div className={style.task}>
          <UpdateTask setStatus={setStatus} />
        </div>
      )}
    </div>
  );
};
