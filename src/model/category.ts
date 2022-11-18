import {model, Schema} from "mongoose";

interface ICategory {
    category_name: string
}

let category = new Schema<ICategory>({
    category_name: String
})

const Category = model<ICategory>('Category', category);
export {Category}