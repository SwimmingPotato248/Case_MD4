import {model, Schema} from "mongoose";
import {IAccount} from "./account";

enum status {
    active,
    inactive
}

interface IMerchantShop {
    nameShop: string,
    address : string,
    information: string
    username: IAccount
}

let merchantShop = new Schema<IMerchantShop>({
    nameShop: String,
    address: String,
    information: String,
    username:{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

export const MerchantShop = model<IMerchantShop>('MerchantShop', merchantShop);
