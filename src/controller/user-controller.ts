import {Request, Response} from "express";
import {Account} from "../model/account";
import {Products} from "../model/product";
import {MerchantShop} from "../model/merchant-shop";
import {Bills} from "../model/bills";
import {Details} from "../model/bills-detils";

export class UserController {
    getToken = async (req: any) => {
        return req.decode
    }
    registerMerchant = async (req: Request, res: Response) => {
        let token = await this.getToken(req)
        await Account.updateOne({_id: token.account_id}, {$set: {role: 1}})
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
        let shops = await MerchantShop.find({slug: req.params.nameShop}).populate('account', 'username')
        if (shops.length) {
            let account = await Account.find({username: shops[0].account.username})
            let products = await Products.find({account: account[0]._id}).populate('account', 'username')
            let details = {
                shop: shops,
                products: products
            }
            return res.status(200).json(details)
        } else {
            return res.status(200).json({
                message: "Store not found"
            })
        }
    }
    detailsProduct = async (req: Request, res: Response) => {
        let products = await Products.find({slug: req.params.productName}).populate('account', 'username')
        // console.log(products.length)
        if (products.length === 0) {
            return res.status(200).json({
                message: "Product not found"
            })
        } else {
            return res.status(200).json(products)
        }
    }
    // searchProduct = async (req: Request, res: Response) => {
    //     console.log(req.body.keyWord)
    //     let products = await Products.find({slug:req.body.keyWord})
    //     console.log("product", products)
    //     return res.status(200).json(products)
    // }

    payment = async (req: Request, res: Response) => {

    }

}

export default new UserController()