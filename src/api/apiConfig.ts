import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://intravision-task.test01.intravision.ru',
  params: {
    tenantguid: '7189c2ac-a800-40ae-b011-2ec6bfee6e1a',
  },
});
