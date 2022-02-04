import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import style from './App.module.scss';

import { Header } from 'components/Header/Header';
import { Navigation } from 'components/Navigation/Navigation';
import { AnalyticsPage } from 'components/pages/AnalyticsPage';
import { ClientsPage } from 'components/pages/ClientsPage';
import { ErrorPage } from 'components/pages/ErrorPage';
import { KnowledgePage } from 'components/pages/KnowledgePage';
import { SettingsPage } from 'components/pages/SettingsPage';
import { UsersPage } from 'components/pages/UsersPage';
import { TasksList } from 'components/TasksList/TasksList';
import { Path } from 'enums/path';
import { selectIsUpdate } from 'selectors/selectors';
import { fetchStatuses, fetchTasks } from 'store/tasksReducer/tasksThunks';

const App: FC = () => {
  const dispatch = useDispatch();

  const isUpdate = useSelector(selectIsUpdate);

  useEffect(() => {
    dispatch(fetchStatuses());
    dispatch(fetchTasks());
  }, [isUpdate]);

  return (
    <div className={style.container}>
      <Navigation />
      <div className={style.content}>
        <Header />
        <Routes>
          <Route path={Path.TASKSLIST} element={<TasksList />} />
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
