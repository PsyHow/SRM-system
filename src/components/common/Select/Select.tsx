import { ChangeEvent, FC } from 'react';

import style from './Select.module.scss';

import { StatusType } from 'api/taskDataAPI';

type SelectProps = {
  value: string;
  items: StatusType[];
  onChangeHandle: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: FC<SelectProps> = ({ items, onChangeHandle, value }) => (
  <select className={style.select} value={value} onChange={onChangeHandle}>
    {items.map(item => (
      <option key={item.id}>{item.name}</option>
    ))}
  </select>
);
