import {model, Schema} from "mongoose";

interface IBrandProduct {
    name ?: string
}

let BrandProductSchema = new Schema<IBrandProduct>({
    name : String
})

export const BrandProduct = model<IBrandProduct>('BrandProduct', BrandProductSchema);