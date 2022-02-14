import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './TaskForm.module.scss';

import { Button, HeaderTask, StatusActive, TextArea } from 'components';
import { createTaskOData, setUpdate } from 'store';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const TaskForm: FC<PropsType> = ({ setStatus }) => {
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
