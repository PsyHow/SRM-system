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
  tags: TagsType[];
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
  lifetimeItems: LifeTimeType[];
};

export type LifeTimeType = {
  id: number;
  userName: string;
  lifetimeType: number;
  createdAt: Date;
  comment: string;
  fieldName: string;
  oldFieldValue: string;
  newFieldValue: string;
};

export type TagsType = {
  id: number;
  name: string;
};

export type StatusType = {
  rgb: string;
  id: number;
  name: string;
};

export type UpdateTaskModel = {
  id?: number;
  name?: string;
  description?: string;
  comment?: string;
  price?: number;
  taskTypeId?: number;
  statusId?: number;
  priorityId?: number;
  serviceId?: number;
  resolutionDatePlan?: Date;
  tags?: TagsType[];
  initiatorId?: number;
  executorId?: number;
  executorGroupId?: number;
};

export type CreateModel = {
  name: string;
  description: string;
  comment?: string;
  price?: number;
  taskTypeId?: number;
  statusId?: number;
  priorityId?: number;
  serviceId?: number;
  resolutionDatePlan?: string;
  tags?: TagsType[];
  initiatorId?: number;
  executorId?: number;
  executorGroupId?: number;
};

export type UsersType = {
  id: number;
  name: string;
};
