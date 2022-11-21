import {Request, Response} from "express";
import {Account} from "../model/account";
import {Products} from "../model/product";
import {MerchantShop} from "../model/merchant-shop";

export class UserController {
    getToken = async (req: any) => {
        return req.decode
    }
    registerMerchant = async (req: Request, res: Response) => {
        await Account.updateOne({username: req.params.username}, {$set: {role: 1}})
        return res.status(200).json({
            message: 'Successfully registered as a merchant'
        })
    }
    showHomePage = async (req: Request, res: Response) => {
        let products = await Products.find().populate('account', 'username')
        return res.status(200).json(products)
    }
    showShop = async (req: Request, res: Response) => {
        let shops = await MerchantShop.find()
        return res.status(200).json(shops)
    }
    detailsShop = async (req: Request, res: Response) => {
        let shops = await MerchantShop.find({slug: req.params.nameShop})
        return res.status(200).json(shops)
    }
}

export default new UserController()