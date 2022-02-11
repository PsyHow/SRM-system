import { FC, memo } from 'react';

import style from './HeaderTask.module.scss';

import { removalRepeatWords } from 'consts/base';

type HeaderProps = {
  id: number | string;
  name?: string;
  onClick: () => void;
};

export const HeaderTask: FC<HeaderProps> = memo(({ onClick, id, name }) => (
  <div className={style.header}>
    {typeof id === 'number' ? (
      <span className={style.id}>{`№${id}`}</span>
    ) : (
      <span className={style.id}>{id}</span>
    )}
    <span className={style.itemName}>{name && name.replace(removalRepeatWords, '')}</span>
    <button type="button" className={style.closeButton} onClick={onClick}>
      X
    </button>
  </div>
));

HeaderTask.defaultProps = {
  name: undefined,
};
