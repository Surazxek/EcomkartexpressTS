import type { FC } from "react";

interface IProps {
  label?: string;
  type?: "submit" | "button" | "reset";
  className?: string;
  isDisabled?: boolean
}

const Button: FC<IProps> = ({
  label,
  type = "button",
  className = "",
  isDisabled = false
}) => {
  return (
    <button
    disabled= {isDisabled} // disable prop passed to avoid unclick Login
      className={` disabled:cursor-not-allowed disabled:bg-indigo-400   bg-indigo-500 w-full p-3 rounded-md font-bold tracking-wider text-white text-lg cursor-pointer hover:bg-indigo-600 transition-all duration-300 ${className}`}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;