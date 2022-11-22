import {Schema, model} from "mongoose";

export interface IAccount {
    username: string
    password: string,
    status: boolean,
    role: number
}

const accountSchemas = new Schema<IAccount>({
    username: String,
    password: String,
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: Number,
        default: 0
    }
})

export const Account = model<IAccount>('Account', accountSchemas)