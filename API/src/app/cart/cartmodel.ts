import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User is required']
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: [true, 'Product is required']
            },
            quantity:{
                type:Number,
                required:[true,'quantity is required'],
                default:0
            },
            total_price:{
                type:Number,
                required:true,
                default:0
            },
        },
    ],
    total_amount :{
        type:Number,
        required: [true,'total amount is required'],
        default:0
    },
})



export const Cart = mongoose.model('cart',categorySchema)



