import {model, Schema} from "mongoose";

enum status {
    available,
    unavailable
}

interface IProduct {
    name: string;
    image: string;
    description: string;
    price: number;
    discount?: number;
    status: status
    quantitySold: number
}

let productSchema = new Schema<IProduct>({
    name: String,
    image: String,
    description: String,
    price: Number,
    discount: Number,
    status: status.available,
    quantitySold: Number
})

const Product = model<IProduct>('Product', productSchema);
export {Product}