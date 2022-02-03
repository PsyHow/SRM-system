import { FC } from 'react';

import style from './Button.module.scss';

type ButtonProps = {
  title: string;
  onClickHandle: () => void;
};

export const Button: FC<ButtonProps> = ({ title, onClickHandle }) => (
  <button className={style.button} type="button" onClick={onClickHandle}>
    {title}
  </button>
);
