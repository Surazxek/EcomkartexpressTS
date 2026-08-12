import { FaRegHeart } from "react-icons/fa";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { BsPersonCircle } from "react-icons/bs";

export const IconSection = () => {
  return (
    <div className="flex gap-3 items-center">
      <FaRegHeart size={28} className="text-teal-700" />
      <LiaCartArrowDownSolid size={30} className="text-teal-700" />
      <div className="flex items-center gap-2">
        <BsPersonCircle size={30} />
        <div className="flex items-center gap-2 ">
          <p className="font-semibold">Suraj Karki</p>
          <p className="text-teal-700 font-semibold">Logout</p>
        </div>
      </div>
    </div>
  );
};