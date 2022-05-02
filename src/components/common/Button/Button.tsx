import { FC } from 'react';

import style from './Button.module.scss';

import { ButtonProps } from 'components/common/Button/types';

export const Button: FC<ButtonProps> = ({ title, onClick, type }) => (
  // eslint-disable-next-line react/button-has-type
  <button className={style.button} type={type} onClick={onClick}>
    {title}
  </button>
);
