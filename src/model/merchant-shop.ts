import {model, Schema} from "mongoose";

enum status {
    active,
    inactive
}

interface IMerchantShop {
    nameShop: string,
    address : string,
    information: string
}

let merchantShop = new Schema<IMerchantShop>({
    nameShop: String,
    address: String,
    information: String
})

const MerchantShop = model<IMerchantShop>('MerchantShop', merchantShop);
export {MerchantShop}