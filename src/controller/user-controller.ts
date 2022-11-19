import {Request, Response} from "express";
import {Account} from "../model/account";

export class UserController {
    registerMerchant = async (req: Request, res: Response) => {
        await Account.updateOne({username: req.params.username}, {$set: {role: 1}})
        return res.status(200).json({
            message: 'Successfully registered as a merchant'
        })
    }
}

export default new UserController()