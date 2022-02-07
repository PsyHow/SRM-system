import { ChangeEvent, FC } from 'react';

import style from './Select.module.scss';

import { StatusType, UsersType } from 'api';

type SelectProps = {
  value: string;
  options: UsersType[] | StatusType[];
  onChangeHandle: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: FC<SelectProps> = ({ options, onChangeHandle, value }) => (
  <select value={value} className={style.select} onChange={onChangeHandle}>
    {options.map(item => (
      <option key={item.id}>{item.name}</option>
    ))}
  </select>
);
