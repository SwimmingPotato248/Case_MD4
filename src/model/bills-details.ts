import {model, Schema} from "mongoose";
import {IBill} from "./bills";
import {IProduct} from "./product";

export interface IDetails {
    bills: IBill,
    product: IProduct,
    quantity: number,
    node: string
}

let detailsSchema = new Schema<IDetails>({
    bills: {
        type: Schema.Types.ObjectId,
        ref: 'Bills'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: Number,
    node: String
})

export const Details = model<IDetails>('Details', detailsSchema);
