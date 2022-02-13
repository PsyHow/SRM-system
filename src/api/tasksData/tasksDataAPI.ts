import { CreateModel, instance, StatusType, TaskResponse, UpdateTaskModel } from 'api';

const tenantguid = '53a71225-9b70-433e-b436-a1e2408eae9f';

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
  fetchPriorities() {
    return instance.get(`/api/${tenantguid}/Priorities`);
  },
};
