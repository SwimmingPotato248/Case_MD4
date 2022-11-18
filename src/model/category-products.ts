import {model, Schema} from "mongoose";
import {ICategory} from "./category";
import {IProduct} from "./product";

interface ICategoryProduct {
    category: ICategory,
    product: IProduct
}

let categoryProduct = new Schema<ICategoryProduct>({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }
})

export const CategoryProduct = model<ICategoryProduct>('CategoryProduct', categoryProduct);
