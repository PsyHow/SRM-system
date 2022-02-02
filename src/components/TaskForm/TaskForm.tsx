import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './TaskForm.module.scss';

import { createTaskOData } from 'store/applicationListReducer';

type PropsType = {
  setToggle: (value: boolean) => void;
};

export const TaskForm: FC<PropsType> = ({ setToggle }) => {
  const [value, setValue] = useState({ name: '', description: '' });
  const dispatch = useDispatch();

  const onButtonClickHandle = (): void => {
    dispatch(createTaskOData(value.name, value.description));
  };

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

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>Новая заявка</span>
        <button
          type="button"
          className={style.headerButton}
          onClick={() => setToggle(false)}
        >
          X
        </button>
      </div>
      <span>Название</span>
      <textarea value={value.name} onChange={changeNameHandle} />
      <span>Описание</span>
      <textarea value={value.description} onChange={changeDescriptionHandle} />
      <button type="button" className={style.buttonSubmit} onClick={onButtonClickHandle}>
        Сохранить
      </button>
    </div>
  );
};
