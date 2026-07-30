"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodcutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.prodcutModel = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=product.model.js.map