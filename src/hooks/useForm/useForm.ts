import { ChangeEvent, useState } from 'react';

export const useForm = (): any => {
  const [value, setValue] = useState({ name: '', description: '' });

  const changeNameHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    setValue(state => ({
      ...state,
      name: value,
    }));
  };

  const changeDescriptionHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    setValue(state => ({
      ...state,
      description: value,
    }));
  };
  return { value, changeNameHandle, changeDescriptionHandle };
};
