import { ChangeEvent } from 'react';

export interface TextAreaProps {
  value: string;
  onChangeHandle: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
