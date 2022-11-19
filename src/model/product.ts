import {model, Schema} from "mongoose";
import {IAccount} from "./account";

export interface IProduct {
    name: string;
    image: string;
    description: string;
    price: number;
    discount?: number;
    status: boolean
    quantitySold: number
    account: IAccount
}

let productSchema = new Schema<IProduct>({
    name: String,
    image: String,
    description: String,
    price: Number,
    discount: Number,
    status: {
        type: Boolean,
        default: true
    },
    quantitySold: {
        type: Number,
        default: 0
    },
    account :{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

export const Products = model<IProduct>('Products', productSchema);
