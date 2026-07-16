import type { FC } from "react";
import { CgAsterisk } from "react-icons/cg";
import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  
  
}) => {
  const {
    register,
    // watch,
    formState: { errors },
  } = useFormContext();
  // console.log(errors);
  // console.log(name, watch(name))

  return (
    <div className="flex flex-col gap-1">
      <div className="flex ">
        <label className="text-lg font-bold text-gray-750 " htmlFor={id}>
          {label}
        </label>
        {required && <CgAsterisk size={13} className="text-red-500 m-1 " />}
      </div>
      <input
        {...register(name)}
        // value={watch(name)}
        className={`border ${errors[name] ? "border red-500    focus:outline-red-500" : " border-indigo-600   focus:outline-indigo-500"} 
              p-3 rounded-md placeholder:text-lg text-lg`}
        placeholder={placeholder}
        type={type}
        // name={name}
        id={id}
      />
      <p className="text-xs text-red-500 min-h-2.5 mt-0.5 ">
        {errors[name]?.message as string}
      </p>
    </div>
  );
};

export default Input;
