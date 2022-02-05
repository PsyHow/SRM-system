import { CreateModel, StatusType, TaskResponse, UpdateTaskModel, instance } from 'api';

const tenantguid = '54eeb688-9a4a-4aba-9262-6fa3996a1fd3';

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
