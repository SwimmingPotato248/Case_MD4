import {model, Schema} from "mongoose";

interface ICategoryProduct {

}

let category = new Schema<ICategoryProduct>({

})

const Category = model<ICategoryProduct>('Category', category);
export {Category}