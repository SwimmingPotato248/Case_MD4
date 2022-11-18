import {model, Schema} from "mongoose";

export interface ICategory {
    category_name: string
}

let category = new Schema<ICategory>({
    category_name: String
})

export const Category = model<ICategory>('Category', category);
