import { CreateModel, instance, StatusType, UpdateTaskModel } from 'api';

const tenantguid = '80ae823f-158a-4c25-8521-2e2025b23c81';

export const tasksDataAPI = {
  fetchTasks() {
    return instance.get(`/odata/tasks`, { params: { tenantguid } });
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
  fetchPriorities() {
    return instance.get(`/api/${tenantguid}/Priorities`);
  },
};
