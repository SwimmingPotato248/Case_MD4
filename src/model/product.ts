import {model, Schema} from "mongoose";

interface IProduct {
    name ?: string;
    image ?: string;
    description ?: string;
    quantity ?: number;
    importPrice ?: number;
    exportPrice ?:number;
}

let ProductSchema = new Schema<IProduct>({
    name : String,
    image : String,
    description : String,
    quantity : Number,
    importPrice : Number,
    exportPrice : Number
})

const Product = model<IProduct>('Product', ProductSchema);
export {Product}