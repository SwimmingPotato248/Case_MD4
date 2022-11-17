import {model, Schema} from "mongoose";

interface IOrderProduct {
    quantity ?: number,
    date ?: Date;
    status ?: boolean;

}

let OrderProductSchema = new Schema<IOrderProduct>({
    date : Date,
    status : Boolean
})

export const OrderProduct = model<IOrderProduct>('OrderProduct',OrderProductSchema);