import {model, Schema} from "mongoose";
import {IAccount} from "./account";

enum status {
    active,
    inactive
}

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
