import {model, Schema} from "mongoose";
import {ICategory} from "./category";
import {IProduct} from "./product";

interface ICategoryProduct {
    category_id: ICategory,
    product_id: IProduct
}

let categoryProduct = new Schema<ICategoryProduct>({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }
})

export const CategoryProduct = model<ICategoryProduct>('CategoryProduct', categoryProduct);
