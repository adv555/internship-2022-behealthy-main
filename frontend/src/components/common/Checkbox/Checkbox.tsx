import './checkbox.css';

interface CheckboxProps {
  value?: string;
  label?: string;
  checked?: boolean;
  onChangeHandler?(): void;
}

export const Checkbox = ({
  value,
  label,
  onChangeHandler,
  ...props
}: CheckboxProps) => {
  return (
    <label className="cursor-pointer inline-flex items-center">
      <input
        type="checkbox"
        className="hidden"
        value={value}
        onChange={onChangeHandler}
        {...props}
      />
      <span className="icon block w-6 h-6 border-[1.5px] border-grayscale-main-black rounded-[4px] transition">
        <svg
          className="opacity-0"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m2 7 3.936 4.217a1 1 0 0 0 1.462 0L16 2"
            stroke="#FCFCFC"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {label && <span className="ml-1.5">{label}</span>}
    </label>
  );
};
