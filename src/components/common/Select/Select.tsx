import { ChangeEvent, FC } from 'react';

import style from './Select.module.scss';

import { StatusType, UsersType } from 'api/tasksData/types';

type SelectProps = {
  value: string;
  items: StatusType[] | UsersType[];
  onChangeHandle: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: FC<SelectProps> = ({ items, onChangeHandle,value }) => (
  <select className={style.select}  onChange={(e)=>{console.log('change')}}>
    {items.map(item => (
      <option value={value} key={item.id}>{item.name}</option>
    ))}
  </select>
);
