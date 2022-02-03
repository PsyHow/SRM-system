import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './TaskForm.module.scss';

import { Button } from 'components/common/Button/Button';
import { HeaderTask } from 'components/common/HeaderTask/HeaderTask';
import { TextArea } from 'components/common/TextArea/TextArea';
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
      <HeaderTask id="Новая Заявка" onClickHandle={() => setToggle(false)} />
      <span>Название</span>
      <TextArea value={value.name} onChangeHandle={changeNameHandle} />
      <span>Описание</span>
      <TextArea value={value.description} onChangeHandle={changeDescriptionHandle} />
      <Button title="Сохранить" onClickHandle={onButtonClickHandle} />
    </div>
  );
};
