import {model, Schema} from "mongoose";

interface IReviewProduct {
    review ?: string;
}

let ReviewProductSchema = new Schema<IReviewProduct>({
    review : String
})

const ReviewProduct = model<IReviewProduct>('ReviewProduct', ReviewProductSchema);
export {ReviewProduct}