import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './TaskForm.module.scss';

import { Button, HeaderTask, StatusActive, TextArea } from 'components';
import { createTaskDate } from 'consts';
import { selectNewTaskId, selectTask } from 'selectors';
import { createTaskOData, getTaskById, setUpdate } from 'store';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const TaskForm: FC<PropsType> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState({ name: '', description: '' });
  const newTaskId = useSelector(selectNewTaskId);
  const task = useSelector(selectTask);

  useEffect(() => {
    if (newTaskId !== task.id && newTaskId !== 0) {
      dispatch(getTaskById(newTaskId));
    }
  }, [newTaskId, task.id]);

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
    dispatch(
      createTaskOData({
        name: text.name,
        description: text.description,
        resolutionDatePlan: createTaskDate,
      }),
    );
    dispatch(setUpdate(true));
  };

  const handleCloseClick = (): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.container}>
      <HeaderTask id="Новая Заявка" onClick={handleCloseClick} />
      <span>Название</span>
      <TextArea value={text.name} onChangeHandle={handleNameChange} />
      <span>Описание</span>
      <TextArea value={text.description} onChangeHandle={handleDescriptionChange} />
      <Button type="submit" title="Сохранить" />
    </form>
  );
};
