import { FC } from 'react';

import style from './App.module.scss';

import { ApplicationList } from 'components/ApplicationList/ApplicationList';
import { Header } from 'components/Header/Header';
import { Navigation } from 'components/Navigation/Navigation';

const App: FC = () => (
  <div className={style.container}>
    <Navigation />
    <div className={style.content}>
      <Header />
      <ApplicationList />
    </div>
  </div>
);

export default App;
