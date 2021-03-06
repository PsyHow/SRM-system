import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components/common/Button';
import { TaskForm } from 'components/TaskForm';
import style from 'components/TasksList/TasksList.module.scss';
import { UpdateTask } from 'components/UpdateTask';
import { StatusActive } from 'consts';
import { removeRepeatWordsTags } from 'consts/base';
import { selectIsUpdate, selectTasks } from 'selectors';
import { selectPriorities } from 'selectors/tasks';
import { getNewTaskId, getTask, setUpdate } from 'store/reducers/tasks';

export const TasksList: FC = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const isUpdate = useSelector(selectIsUpdate);
  const priorities = useSelector(selectPriorities);

  const [status, setStatus] = useState<StatusActive>('DEFAULT');

  const handleClick = (): void => {
    dispatch(setUpdate(false));
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
              dispatch(getNewTaskId(0));
              dispatch(getTask(task));
              setStatus('UPDATE');
            };

            const priorityColor = priorities.filter(
              color => color.id === task.priorityId,
            )[0];

            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index} onClick={getTaskByIdHandle}>
                <td className={style.idPriority}>
                  {task.id && <span style={{ backgroundColor: priorityColor.rgb }} />}
                  {task.id}
                </td>
                <td>
                  <div>{task.name && removeRepeatWordsTags(task.name)}</div>
                </td>
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
