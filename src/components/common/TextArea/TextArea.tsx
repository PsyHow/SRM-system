import { FC } from 'react';

import style from './TextArea.module.scss';

import { TextAreaProps } from 'components/common/TextArea/types';

export const TextArea: FC<TextAreaProps> = ({ onChangeHandle, value }) => (
  <textarea className={style.textArea} value={value} onChange={onChangeHandle} />
);
