


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive Number"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },

    coverImage: {
      path: {
        type: String, required: true
      },
      public_id: {
        type: String, required: true
        
      },
    },
    images: [
      {
        path: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock must be positive"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const prodcutModel = mongoose.model("Product", productSchema);
