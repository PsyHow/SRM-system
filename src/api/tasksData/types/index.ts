export interface TaskResponse {
  value: TaskData[];
  nextPageLink: string;
  count: number;
}

export interface TaskData {
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
}

export interface LifeTimeType {
  id: number;
  userName: string;
  lifetimeType: number;
  createdAt: Date;
  comment: string;
  fieldName: string;
  oldFieldValue: string;
  newFieldValue: string;
}

export interface TagsType {
  id: number;
  name: string;
}

export interface StatusType {
  rgb: string;
  id: number;
  name: string;
}

export interface UpdateTaskModel {
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
}

export interface CreateModel {
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
}

export interface UsersType {
  id: number;
  name: string;
}

export interface PrioritiesType {
  rgb: string;
  id: number;
  name: string;
}
