import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './Navigation.module.scss';

import analytics from 'assets/images/analytics.png';
import clients from 'assets/images/clients.png';
import dataBase from 'assets/images/dataBase.png';
import logo from 'assets/images/logo.png';
import settings from 'assets/images/settings.png';
import tasks from 'assets/images/tasks.png';
import users from 'assets/images/users.png';
import { Path } from 'enums/path';

// @ts-ignore
const activeStyle = ({ isActive }) => (isActive ? style.activeLink : '');

export const Navigation: FC = () => (
  <div className={style.menu}>
    <img className={style.logo} alt="logo" src={logo} />
    <NavLink className={activeStyle} to={Path.KNOWLEDGE_PAGE}>
      <div className={style.box}>
        <img className={style.icon} alt="base" src={dataBase} />
        <span>База знаний</span>
      </div>
    </NavLink>
    <NavLink className={activeStyle} to={Path.TASKSLIST}>
      <div className={style.box}>
        <img className={style.icon} alt="tasks" src={tasks} />
        <span>Заявки</span>
      </div>
    </NavLink>
    <NavLink className={activeStyle} to={Path.USERS_PAGE}>
      <div className={style.box}>
        <img className={style.icon} alt="users" src={users} />
        <span>Сотрудники</span>
      </div>
    </NavLink>
    <NavLink className={activeStyle} to={Path.CLIENTS_PAGE}>
      <div className={style.box}>
        <img className={style.icon} alt="clients" src={clients} />
        <span>Клиенты</span>
      </div>
    </NavLink>
    <NavLink className={activeStyle} to={Path.ANALYTICS_PAGE}>
      <div className={style.box}>
        <img className={style.icon} alt="analytics" src={analytics} />
        <span>Активы</span>
      </div>
    </NavLink>
    <NavLink className={activeStyle} to={Path.SETTINGS_PAGE}>
      <div className={style.box}>
        <img className={style.icon} alt="settings" src={settings} />
        <span>Настройки</span>
      </div>
    </NavLink>
  </div>
);
