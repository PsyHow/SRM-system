import { FC } from 'react';

import style from './TaskForm.module.scss';

type PropsType = {
  setToggle: (value: boolean) => void;
};

export const TaskForm: FC<PropsType> = ({ setToggle }) => (
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
    <textarea />
    <span>Описание</span>
    <textarea />
    <button type="submit" className={style.buttonSubmit}>
      Сохранить
    </button>
  </div>
);
