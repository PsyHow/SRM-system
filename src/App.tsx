import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import style from './App.module.scss';

import {
  AnalyticsPage,
  ClientsPage,
  ErrorPage,
  Header,
  KnowledgePage,
  Navigation,
  SettingsPage,
  TasksList,
  UsersPage,
} from 'components';
import { Path } from 'enums';
import { selectIsUpdate } from 'selectors';
import { fetchStatuses, fetchTasks, fetchUsers } from 'store';

const App: FC = () => {
  const dispatch = useDispatch();

  const isUpdate = useSelector(selectIsUpdate);

  useEffect(() => {
    dispatch(fetchStatuses());
  }, [isUpdate]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [isUpdate]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [isUpdate]);

  return (
    <div className={style.container}>
      <Navigation />
      <div className={style.content}>
        <Header />
        <Routes>
          <Route path={Path.TASKS_LIST} element={<TasksList />} />
          <Route path={Path.KNOWLEDGE_PAGE} element={<KnowledgePage />} />
          <Route path={Path.USERS_PAGE} element={<UsersPage />} />
          <Route path={Path.CLIENTS_PAGE} element={<ClientsPage />} />
          <Route path={Path.ANALYTICS_PAGE} element={<AnalyticsPage />} />
          <Route path={Path.SETTINGS_PAGE} element={<SettingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
