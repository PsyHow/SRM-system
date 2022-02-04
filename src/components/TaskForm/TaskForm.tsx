import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './TaskForm.module.scss';

import { StatusActive } from 'components/ApplicationList/ApplicationList';
import { Button } from 'components/common/Button/Button';
import { HeaderTask } from 'components/common/HeaderTask/HeaderTask';
import { TextArea } from 'components/common/TextArea/TextArea';
import { useForm } from 'hooks/useForm/useForm';
import { createTaskOData, setUpdate } from 'store/applicationListReducer';

type PropsType = {
  setStatus: (value: StatusActive) => void;
};

export const TaskForm: FC<PropsType> = ({ setStatus }) => {
  const dispatch = useDispatch();

  const { value, changeNameHandle, changeDescriptionHandle } = useForm();

  const onButtonClickHandle = (): void => {
    dispatch(createTaskOData({ name: value.name, description: value.description }));
    setStatus('DEFAULT');
  };

  const closeWindowHandle = (): void => {
    setStatus('DEFAULT');
    dispatch(setUpdate(false));
  };

  return (
    <div className={style.container}>
      <HeaderTask id="Новая Заявка" onClickHandle={closeWindowHandle} />
      <span>Название</span>
      <TextArea value={value.name} onChangeHandle={changeNameHandle} />
      <span>Описание</span>
      <TextArea value={value.description} onChangeHandle={changeDescriptionHandle} />
      <Button title="Сохранить" onClickHandle={onButtonClickHandle} />
    </div>
  );
};
