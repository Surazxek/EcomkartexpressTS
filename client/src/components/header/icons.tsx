import { FaRegHeart } from "react-icons/fa";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

import { logout } from "../../api/auth";
import { useAuth } from "../../hooks/auth.hook";

export const IconSection = () => {
  const { user, clearUser, clearToken } = useAuth();

  const navigate = useNavigate();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,

    onSuccess: (data) => {
      // Clear Zustand user
      clearUser();

      // Clear Zustand token
      clearToken();

      toast.success(data.message ?? "Logout successful");

      // Navigate to login
      navigate("/login");
    },

    onError: (error: any) => {
      console.log("Logout error:", error);

      toast.error(error.message || "Logout failed");
    },
  });

  // Check whether user is logged in
  const LoggedInUser = (message: string) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: message,
        confirmButtonText: "Okay",
      });

      return;
    }
  };

  const onSubmit = () => {
    logoutUser();
  };

  return (
    <div className="flex gap-3 items-center">

      {/* Wishlist */}
      <button
        onClick={() =>
          user
            ? navigate("/wish_list")
            : LoggedInUser(
                "Please login to see your wishlist."
              )
        }
      >
        <FaRegHeart
          size={28}
          className="text-teal-700 cursor-pointer hover:text-teal-800"
        />
      </button>

      {/* Cart */}
      <button
        onClick={() =>
          user
            ? navigate("/cart")
            : LoggedInUser(
                "Please login to see your cart and add products."
              )
        }
      >
        <LiaCartArrowDownSolid
          size={30}
          className="text-teal-700 cursor-pointer hover:text-teal-800"
        />
      </button>

      {/* User */}
      <div className="flex items-center gap-2">
        <BsPersonCircle size={30} />

        {user ? (
          <div className="flex items-center gap-2">
            <p className="font-semibold">
              {user.first_name} {user.last_name}
            </p>

            <button
              onClick={onSubmit}
              disabled={isPending}
              className="text-teal-700 font-semibold cursor-pointer hover:text-teal-800 disabled:opacity-50"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-teal-700 font-semibold cursor-pointer hover:text-teal-800"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};