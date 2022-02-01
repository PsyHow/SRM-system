import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './ApplicationList.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { fetchTaskOData } from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

export const ApplicationList: FC = () => {
  const dispatch = useDispatch();
  const appList = useSelector<AppRootState, TaskData[]>(
    state => state.applicationListReducer.items,
  );

  useEffect(() => {
    dispatch(fetchTaskOData());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <button type="button">Создать Заявку</button>
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
          {appList.map(({ id, name, statusName, executorName, statusRgb }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                <span style={{ backgroundColor: statusRgb }}>{statusName}</span>
              </td>
              <td>{executorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
