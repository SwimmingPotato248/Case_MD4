import {model, Schema} from "mongoose";
import {IAccount} from "./account";

export interface IBill {
    time: Date,
    account_customer: IAccount,
    address: string,
    payment_status: boolean,
    confirm_bill: boolean,
    account_merchant: IAccount
}

let billSchema = new Schema<IBill>({
    time: {
        type: Date,
        default: 2
    },
    account_customer: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    address: String,
    payment_status:{
        type: Boolean,
        default: false
    },
    confirm_bill:{
        type: Boolean,
        default: false
    },
    account_merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

export const Bills = model<IBill>('Bills', billSchema);
