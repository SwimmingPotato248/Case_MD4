import {model, Schema} from "mongoose";

interface IInfoProduct {
    IMEI ?: number;
}

let InfoProductSchema = new Schema<IInfoProduct>({
    IMEI : Number
})

const InfoProduct = model<IInfoProduct>('InfoProduct', InfoProductSchema);
export {InfoProduct}