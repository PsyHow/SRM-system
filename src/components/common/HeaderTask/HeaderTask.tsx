import { FC, memo } from 'react';

import style from './HeaderTask.module.scss';

type HeaderProps = {
  id: number | string;
  name?: string;
  onClick: () => void;
};

export const HeaderTask: FC<HeaderProps> = memo(({ onClick, id, name }) => (
  <div className={style.header}>
    <span>{id}</span>
    <span className={style.itemName}>{name}</span>
    <button type="button" className={style.closeButton} onClick={onClick}>
      X
    </button>
  </div>
));

HeaderTask.defaultProps = {
  name: undefined,
};
