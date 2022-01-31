import { FC } from 'react';

import style from './Navigation.module.scss';

import logo from 'assets/images/logo.png';

export const Navigation: FC = () => (
  <div className={style.menu}>
    <img alt="logo" src={logo} />
  </div>
);
