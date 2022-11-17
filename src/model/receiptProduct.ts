import {model, Schema} from "mongoose";

interface IReceiptProduct {
    quantity ?: number,
    date ?: Date,
    status ?: boolean
}

let ReceiptProductSchema = new Schema<IReceiptProduct>({
    date : Date,
    status : false
})

const ReceiptProduct = model<IReceiptProduct>('ReceiptProduct',ReceiptProductSchema);
export {ReceiptProduct}