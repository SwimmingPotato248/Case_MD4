import mongoose, {model, Schema} from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug)

export interface ICategory {
    category_name: string,
    slug: String
}

let category = new Schema<ICategory>({
    category_name: String,
    slug: {
        type: String,
        slug: "category_name",
        unique: true,
        slugOn: {save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true}
    }
})

export const Category = model<ICategory>('Category', category);
