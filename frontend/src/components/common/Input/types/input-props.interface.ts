export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  error?: string;
}
