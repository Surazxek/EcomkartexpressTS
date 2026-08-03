import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid'


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'User is Required'],
        ref: 'User'
    },
    orderId : {
        type: String,
        require: true,
        default: `ORD-${uuidv4().split('-')[0]}`
    },
    items:[
        {
            product: {
                type: mongoose.Types.ObjectId,
                require: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                require: [true, "Product quantity is required"],
                 min: [1, "Product quantity must be at least 1"],
            },

        }
    ],

    status:{
        type:String,
        enum:['Pending', 'Processing', 'Shipped', 'Canceled', 'Completed'],
        default: "Pending",
    },
    totalAmount: {
        type: Number,
        require: [true,"Total amount is required"],
         min: [1, "Product quantity must be at least 1"],
    }

},{timestamps:true})

export const ordermodel = mongoose.model('Order', OrderSchema) 