import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './Navigation.module.scss';

import logotype from 'assets/images/logo.png';
import { navigationList } from 'components/Navigation/navigationList';

const activeStyle = ({ isActive }: any): string => (isActive ? style.activeLink : '');

export const Navigation: FC = () => (
  <div className={style.menu}>
    <div>
      <img className={style.logo} alt="logo" src={logotype} />
    </div>
    {navigationList.map(({ id, name, logo, path }) => (
      <NavLink key={id} to={path} className={activeStyle}>
        <div className={style.box}>
          <img alt="logotype" className={style.icon} src={logo} />
          <span>{name}</span>
        </div>
      </NavLink>
    ))}
  </div>
);
