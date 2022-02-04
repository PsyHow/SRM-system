import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './TaskForm.module.scss';

import { Button } from 'components/common/Button/Button';
import { HeaderTask } from 'components/common/HeaderTask/HeaderTask';
import { TextArea } from 'components/common/TextArea/TextArea';
import { StatusActive } from 'components/TasksList/TasksList';
import { setUpdate } from 'store/tasksReducer/tasksActions';
import { createTaskOData } from 'store/tasksReducer/tasksThunks';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const TaskForm: FC<PropsType> = ({ setStatus }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState({ name: '', description: '' });

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
    dispatch(createTaskOData({ name: text.name, description: text.description }));
    // dispatch(setUpdate(true));
    // setStatus('DEFAULT');
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
