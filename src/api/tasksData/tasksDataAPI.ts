import { CreateModel, StatusType, TaskResponse, UpdateTaskModel, instance } from 'api';

const tenantguid = 'c731c9c1-835b-45e0-be8b-f988c3de8d40';

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
