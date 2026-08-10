import mongoose from "mongoose";
import { Role } from "../../types/globalTypes";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
    },

    last_name: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password length must be at least 6 characters"],
    },
    phone_number: {
      type: String,
    },

    wishlist:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product'

    }],
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

     // Email verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      default: null,
    },

    emailVerificationExpires: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  },
);

export const UserModel = mongoose.model("User", UserSchema);
