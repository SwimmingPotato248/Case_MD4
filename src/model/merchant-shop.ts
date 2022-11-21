import mongoose, {model, Schema} from "mongoose";
import {IAccount} from "./account";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug)

interface IMerchantShop {
    nameShop: string,
    address: string,
    information: string
    account: IAccount,
    slug: String
}

let merchantShop = new Schema<IMerchantShop>({
    nameShop: String,
    address: String,
    information: String,
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    slug: {
        type: String,
        slug: "nameShop",
        slugOn: {save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true}
    }
})

export const MerchantShop = model<IMerchantShop>('MerchantShop', merchantShop);
