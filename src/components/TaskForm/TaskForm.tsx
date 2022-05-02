import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './TaskForm.module.scss';

import { Button } from 'components/common/Button';
import { HeaderTask } from 'components/common/HeaderTask';
import { TextArea } from 'components/common/TextArea';
import { TaskFormProps } from 'components/TaskForm/types';
import { createTaskOData } from 'store/reducers';
import { setUpdate } from 'store/reducers/tasks';

export const TaskForm: FC<TaskFormProps> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState({ name: '', description: '' });

  const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    setText(state => ({
      ...state,
      name: value,
    }));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    setText(state => ({
      ...state,
      description: value,
    }));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = {
      name: text.name,
      description: text.description,
      priorityId: 104748,
    };

    dispatch(createTaskOData(data));
    setStatus('UPDATE');
    dispatch(setUpdate(true));
  };

  const handleCloseClick = (): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.container}>
      <HeaderTask title="Новая Заявка" onClick={handleCloseClick} />

      <span>Название</span>
      <TextArea value={text.name} onChangeHandle={handleNameChange} />

      <span>Описание</span>
      <TextArea value={text.description} onChangeHandle={handleDescriptionChange} />

      <Button type="submit" title="Сохранить" />
    </form>
  );
};
