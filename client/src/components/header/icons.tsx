import { FaRegHeart } from "react-icons/fa";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router";

export const IconSection = () => {
  return (
    <div className="flex gap-3 items-center">
      
      {/* Wishlist */}
      <Link to="/wish_list">
        <FaRegHeart
          size={28}
          className="text-teal-700 cursor-pointer hover:text-teal-800"
        />
      </Link>

      {/* Cart */}
      <Link to="/cart">
        <LiaCartArrowDownSolid
          size={30}
          className="text-teal-700 cursor-pointer hover:text-teal-800"
        />
      </Link>

      {/* User */}
      <div className="flex items-center gap-2">
        <BsPersonCircle size={30} />

        <div className="flex items-center gap-2">
          <p className="font-semibold">Suraj Karki</p>

          <button className="text-teal-700 font-semibold cursor-pointer hover:text-teal-800">
            Logout
          </button>
        </div>
      </div>

    </div>
  );
};