import mongoose from "mongoose";
const categorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },

},{timestamps: true})

export const categoryModel =  mongoose.model("catehory", categorySchema)