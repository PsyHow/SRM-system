import { FC } from 'react';

import style from './Select.module.scss';

import { SelectProps } from 'components/common/Select/types';
import { useSelect } from 'hooks/useSelect/useSelect';

export const Select: FC<SelectProps> = ({ options, value, id, task, actionCreator }) => {
  const { selectValue, handleSelectChange } = useSelect({
    value,
    id,
    options,
    task,
    actionCreator,
  });

  const mappedOptions = options.map(item => <option key={item.id}>{item.name}</option>);

  return (
    <select value={selectValue} className={style.select} onChange={handleSelectChange}>
      {mappedOptions}
    </select>
  );
};
