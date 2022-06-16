import './radio.css';

export interface RadioProps {
  name: string;
  value?: string;
  label?: string;
  checked?: boolean;
  onChange?: () => void;
  onClick?: () => void;
}

export const Radio = ({ value, label, name, ...props }: RadioProps) => {
  return (
    <label className="cursor-pointer inline-flex items-center">
      <input
        type="radio"
        className="hidden"
        name={name}
        value={value}
        {...props}
      />
      <span className="icon block relative w-6 h-6 border-[1.5px] border-grayscale-main-black rounded-full transition"></span>
      {label && <span className="ml-1.5">{label}</span>}
    </label>
  );
};
