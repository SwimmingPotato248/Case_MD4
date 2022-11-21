import {Request, Response} from "express";
import {Account} from "../model/account";
import {Products} from "../model/product";

export class UserController {
    registerMerchant = async (req: Request, res: Response) => {
        await Account.updateOne({username: req.params.username}, {$set: {role: 1}})
        return res.status(200).json({
            message: 'Successfully registered as a merchant'
        })
    }
    showHomePage =  async (req: Request, res: Response) => {
        let products = await Products.find().populate('account', 'username')
        return res.status(200).json(products)
    }
}

export default new UserController()