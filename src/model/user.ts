import {model, Schema} from "mongoose";

interface IUser {
    username ?: string,
    password ?: string,
    type ?: user
}

enum user {
    admin,
    user
}

let UserSchema = new Schema<IUser>({
    username : String,
    password : String,
    type : user
})

export const User = model<IUser>('User',UserSchema)