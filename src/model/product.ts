import mongoose, {model, Schema} from "mongoose";
import {IAccount} from "./account";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug)

export interface IProduct {
    name: string;
    image: string;
    description: string;
    price: number;
    discount?: number;
    status: boolean
    quantitySold: number
    account: IAccount,
    slug: String
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
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        slugOn: {save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true}
    }

})

export const Products = model<IProduct>('Products', productSchema);
