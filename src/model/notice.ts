import {model, Schema} from "mongoose";

export interface INotice {
    user_id: String,
    status: Boolean
}

let noticeSchema = new Schema<INotice>({
    user_id: String,
    status: {
        type: Boolean,
        default: true
    }
})

export const Notice = model<INotice>('Notice', noticeSchema);
