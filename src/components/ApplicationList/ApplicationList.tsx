import { FC } from 'react';

import { useSelector } from 'react-redux';

import style from './ApplicationList.module.scss';

import { AppList } from 'store/applicationListReducer';
import { AppRootState } from 'store/store';

export const ApplicationList: FC = () => {
  const appList = useSelector<AppRootState, AppList[]>(
    state => state.applicationListReducer.appList,
  );
  return (
    <>
      <div className={style.container}>
        <span>ID</span>
        <span>Название</span>
        <span>Статус</span>
        <span>Исполнитель</span>
      </div>
      <div>
        {appList.map(list => (
          <div key={list.id} className={style.mapList}>
            <span>{list.id}</span>
            <span>{list.name}</span>
            <span>{list.status}</span>
            <span>{list.owner}</span>
          </div>
        ))}
      </div>
    </>
  );
};
