import { instance } from './apiConfig';

const tenantguid = '7189c2ac-a800-40ae-b011-2ec6bfee6e1a';

export const taskDataAPI = {
  getTaskOData() {
    return instance.get<TaskResponse>(`/odata/tasks`, { params: { tenantguid } });
  },
  getTask(id: number) {
    return instance.get<TaskData>(`api/${tenantguid}/Tasks/${id}`);
  },
  updateTask(comment: string) {
    return instance.put<UpdateTaskResponse>(`/api/${tenantguid}/Tasks`, { comment });
  },
  createTaskData(name: string, description: string) {
    return instance.post<TaskData>(`/api/${tenantguid}/Tasks`, {
      name,
      description,
    });
  },
};

export type TaskResponse = {
  value: TaskData[];
  nextPageLink: string;
  count: number;
};

export type TaskData = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string;
  statusRgb: string;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: Date;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
  lifetimeItems: [
    {
      id: number;
      userName: string;
      lifetimeType: number;
      createdAt: Date;
      comment: string;
      fieldName: string;
      oldFieldValue: string;
      newFieldValue: string;
    },
  ];
};

export type UpdateTaskResponse = {
  id: number;
  name: string;
  description: string;
  comment: string;
  price: number;
  taskTypeId: number;
  statusId: number;
  priorityId: number;
  serviceId: number;
  resolutionDatePlan: Date;
  tags: [0];
  initiatorId: number;
  executorId: number;
  executorGroupId: number;
};
