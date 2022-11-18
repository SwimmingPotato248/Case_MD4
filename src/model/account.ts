import {Schema,model} from "mongoose";
enum Role{
    user,
    merchant,
    admin
}
enum Status{
    active,
    inactive
}

interface IAccount{
    username: string
    password : string,
    status : Status.active,
    role : Role.user
}

const accountSchemas = new Schema<IAccount>({
    username : String,
    password : String,
    status: Status.active,
    role : Role.user
})

export const Account = model<IAccount>('Account',accountSchemas)