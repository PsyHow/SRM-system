import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './UpdateTask.module.scss';

import { TaskData } from 'api/taskDataAPI';
import { getTask } from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

export const UpdateTask: FC = () => {
  const dispatch = useDispatch();
  const item = useSelector<AppRootState, TaskData>(
    state => state.applicationListReducer.item,
  );
  useEffect(() => {
    dispatch(getTask(item));
  }, [dispatch, item]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>{item.id}</span>
        <span>{item.name}</span>
        <button type="button">X</button>
      </div>
      <div className={style.content}>
        <span>Описание</span>
        <p>{item.description}</p>
        <span>Добавление коментариев</span>
        <textarea />
        <button type="submit">Сохранить</button>
      </div>
    </div>
  );
};
