import { useState, type FC } from "react";
import { CgAsterisk } from "react-icons/cg";
import { useFormContext } from "react-hook-form";
import { VscEye } from "react-icons/vsc";
import { GoEyeClosed } from "react-icons/go";


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

  const [show,setShow] = useState<boolean>(false)



  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex ">
        <label className="text-lg font-bold text-gray-750 " htmlFor={id}>
          {label}
        </label>
        {required && <CgAsterisk size={13} className="text-red-500 m-1 " />}
      </div>
       <div className=" w-full flex items-center relative mt-6">
         <input
        {...register(name)}
        // value={watch(name)}
        className={` absolute left-0 right-0 w-full border ${errors[name] ? "border red-500    focus:outline-red-500" : " border-indigo-600   focus:outline-indigo-500"} 
              p-3 rounded-md placeholder:text-lg text-lg`}
        placeholder={placeholder}
        type={show ? 'text' : type}
        // name={name}
        id={id}
      />
      { type === 'password' && (show ? <VscEye onClick={() => setShow(!show) }  size={22} className="text-gray-800 cursor-pointer absolute right-1" />:
        <GoEyeClosed onClick={() => setShow(!show) } size={22}  className="text-gray-800 cursor-pointer absolute right-1"  /> )}
       </div>
      <p className="text-xs text-red-500 min-h-2.5 mt-7 ">
        {errors[name]?.message as string}
      </p>
    </div>
  );
};

export default Input;
