import { CreateModel, StatusType, TaskResponse, UpdateTaskModel } from './types';

import { instance } from 'api/apiConfig';

const tenantguid = '77753b11-7a94-47a6-88f7-4c232f73e789';

export const tasksDataAPI = {
  fetchTasks() {
    return instance.get<TaskResponse>(`/odata/tasks`, { params: { tenantguid } });
  },
  fetchTask(id: number) {
    return instance.get(`api/${tenantguid}/Tasks/${id}`);
  },
  updateTask(data: UpdateTaskModel) {
    return instance.put(`/api/${tenantguid}/Tasks`, data);
  },
  createTaskData(data: CreateModel) {
    return instance.post(`/api/${tenantguid}/Tasks`, data);
  },
  getStatuses() {
    return instance.get<StatusType[]>(`/api/${tenantguid}/Statuses`);
  },
  fetchTags() {
    return instance.get(`/api/${tenantguid}/Tags`);
  },
  fetchUsers() {
    return instance.get(`/api/${tenantguid}/Users`);
  },
};
