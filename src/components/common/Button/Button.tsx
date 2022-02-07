import { FC } from 'react';

import style from './Button.module.scss';

type ButtonProps = {
  title: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: FC<ButtonProps> = ({ title, onClick, type }) => (
  // eslint-disable-next-line react/button-has-type
  <button className={style.button} type={type} onClick={onClick}>
    {title}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
};
