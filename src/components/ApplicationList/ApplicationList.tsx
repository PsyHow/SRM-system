import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './ApplicationList.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { Button } from 'components/common/Button/Button';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { UpdateTask } from 'components/UpdateTask/UpdateTask';
import { selectItem } from 'selectors/selectors';
import {
  fetchStatuses,
  fetchTaskOData,
  getTask,
  setComment,
  updateItem,
} from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

type StatusActive = 'CREATE' | 'UPDATE';

type TaskInfoProps = {
  status: StatusActive;
  onStatusChangeHandle: () => void;
  isActive: boolean;
};

const renderTaskInfo: FC<TaskInfoProps> = ({
  status,
  onStatusChangeHandle,
  isActive,
}) => {
  if (!isActive) {
    return null;
  }
  return (
    <>
      {status === 'CREATE' && (
        <div className={style.task}>
          <TaskForm setToggle={onStatusChangeHandle} />
        </div>
      )}
      {status === 'UPDATE' && (
        <div className={style.task}>
          <UpdateTask setToggle={onStatusChangeHandle} />
        </div>
      )}
    </>
  );
};

export const ApplicationList: FC = () => {
  const [status, setStatus] = useState<StatusActive>('CREATE');

  // const [] = useState();
  const dispatch = useDispatch();
  const items = useSelector<AppRootState, TaskData[]>(
    state => state.applicationListReducer.items,
  );
  const item = useSelector(selectItem);
  // const item = useSelector<AppRootState, TaskData>(
  //   state => state.applicationListReducer.item,
  // );
  const isItemEmpty = useMemo(() => Boolean(Object.keys(item).length), [item]);

  useEffect(() => {
    dispatch(fetchTaskOData());
  }, [dispatch]);

  // useEffect(()=> {
  //   dispatch(appList)
  // })

  useEffect(() => {
    dispatch(fetchStatuses());
  }, []);

  // const onClickToggleCreateHandle = (): void => {
  //   setToggle(state => ({
  //     ...state,
  //     create: !state.create,
  //   }));
  // };

  // const onStatusChangeHandle = useCallback(() => {
  //   if (status === 'CREATE' && isItemEmpty) {
  //     setStatus('UPDATE');
  //   } else {
  //     setStatus('CREATE');
  //   }
  // }, [item]);

  const onStatusChangeHandle = (): void => {
    if (status === 'CREATE' && isItemEmpty) {
      setStatus('UPDATE');
    } else {
      setStatus('CREATE');
    }
  };

  // const onClickToggleUpdateHandle = (): void => {
  //   setToggle(state => ({
  //     ...state,
  //     update: !state.update,
  //   }));
  // };

  return (
    <div className={style.container}>
      <Button
        title="Создать Заявку"
        // onClickHandle={onClickToggleCreateHandle}
        onClickHandle={() => {
          setStatus('CREATE');
          dispatch(updateItem({ ...item, name: '', description: '' }));
        }}
      />
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
          {items.map(task => {
            const getTaskByIdHandle = (): void => {
              dispatch(getTask(task));
              // onClickToggleUpdateHandle();
              setStatus('UPDATE');
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
      {renderTaskInfo({ status, onStatusChangeHandle, isActive: isItemEmpty })}
    </div>
  );
};
