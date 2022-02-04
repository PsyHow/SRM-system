import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './App.module.scss';

import { ApplicationList } from 'components/ApplicationList/ApplicationList';
import { Header } from 'components/Header/Header';
import { Navigation } from 'components/Navigation/Navigation';
import { selectIsUpdate } from 'selectors/selectors';
import { fetchStatuses, fetchTags, fetchTasks } from 'store/applicationListReducer';

const App: FC = () => {
  const dispatch = useDispatch();

  const isUpdate = useSelector(selectIsUpdate);

  useEffect(() => {
    dispatch(fetchStatuses());
    dispatch(fetchTasks());
    dispatch(fetchTags());
  }, [isUpdate]);

  return (
    <div className={style.container}>
      <Navigation />
      <div className={style.content}>
        <Header />
        <ApplicationList />
      </div>
    </div>
  );
};

export default App;
