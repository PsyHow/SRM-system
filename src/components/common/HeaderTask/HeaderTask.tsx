import { FC } from 'react';

import style from './HeaderTask.module.scss';

type HeaderProps = {
  id: number | string;
  // eslint-disable-next-line react/require-default-props
  name?: string;
  onClickHandle: () => void;
};

export const HeaderTask: FC<HeaderProps> = ({ onClickHandle, id, name }) => (
  <div className={style.header}>
    <span>{id}</span>
    <span className={style.itemName}>{name}</span>
    <button type="button" className={style.closeButton} onClick={onClickHandle}>
      X
    </button>
  </div>
);
