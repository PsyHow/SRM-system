export interface ButtonProps {
  title: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}
