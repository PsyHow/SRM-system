import { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import { UseSelectProps, UseSelectReturnType } from 'hooks/useSelect/types';

export const useSelect = ({
  value,
  id,
  options,
  actionCreator,
  task,
}: UseSelectProps): UseSelectReturnType => {
  const dispatch = useDispatch();

  const [selectExecutor, setSelectExecutor] = useState(value);
  const [selectStatus, setSelectStatus] = useState(value);

  const selectValue = id === 'status' ? selectStatus : selectExecutor;

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    const currentValue = event.currentTarget.value;

    if (id === 'status') {
      const currentId = options.filter(item => item.name === currentValue)[0].id;
      setSelectStatus(currentValue);

      dispatch(actionCreator({ ...task, statusId: currentId, tags: [] }));
    }
    if (id === 'user') {
      const currentId = options.filter(item => item.name === currentValue)[0].id;
      setSelectExecutor(currentValue);

      dispatch(actionCreator({ ...task, executorId: currentId, tags: [] }));
    }
  };
  return { selectValue, handleSelectChange };
};
