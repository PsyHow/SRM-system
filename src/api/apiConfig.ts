import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://intravision-task.test01.intravision.ru',
});
