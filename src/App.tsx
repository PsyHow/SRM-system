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
import { selectIsUpdate, selectNewTaskId, selectTask } from 'selectors';
import { fetchPriorities, fetchStatuses, fetchTasks, fetchUsers } from 'store';

const App: FC = () => {
  const dispatch = useDispatch();

  const isUpdate = useSelector(selectIsUpdate);
  const task = useSelector(selectTask);
  const newTaskId = useSelector(selectNewTaskId);

  useEffect(() => {
    dispatch(fetchStatuses());
    dispatch(fetchPriorities());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [isUpdate, task.id, newTaskId]);

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
