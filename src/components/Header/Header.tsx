import { FC } from 'react';

import style from './Header.module.scss';

export const Header: FC = () => (
  <div className={style.header}>
    <input type="search" />
  </div>
);
