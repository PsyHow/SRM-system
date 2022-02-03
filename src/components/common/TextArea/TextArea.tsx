import { ChangeEvent, FC } from 'react';

import style from './TextArea.module.scss';

type TextAreaProps = {
  value: string;
  onChangeHandle: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: FC<TextAreaProps> = ({ onChangeHandle, value }) => (
  <textarea className={style.textArea} value={value} onChange={onChangeHandle} />
);
