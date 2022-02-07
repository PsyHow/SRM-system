import analytics from 'assets/images/analytics.png';
import clients from 'assets/images/clients.png';
import dataBase from 'assets/images/dataBase.png';
import settings from 'assets/images/settings.png';
import tasks from 'assets/images/tasks.png';
import users from 'assets/images/users.png';
import { Path } from 'enums';

type NavigationListType = {
  id: number;
  logo: string;
  name: string;
  path: string;
};

export const navigationList: NavigationListType[] = [
  { id: 1, logo: dataBase, name: 'База знаний', path: Path.KNOWLEDGE_PAGE },
  { id: 2, logo: tasks, name: 'Заявки', path: Path.TASKS_LIST },
  { id: 3, logo: users, name: 'Сотрудники', path: Path.USERS_PAGE },
  { id: 4, logo: clients, name: 'Клиенты', path: Path.CLIENTS_PAGE },
  { id: 5, logo: analytics, name: 'Активы', path: Path.ANALYTICS_PAGE },
  { id: 6, logo: settings, name: 'Настройки', path: Path.SETTINGS_PAGE },
];
