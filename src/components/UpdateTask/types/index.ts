import { StatusActive } from 'consts';

export interface UpdateTaskProps {
  setStatus: (value: StatusActive) => void;
}
