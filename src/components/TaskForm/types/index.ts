import { StatusActive } from 'consts';

export interface TaskFormProps {
  setStatus: (value: StatusActive) => void;
}
