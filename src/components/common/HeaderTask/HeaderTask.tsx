import { FC, memo } from 'react';

import style from './HeaderTask.module.scss';

import { HeaderProps } from 'components/common/HeaderTask/types';
import { removeRepeatWordsTags } from 'consts/base';

export const HeaderTask: FC<HeaderProps> = memo(({ onClick, title, name }) => (
  <div className={style.header}>
    <span>{title}</span>
    <div className={style.itemName}>
      <div>{name && removeRepeatWordsTags(name)}</div>
    </div>
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
    <div className={style.closeBox} onClick={onClick}>
      <div className={style.button} />
    </div>
  </div>
));

HeaderTask.defaultProps = {
  name: undefined,
};
