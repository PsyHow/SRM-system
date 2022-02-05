import { ChangeEvent, FC, useEffect, useState } from 'react';

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
    if (newTaskId !== task.id) {
      dispatch(getTaskById(newTaskId));
    }
  }, [newTaskId, task.id]);

  const changeNameHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    setText(state => ({
      ...state,
      name: value,
    }));
  };

  const changeDescriptionHandle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    setText(state => ({
      ...state,
      description: value,
    }));
  };

  const onButtonClickHandle = (): void => {
    dispatch(
      createTaskOData({
        name: text.name,
        description: text.description,
        resolutionDatePlan: createTaskDate,
      }),
    );
    dispatch(setUpdate(true));
  };

  const closeWindowHandle = (): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  };

  return (
    <div className={style.container}>
      <HeaderTask id="Новая Заявка" onClickHandle={closeWindowHandle} />
      <span>Название</span>
      <TextArea value={text.name} onChangeHandle={changeNameHandle} />
      <span>Описание</span>
      <TextArea value={text.description} onChangeHandle={changeDescriptionHandle} />
      <Button title="Сохранить" onClickHandle={onButtonClickHandle} />
    </div>
  );
};
